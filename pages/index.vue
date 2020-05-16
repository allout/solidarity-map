<template>
  <v-row class="">
    <v-col class="pa-0">
      <client-only>
        <l-map :zoom="zoom" :center="center" :style="`height: ${mapHeight}`">
          <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
          <l-marker :lat-lng="center" />
        </l-map>
      </client-only>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'

export default {
  asyncData({ env }) {
    return {
      ...require(`~/geojson/${env.prideLocation}/map-initial.json`)
    }
  },
  data: () => ({
    zoom: 1,
    center: [0, 0]
  }),
  computed: {
    mapHeight() {
      return `calc(100vh - ${this.appBarHeight}px)`
    },
    ...mapState('app', ['appBarHeight'])
  }
}
</script>

<style lang="scss" scoped></style>
