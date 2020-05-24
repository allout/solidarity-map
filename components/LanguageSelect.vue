<template>
  <div>
    <v-btn class="locale-button" color="white" outlined>
      <select v-model="selectedLocale" @change="onLocaleChange">
        <option
          v-for="localeOption in localeOptions"
          :key="localeOption.locale"
          :value="localeOption.locale"
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
export default {
  name: 'LanguageSelect',
  data() {
    return {
      selectedLocale: this.$i18n.locale,
      localeOptions: this.$i18n.availableLocales.map((locale) => ({
        locale,
        ...languages[locale.slice(0, 2)]
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
  padding: 0 16px;
}
</style>
