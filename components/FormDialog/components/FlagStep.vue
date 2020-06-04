<template>
  <form class="white pa-4">
    <ValidationProvider v-slot="{ errors }" name="country" rules="">
      <div class="field">
        <label class="mb-1 subtitle-1 font-weight-bold" for="email">
          {{ $t('dialogs.form.fields.countrySelection.label') }}
        </label>
        <div class="select-wrap">
          <select id="country-select" v-model="form.country" name="country">
            <option
              v-for="country in countries"
              :key="country.code"
              :value="country.code"
            >
              {{ country.flag }} {{ country.name }}
            </option>
          </select>
        </div>
        <span v-show="errors.length > 0" class="is-invalid">
          {{ errors[0] }}
        </span>
      </div>
      <span class="subtitle-1 font-weight-bold">
        {{ $t('dialogs.form.copy.addFlair') }}
      </span>
      <div class="field emoji-grid">
        <span class="headline">
          {{ $t('dialogs.form.fields.emojiGrid.placeholder') }}
        </span>
      </div>
    </ValidationProvider>

    <div class="field">
      <select v-model="form.emojiIndex" name="emojiChoice">
        <option
          v-for="option in availableEmojiSelections"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
    </div>
    <div class="d-flex flex-column">
      <v-btn color="primary">
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

extend('required', required)

const countryCodes = Object.keys(countries).sort()

export default {
  data: (vm) => ({
    form: {
      country: '',
      emojiIndex: '',
      emojiIndices: []
    },
    countries: [].concat(
      {
        code: '',
        name: vm.$t('dialogs.form.fields.countrySelection.placeholder'),
        flag: ''
      },
      countryCodes.map((code) => ({
        code,
        name: i18nCountries.getName(code, vm.$i18n.locale),
        flag: countries[code].emoji
      }))
    ),
    emojiLookup: getIndexLookup(emojis)
  }),
  computed: {
    availableEmojiIndices: (vm) =>
      emojis
        .map((_, index) => index)
        .filter((index) => !vm.form.emojiIndices.includes(index)),
    availableEmojiSelections: (vm) =>
      [].concat(
        {
          label: vm.$t('dialogs.form.fields.emojiSelection.placeholder'),
          value: ''
        },
        vm.availableEmojiIndices.map((emojiIndex) => ({
          label: emojis[emojiIndex],
          value: emojiIndex
        }))
      )
  },
  mounted() {
    console.log(this.availableEmojiIndices, this.availableEmojiSelections)
  }
}
</script>

<style lang="scss" scoped>
@import './form-styles.scss';

.emoji-grid {
  input {
  }
}
</style>
