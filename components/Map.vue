<template>
  <client-only>
    <l-map id="map" :zoom="zoom" :center="center">
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
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Map',
  props: {
    zoom: {
      type: Number,
      required: true
    },
    center: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapState('app', ['appBarHeight']),
    ...mapState('map', ['markers'])
  }
}
</script>

<style lang="scss" scoped>
#map {
  height: 100%;

  & >>> .leaflet-pane {
    z-index: 200;
  }
}
</style>
