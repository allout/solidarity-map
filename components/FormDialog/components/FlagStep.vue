<template>
  <form
    ref="form"
    class="d-flex flex-column white pa-4"
    :style="formStyle"
    @submit.prevent="onFormSubmitted"
  >
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
            @click="form.emojiIndices.pop()"
          >
            <BackspaceSVG />
          </v-btn>
        </div>
      </div>
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
      <v-btn type="submit" color="primary">
        {{ $t('dialogs.form.buttons.showSupport.label') }}
      </v-btn>
    </div>
  </form>
</template>

<script>
import { extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'
import i18nCountries from 'i18n-iso-countries'
import { countries } from 'countries-list'
import { getIndexLookup } from '~/utils/data'
import { emojis } from '~/utils/resources'
import BackspaceSVG from '@/assets/images/icons/backspace.svg?inline'

extend('required', required)

const countryCodes = Object.keys(countries).sort()

export default {
  components: {
    BackspaceSVG
  },
  data: (vm) => ({
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
      countryCodes.map((code) => ({
        code,
        name: i18nCountries.getName(code, vm.$i18n.locale),
        flag: countries[code].emoji
      }))
    ),
    emojiLookup: getIndexLookup(emojis),
    formHeight: 0
  }),
  computed: {
    availableEmojiIndices: (vm) =>
      emojis
        .map((_, index) => index)
        .filter((index) => !vm.form.emojiIndices.includes(index)),
    availableEmojiChoices: (vm) =>
      vm.availableEmojiIndices.map((index) => ({
        emoji: emojis[index],
        index
      })),
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
    formStyle: (vm) => (vm.formHeight ? `min-height: ${vm.formHeight}px` : '')
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
      this.form.emojiIndices.push(index)
    },
    onFormSubmitted(index) {
      this.$store.commit('formDialog/UPDATE_SUBMITTED', { ...this.form })
      this.$store.commit('formDialog/NEXT_STEP')
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
