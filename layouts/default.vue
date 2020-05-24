<template>
  <v-app>
    <v-app-bar ref="appBar" color="primary" app flat extension-height="110">
      <div class="logo-wrap d-flex justify-end">
        <language-select />
      </div>
      <div slot="extension" class="appbar-ext">
        <div class="d-flex justify-space-between">
          <h1 class="headline white--text">{{ $t('site.title') }}</h1>
        </div>
        <h2 class="headline white--text font-weight-bold">{{ title }}</h2>
      </div>
    </v-app-bar>
    <v-content>
      <v-container class="container" fluid fill-height>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import LanguageSelect from '~/components/LanguageSelect'
export default {
  components: { LanguageSelect },
  computed: {
    prideLocation() {
      return this.$t(`cities.${this.$nuxt.context.env.prideLocation}`)
    },
    title() {
      const { prideLocation } = this
      return this.$t('index.title', { prideLocation })
    }
  },
  mounted() {
    this.$store.commit(
      'app/SET_APP_BAR_HEIGHT',
      this.$refs.appBar.computedHeight
    )
  }
}
</script>

<style lang="scss" scoped>
.logo-wrap {
  width: 100%;
}
.appbar-ext {
  width: 100%;
}
.container {
  align-items: stretch !important;
  padding-top: 0;
  padding-bottom: 0;
}
</style>
