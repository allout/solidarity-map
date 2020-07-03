<!-- eslint-disable vue/no-v-html -->
<template>
  <ValidationObserver v-slot="{ invalid, handleSubmit }" slim>
    <form class="white pa-4" @submit.prevent="handleSubmit(onSubmit)">
      <vue-recaptcha
        v-if="recaptchaEnabled"
        ref="recaptcha"
        size="invisible"
        :sitekey="recaptchaSiteKey"
        :load-recaptcha-script="true"
        @verify="onRecaptchaVerify"
        @expired="onRecaptchaExpired"
      />

      <ValidationProvider
        v-slot="{ errors }"
        rules="email|required|max:50"
        name="email"
        class="field"
        tag="div"
      >
        <label class="subtitle-1 font-weight-bold mb-1" for="email">
          {{ $t('fields.email.label') }}
        </label>
        <input
          v-model="form.email"
          type="email"
          name="email"
          :placeholder="$t('fields.email.placeholder')"
        />
        <span v-show="errors.length > 0" class="is-invalid">
          {{ errors[0] }}
        </span>
      </ValidationProvider>
      <transition-group name="fade-expand" tag="div">
        <div v-if="form.email" key="tr1">
          <div class="subtitle-1 font-weight-bold mb-2">
            {{ $t('dialogs.form.copy.extraInfoAsk') }}
          </div>
          <ValidationProvider
            v-slot="{ errors, touched }"
            name="firstName"
            rules="required|max:50"
            class="field"
            tag="div"
          >
            <label class="subtitle-1 font-weight-bold mb-1" for="firstName">
              {{ $t('fields.firstName.label') }}
            </label>
            <input
              v-model="form.firstName"
              type="text"
              name="firstName"
              :placeholder="$t('fields.firstName.placeholder')"
            />
            <span v-show="touched && errors.length > 0" class="is-invalid">
              {{ errors[0] }}
            </span>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors, touched }"
            name="lastName"
            rules="required|max:50"
            class="field"
            tag="div"
          >
            <label class="subtitle-1 font-weight-bold mb-1" for="lastName">
              {{ $t('fields.lastName.label') }}
            </label>
            <input
              v-model="form.lastName"
              type="text"
              name="lastName"
              :placeholder="$t('fields.lastName.placeholder')"
            />
            <span v-show="touched && errors.length > 0" class="is-invalid">
              {{ errors[0] }}
            </span>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors, touched }"
            name="subscriptionCountry"
            rules="required"
            class="field"
            tag="div"
          >
            <label class="subtitle-1 font-weight-bold mb-1" for="country">
              {{ $t('fields.subscriptionCountry.label') }}
            </label>
            <div class="select-wrap">
              <select
                id="country-select"
                v-model="form.subscriptionCountry"
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
            <span v-show="touched && errors.length > 0" class="is-invalid">
              {{ errors[0] }}
            </span>
          </ValidationProvider>
          <div v-if="gdprCountryIsSelected">
            <label
              class="subtitle-1 font-weight-bold mb-1"
              for="subscriptionConsent"
            >
              {{ $t('fields.subscriptionConsent.label') }}
            </label>
            <div class="d-flex align-center" style="height: 64px">
              <v-switch
                v-model="form.subscriptionConsent"
                :label="
                  form.subscriptionConsent
                    ? $t('fields.subscriptionConsent.accept')
                    : $t('fields.subscriptionConsent.decline')
                "
                :class="
                  `switch mt-0 ${!form.subscriptionConsent && 'is-invalid'}`
                "
              />
            </div>
          </div>
        </div>
      </transition-group>
      <div class="d-flex flex-column">
        <v-btn
          type="submit"
          color="primary"
          class="mb-1 mt-3"
          large
          :disabled="
            invalid || (gdprCountryIsSelected && !form.subscriptionConsent)
          "
        >
          {{ $t('dialogs.form.buttons.subscribe.label') }}
        </v-btn>
        <span class="disclaimer mb-2" v-html="$t('disclaimers.subscription')" />
        <v-btn color="primary" text large @click.prevent="onSkipClicked">
          {{ $t('dialogs.form.buttons.skip.label') }} &rarr;
        </v-btn>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import { extend } from 'vee-validate'
import { required, email, max } from 'vee-validate/dist/rules'
import { mapState, mapGetters } from 'vuex'
import VueRecaptcha from 'vue-recaptcha'

import { gdprCountries, getSortedCountryOptions } from '~/utils/resources'

// Install required rule and message.
extend('required', required)

// Install email rule and message.
extend('email', email)

// Install max rule and message.
extend('max', max)

export default {
  name: 'SubscriptionStep',
  components: {
    VueRecaptcha
  },
  data: (vm) => ({
    form: {
      firstName: '',
      lastName: '',
      email: '',
      subscriptionCountry: '',
      subscriptionConsent: false
    }
  }),
  computed: {
    countries: (vm) =>
      [].concat(
        {
          code: '',
          name: vm.$t('fields.solidarityCountry.placeholder', vm.$i18n.locale),
          flag: ''
        },
        getSortedCountryOptions(vm.$i18n.locale)
      ),
    gdprCountryIsSelected() {
      return gdprCountries.includes(this.form.subscriptionCountry)
    },
    recaptchaEnabled: (vm) => vm.$nuxt.context.env.recaptchaEnabled,
    recaptchaSiteKey: (vm) => vm.$nuxt.context.env.recaptchaSiteKey,
    ...mapState('attendees', ['currentAttendeeId', 'attendees']),
    ...mapGetters('attendees', ['currentAttendee'])
  },
  watch: {
    // eslint-disable-next-line object-shorthand
    'form.email': function(newVal) {
      // If not already selected, pre-select the country choice as the one the
      // current attendee used on the flag step, if set
      if (
        newVal &&
        !this.form.subscriptionCountry &&
        this.currentAttendee &&
        this.currentAttendee.solidarityCountry
      ) {
        this.form.subscriptionCountry = this.currentAttendee.solidarityCountry
      }
    }
  },
  methods: {
    onSubmit(evt) {
      if (this.recaptchaEnabled) {
        // if recaptcha is enabled request the verification code from google
        this.$refs.recaptcha.execute()
      } else {
        // No verification required, just submit to ActionKit
        this.doSubmit()
      }
    },
    doSubmit(evt) {
      const { subscriptionConsent, ...toSubmit } = this.form
      const { locale } = this.$i18n
      this.$store.dispatch('attendees/updateCurrentAttendee', {
        locale,
        ...toSubmit
      })
      this.$store.commit('formDialog/NEXT_STEP')
    },
    onSkipClicked(evt) {
      this.$store.commit('formDialog/NEXT_STEP')
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
.fade-expand-enter-active {
  transition: opacity 1s, transform 0.25s;
  transform: scale(1);
}
.fade-expand-enter,
.fade-expand-leave-to {
  opacity: 0;
  transform: scale(0);
}
.switch {
  &::v-deep label {
    color: black;
    font-size: 14px;
  }

  &.is-invalid::v-deep label {
    color: var(--v-error-base);
    font-weight: 600;
  }
}
</style>
