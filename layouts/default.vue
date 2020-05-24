<template>
  <v-app>
    <v-app-bar ref="appBar" color="primary" app flat extension-height="110">
      <div
        slot="extension"
        class="appbar-ext d-flex justify-space-between py-5"
      >
        <div class="">
          <p class="white--text">
            <span class="title">{{ $t('site.title') }}</span
            ><br />
            <span class="title font-weight-black">{{ title }}</span>
          </p>
        </div>
        <v-btn color="white" outlined>English</v-btn>
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
export default {
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
.appbar-ext {
  width: 100%;
}
.container {
  align-items: stretch !important;
  padding-top: 0;
  padding-bottom: 0;
}
</style>
