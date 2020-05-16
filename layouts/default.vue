<template>
  <v-app>
    <v-app-bar color="primary" app flat extension-height="90">
      <div
        slot="extension"
        class="appbar-ext d-flex justify-space-between py-5"
      >
        <div class="">
          <p class="title white--text">
            Pride #UnDistanced<br />
            Solidarity with {{ prideLocation }} Pride 2020
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
      return this.$nuxt.context.env.prideLocation
    }
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
}
</style>
