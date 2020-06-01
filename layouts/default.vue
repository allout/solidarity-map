<template>
  <v-app class="app">
    <v-app-bar ref="appBar" color="primary" app flat extension-height="110">
      <div class="logo-wrap d-flex justify-end" style="width: 100%">
        <language-select />
      </div>
      <div slot="extension" class="appbar-ext">
        <h1 class="headline white--text">{{ $t('site.title') }}</h1>
        <h2 class="headline white--text font-weight-bold">{{ title }}</h2>
      </div>
    </v-app-bar>
    <v-content>
      <v-container class="container" fluid fill-height>
        <nuxt />
      </v-container>
    </v-content>
    <form-dialog />
  </v-app>
</template>

<script>
import LanguageSelect from '~/components/LanguageSelect'
import FormDialog from '~/components/FormDialog'

export default {
  components: { LanguageSelect, FormDialog },
  computed: {
    prideLocation() {
      return this.$t(`cities.${this.$nuxt.context.env.PRIDE_LOCATION}`)
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

<style lang="scss">
.container:first-of-type {
  align-items: stretch !important;
  padding-top: 0;
  padding-bottom: 0;
}
.leaflet-pane {
  z-index: 200;
}
</style>
