<template>
  <v-dialog v-model="showFormDialog" persistent max-width="380">
    <v-app-bar ref="appBar" color="primary" extension-height="200" flat>
      <div slot="extension" class="appbar-ext">
        <h2 class="title font-weight-bold white--text mb-2">
          {{ $t('dialogs.form.header.title') }}
        </h2>
        <h2 class="title white--text mb-2">
          {{ $t('dialogs.form.header.subtitle') }}
        </h2>
        <p class="white--text">
          {{ $t('dialogs.form.header.text', { prideLocation }) }}
        </p>
      </div>
    </v-app-bar>
    <form class="white pa-4">
      <ValidationProvider v-slot="{ errors }" name="name" rules="">
        <div class="field">
          <label for="name">
            {{ $t('dialogs.form.fields.name.label') }}
          </label>
          <input
            v-model="form.name"
            type="text"
            name="name"
            :placeholder="$t('dialogs.form.fields.name.placeholder')"
          />
          <span v-show="errors.length > 0" class="is-invalid">
            {{ errors[0] }}
          </span>
        </div>
      </ValidationProvider>
      <ValidationProvider v-slot="{ errors }" name="email" rules="email">
        <div class="field">
          <label for="email">
            {{ $t('dialogs.form.fields.email.label') }}
          </label>
          <input
            v-model="form.email"
            type="email"
            name="email"
            :placeholder="$t('dialogs.form.fields.email.placeholder')"
          />
          <span v-show="errors.length > 0" class="is-invalid">
            {{ errors[0] }}
          </span>
        </div>
      </ValidationProvider>
      <ValidationProvider v-slot="{ errors }" name="country" rules="">
        <div class="field">
          <label for="email">
            {{ $t('dialogs.form.fields.country.label') }}
          </label>
          <select id="country-select" v-model="form.country" name="country">
            <option
              v-for="country in countries"
              :key="country.code"
              :value="country.code"
            >
              {{ country.emoji }} {{ country.name }}
            </option>
          </select>
          <span v-show="errors.length > 0" class="is-invalid">
            {{ errors[0] }}
          </span>
        </div>
      </ValidationProvider>
      <ValidationProvider v-slot="{ errors }" name="message" rules="">
        <div class="field">
          <label for="message">
            {{ $t('dialogs.form.fields.message.label') }}
          </label>
          <textarea
            v-model="form.message"
            name="message"
            rows="4"
            :placeholder="
              $t('dialogs.form.fields.message.placeholder', { prideLocation })
            "
          >
          </textarea>
          <span v-show="errors.length > 0" class="is-invalid">
            {{ errors[0] }}
          </span>
        </div>
      </ValidationProvider>
      <div class="d-flex flex-column">
        <v-btn color="primary">
          {{ $t('dialogs.form.fields.button.label') }}
        </v-btn>
      </div>
    </form>
    <!-- <v-btn
        color="green darken-1"
        text
        @click="$store.commit('app/SET_FORM_VISIBLE', false)"
      >
        Disagree
      </v-btn>
      <v-btn
        color="green darken-1"
        text
        @click="$store.commit('app/SET_FORM_VISIBLE', false)"
      >
        Agree
      </v-btn> -->
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'
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
      country: '',
      message: ''
    },
    countries: [].concat(
      {
        code: '',
        name: vm.$t('dialogs.form.fields.country.placeholder'),
        emoji: ''
      },
      countryCodes.map((code) => ({
        code,
        name: i18nCountries.getName(code, vm.$i18n.locale),
        emoji: countries[code].emoji
      }))
    )
  }),
  computed: {
    prideLocation() {
      return this.$t(`cities.${this.$nuxt.context.env.prideLocation}`)
    },
    ...mapState('app', ['showFormDialog'])
  },
  mounted() {
    console.log(this.$i18n.messages)
  }
}
</script>

<style lang="scss" scoped>
label {
  font-weight: 600;
  margin-bottom: 4px;
}
input,
select {
  height: 33px;
}
input,
textarea,
select {
  padding: 0 11px;
  box-sizing: border-box;
  border: 1.5px solid var(--v-primary-base);
  border-radius: 2px;
}
select {
  &::after {
    content: '\25bc'; /* down arrow */
  }
}
.field {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}
button {
  font-weight: 700;
}
</style>
