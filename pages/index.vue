<template>
  <v-row class="">
    <v-col class="pa-0">
      <client-only>
        <l-map id="map" :zoom="zoom" :center="center" :style="mapStyle">
          <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
          <l-marker
            v-for="(marker, index) in markers"
            :key="`marker-${index}`"
            :lat-lng="marker.center"
          >
            <l-popup>
              <p v-if="marker.name" class="font-weight-bold">
                {{ marker.name }}
              </p>
              <p v-if="marker.message" class="">"{{ marker.message }}"</p>
            </l-popup>
          </l-marker>
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
    center: [0, 0],
    markers: [
      {
        center: [59.93912, 30.31562],
        name: 'Tim',
        message: 'We are with you! 🥰'
      },
      {
        center: [59.93892, 30.31762],
        name: 'Stana',
        message: 'So much love! ❤️'
      },
      {
        center: [59.93952, 30.31762],
        name: 'Janina',
        message: 'So glad I could be here today 😊'
      },
      {
        center: [59.93952, 30.31522],
        name: 'Christoffer',
        message: 'Sending solidarity from Deutschland! 💪🏻'
      }
    ]
  }),
  computed: {
    mapHeight() {
      return `calc(100vh - ${this.appBarHeight}px)`
    },
    mapStyle() {
      return `height: ${this.mapHeight}`
    },
    ...mapState('app', ['appBarHeight'])
  }
}
</script>

<style lang="scss">
.leaflet-container {
  font-size: 16px;
}
</style>
