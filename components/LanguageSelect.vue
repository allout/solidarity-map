<template>
  <div>
    <v-btn class="locale-button" color="white" outlined>
      <select>
        <option v-for="localeOption in localeOptions" :key="localeOption.code">
          {{ localeOption.label }}
        </option>
      </select>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'LanguageSelect',
  data() {
    return {
      localeOptions: [
        { code: 'en-us', label: 'English' },
        { code: 'ru-ru', label: 'Russian' }
      ]
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
