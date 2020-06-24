<template>
  <form
    ref="form"
    class="d-flex flex-column white pa-4"
    :style="formStyle"
    @submit.prevent="onFormSubmitted"
  >
    <vue-recaptcha
      v-if="recaptchaEnabled"
      ref="recaptcha"
      size="invisible"
      :sitekey="recaptchaSiteKey"
      :load-recaptcha-script="true"
      @verify="onRecaptchaVerify"
      @expired="onRecaptchaExpired"
    />

    <div class="field">
      <label class="mb-1 subtitle-1 font-weight-bold" for="email">
        {{ $t('fields.solidarityCountry.label') }}
      </label>
      <div class="select-wrap">
        <select
          id="country-select"
          v-model="form.solidarityCountry"
          name="country"
        >
          <option
            v-for="country in countries"
            :key="country.code"
            :value="country.code"
          >
            {{ country.flag }} {{ country.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="field">
      <div class="mb-2">
        <div class="subtitle-1 font-weight-bold mb-1">
          {{ $t('dialogs.form.copy.addFlair') }}
        </div>
        <div class="d-flex justify-space-between">
          <div :class="selectedEmojisClass">
            {{ selectedEmojis }}
          </div>
          <v-btn
            v-if="form.emojiIndices.length"
            class="pa-0"
            color="primary"
            text
            @click="onBackspaceClick"
          >
            <BackspaceSVG />
          </v-btn>
        </div>
      </div>
      <v-alert
        v-model="showEmojiLimitAlert"
        color="warning"
        transition="scale-transition"
        dismissable
        dense
      >
        {{ $t('dialogs.steps.flag.emojiLimitReachedAlert') }}
      </v-alert>
      <div ref="emojiGridWrap" class="emoji-grid-wrap">
        <div
          ref="emojiGridWrap"
          class="d-flex justify-center flex-wrap align-start emoji-grid"
        >
          <v-btn
            v-for="choice in availableEmojiChoices"
            :key="`emoji-${choice.index}`"
            color="primary"
            class="emoji align-self-start"
            large
            text
            @click="onEmojiClick(choice.index)"
          >
            {{ choice.emoji }}
          </v-btn>
        </div>
      </div>
    </div>
    <div class="d-flex flex-column mt-auto">
      <v-btn type="submit" color="primary" large>
        {{ $t('dialogs.form.buttons.showSupport.label') }}
      </v-btn>
    </div>
  </form>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha'

import { extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'
import { mapState } from 'vuex'

import { getIndexLookup } from '~/utils/data'
import { emojis, getSortedCountryOptions } from '~/utils/resources'
import BackspaceSVG from '@/assets/images/icons/backspace.svg?inline'

extend('required', required)

export default {
  components: {
    BackspaceSVG,
    VueRecaptcha
  },
  data: (vm) => ({
    availableEmojiChoices: emojis.map((emoji, index) => ({
      emoji,
      index
    })),
    maxEmoji: 32,
    showEmojiLimitAlert: false,
    form: {
      solidarityCountry: '',
      emojiIndices: []
    },
    countries: [].concat(
      {
        code: '',
        name: vm.$t('fields.solidarityCountry.placeholder'),
        flag: ''
      },
      getSortedCountryOptions(vm.$i18n.locale)
    ),
    emojiLookup: getIndexLookup(emojis),
    formHeight: 0
  }),
  computed: {
    selectedEmojis() {
      if (this.form.emojiIndices.length) {
        return this.form.emojiIndices.map((index) => emojis[index]).join('')
      }
      return this.$t('fields.emojiGrid.placeholder')
    },
    selectedEmojisClass() {
      if (this.form.emojiIndices.length) {
        return `selected-emojis`
      }
      return 'selected-emojis empty'
    },
    formStyle: (vm) => (vm.formHeight ? `min-height: ${vm.formHeight}px` : ''),
    recaptchaEnabled: (vm) => vm.$nuxt.context.env.recaptchaEnabled,
    recaptchaSiteKey: (vm) => vm.$nuxt.context.env.recaptchaSiteKey,
    ...mapState('map', ['lastChosenLatlng'])
  },
  mounted() {
    const vm = this
    window.setTimeout(function() {
      // Take form height after the dialog has animated
      vm.formHeight = vm.$refs.form.clientHeight
    }, 1000)
  },
  methods: {
    onEmojiClick(index) {
      if (this.form.emojiIndices.length < this.maxEmoji) {
        this.form.emojiIndices.push(index)
      } else {
        this.showEmojiLimitAlert = true
      }
    },
    onBackspaceClick(evt) {
      this.form.emojiIndices.pop()
      this.showEmojiLimitAlert = false
    },
    onFormSubmitted() {
      if (this.recaptchaEnabled) {
        // if recaptcha is enabled request the verification code from google
        this.$refs.recaptcha.execute()
      } else {
        // No verification required, just submit to ActionKit
        this.doSubmit()
      }
    },
    doSubmit() {
      this.$store.commit('formDialog/NEXT_STEP')
      // Consider calling app/SET_FLAG_IS_PLACED from inside attendees/createAttendee action
      this.$store.commit('app/SET_FLAG_IS_PLACED', true)
      this.$store.dispatch('attendees/createCurrentAttendee', {
        ...this.form,
        ...this.lastChosenLatlng
      })
    },
    onRecaptchaVerify(gRecaptchaResponse) {
      this.$store.commit('app/UPDATE_STORE', { gRecaptchaResponse })
      this.doSubmit()
    },
    onRecaptchaExpired() {
      // eslint-disable-next-line no-console
      console.error('Recaptcha expired')
    },
    resetRecaptcha() {
      this.$refs.recaptcha.reset() // Direct call reset method
    }
  }
}
</script>

<style lang="scss" scoped>
@import './form-styles.scss';

.emoji-grid-wrap {
  .emoji-grid {
    .emoji {
      font-size: 28px;
    }
  }
}
.selected-emojis {
  line-height: 40px;
  font-size: 2.5rem;
  letter-spacing: 4px;

  &.empty {
    font-size: 1.5rem;
    color: var(--v-secondary-lighten3);
    letter-spacing: unset;
  }
}
</style>
