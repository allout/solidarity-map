<!-- eslint-disable vue/no-v-html -->
<template>
  <ValidationObserver v-slot="{ invalid, handleSubmit }" slim>
    <form class="white pa-4" @submit.prevent="handleSubmit(onSubmit)">
      <ValidationProvider
        v-slot="{ errors, touched }"
        rules="email|required"
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
        <span v-show="touched && errors.length > 0" class="is-invalid">
          {{ errors[0] }}
        </span>
      </ValidationProvider>
      <transition-group name="fade-expand" tag="div">
        <div v-if="form.email" key="tr1">
          <div class="subtitle-1 font-weight-bold mb-2">
            {{ $t('dialogs.form.copy.extraInfoAsk') }}
          </div>
          <ValidationProvider
            v-if="form.email"
            v-slot="{ errors, touched }"
            name="name"
            rules="required"
            class="field"
            tag="div"
          >
            <label class="subtitle-1 font-weight-bold mb-1" for="name">
              {{ $t('fields.name.label') }}
            </label>
            <input
              v-model="form.name"
              type="text"
              name="name"
              :placeholder="$t('fields.name.placeholder')"
            />
            <span v-show="touched && errors.length > 0" class="is-invalid">
              {{ errors[0] }}
            </span>
          </ValidationProvider>
          <ValidationProvider
            v-if="form.email"
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
        </div>
      </transition-group>
      <div class="d-flex flex-column">
        <v-btn type="submit" color="primary" class="mb-1" :disabled="invalid">
          {{ $t('dialogs.form.buttons.subscribe.label') }}
        </v-btn>
        <span class="disclaimer mb-2" v-html="$t('disclaimers.subscription')" />
        <v-btn color="primary" text @click.prevent="onSkipClicked">
          {{ $t('dialogs.form.buttons.skip.label') }} &rarr;
        </v-btn>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import { extend } from 'vee-validate'
import { required, email, min } from 'vee-validate/dist/rules'
import i18nCountries from 'i18n-iso-countries'
import { countries } from 'countries-list'

// Install required rule and message.
extend('required', required)

// Install email rule and message.
extend('email', email)

// Install min rule and message.
extend('min', min)

const countryCodes = Object.keys(countries).sort()

export default {
  data: (vm) => ({
    form: {
      name: '',
      email: '',
      subscriptionCountry: ''
    },
    countries: [].concat(
      {
        code: '',
        name: vm.$t('fields.subscriptionCountry.placeholder'),
        flag: ''
      },
      countryCodes.map((code) => ({
        code,
        name: i18nCountries.getName(code, vm.$i18n.locale),
        flag: countries[code].emoji
      }))
    )
  }),
  methods: {
    onSubmit(evt) {
      this.$store.commit('formDialog/UPDATE_SUBMITTED', { ...this.form })
      this.$store.commit('formDialog/NEXT_STEP')
    },
    onSkipClicked(evt) {
      this.$store.commit('formDialog/NEXT_STEP')
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
</style>
