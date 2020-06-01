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
  asyncData({ env, store }) {
    store.dispatch('map/fetchMarkers')
    return {
      ...require(`~/geojson/${env.PRIDE_LOCATION}/map-initial.json`)
    }
  },
  data: () => ({
    zoom: 1,
    center: [0, 0]
  }),
  computed: {
    prideLocation() {
      return this.$t(`cities.${this.$nuxt.context.env.prideLocation}`)
    },
    title() {
      const { prideLocation } = this
      return this.$t('index.title', { prideLocation })
    },
    mapHeight() {
      return `calc(100vh - ${this.appBarHeight}px)`
    },
    mapStyle() {
      return `height: ${this.mapHeight}`
    },
    ...mapState('app', ['appBarHeight']),
    ...mapState('map', ['markers'])
  },
  head() {
    return {
      title: this.title
    }
  }
}
</script>

<style lang="scss"></style>
