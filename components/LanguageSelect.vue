<template>
  <div class="d-flex align-center">
    <TranslateSVG />
    <v-btn class="locale-button" color="white" text small>
      <select v-model="selectedLocale" @change="onLocaleChange">
        <option
          v-for="localeOption in localeOptions"
          :key="localeOption.code"
          :value="localeOption.code"
        >
          {{ localeOption.native }}
        </option>
      </select>
    </v-btn>
  </div>
</template>

<script>
// See https://github.com/annexare/Countries for languages object format
import { languages } from 'countries-list'
import TranslateSVG from '~/assets/icons/translate.svg?inline'

export default {
  name: 'LanguageSelect',
  components: { TranslateSVG },
  data() {
    return {
      selectedLocale: this.$i18n.locale,
      localeOptions: this.$i18n.locales.map(({ code }) => ({
        code,
        ...languages[code]
      }))
    }
  },
  methods: {
    onLocaleChange() {
      this.$i18n.setLocale(this.selectedLocale)
    }
  }
}
</script>

<style lang="scss" scoped>
.locale-button {
  padding: 0 !important;
}
select {
  outline: none;
  padding: 0 10px;
}
</style>
