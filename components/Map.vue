<template>
  <client-only>
    <l-map id="map" ref="leaflet" :zoom="zoom" :center="center">
      <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
      <l-marker
        v-for="(marker, index) in attendees"
        :key="`marker-${index}`"
        :lat-lng="marker.center"
        @mouseover="onMarkerMouseover"
        @mouseout="onMarkerMouseout"
      >
        <l-popup v-if="enableMarkerPopups">
          <p v-if="marker.name" class="font-weight-bold">
            {{ marker.name }}
          </p>
          <p v-if="marker.message" class="">"{{ marker.message }}"</p>
        </l-popup>
        <l-icon :icon-size="[32, 32]" :icon-url="flagImg"> </l-icon>
      </l-marker>
      <l-geo-json
        v-if="areaGeojson"
        :geojson="areaGeojson"
        :options="{
          // L.geoJSON options
          // See: https://leafletjs.com/reference-1.6.0.html#geojson-option
          // Ensure that no markers are rendered on points in the area polygon
          pointToLayer: (geojsonPoint, latlng) => null,
          style: () => ({
            color: 'var(--v-primary-lighten1)'
          })
        }"
        @click="onAreaClick"
      />
    </l-map>
  </client-only>
</template>

<script>
// import { LatLngBounds } from 'leaflet'
import { mapState } from 'vuex'

export default {
  name: 'Map',
  computed: {
    isPortableWidth() {
      return this.$vuetify.breakpoint.mdAndDown
    },
    flagImg: () => require('@/assets/icons/flag.png'),
    ...mapState('app', ['appBarHeight', 'flagIsPlaced']),
    ...mapState('map', [
      'enableMarkerPopups',
      'showZoomControl',
      'bounds',
      'center',
      'zoom',
      'areaGeojson'
    ]),
    ...mapState('attendees', ['attendees'])
  },
  watch: {
    showZoomControl(newValue) {
      const { mapObject } = this.$refs.leaflet
      if (newValue) {
        mapObject.addControl(mapObject.zoomControl, { position: 'topleft' })
      } else {
        mapObject.removeControl(mapObject.zoomControl)
      }
    },
    isPortableWidth(newValue) {
      this.$store.commit('map/SET_SHOW_ZOOM_CONTROL', !newValue)
    }
  },
  created() {
    this.$store.dispatch('attendees/fetchAttendees')
  },
  mounted() {
    const vm = this
    this.$nextTick(function() {
      const { mapObject } = this.$refs.leaflet
      // Fix sizing
      mapObject.invalidateSize()
      // Remove default zoom control that comes with the map (we dynamically add our own below)
      mapObject.removeControl(mapObject.zoomControl)
      // Dynamically set the initial state for the visibility of the zoom control
      vm.$store.commit('map/SET_SHOW_ZOOM_CONTROL', !this.isPortableWidth)

      // Handle map zoom event
      mapObject.on('zoom', function(evt) {
        const { _zoom: zoom } = evt.target
        vm.$store.commit('map/UPDATE_MAP_STATE', { zoom })
      })
    })
  },
  methods: {
    onMarkerMouseover(evt) {
      evt.target.openPopup()
    },
    onMarkerMouseout(evt) {
      evt.target.closePopup()
    },
    onAreaClick(evt) {
      const { mapObject } = this.$refs.leaflet
      console.log(evt)
      // When flag is placed, zoom the map in a little unless it's already zoomed enough
      const mapZoom = mapObject.getZoom()
      const zoomTo = mapZoom < 18 ? mapZoom + 1 : mapZoom
      // Center map on click location
      mapObject.setView(evt.latlng, zoomTo)

      // Hide welcome snackbar
      this.$store.commit('app/SET_SHOW_WELCOME_SNACKBAR', false)

      if (this.flagisPlaced) {
        // If the flag is alredy placed, show the read more snackbar
        this.$store.commit('app/SET_SHOW_READ_MORE_SNACKBAR', true)
      } else {
        this.$store.commit('map/SET_SHOW_ZOOM_CONTROL', false)
        // Otherwise, if the flag is not already placed we enable the form
        this.$store.commit('formDialog/SET_VISIBLE', true)
        this.$store.commit('formDialog/UPDATE_SUBMITTED', {
          ...evt.latlng
        })
      }
    }
  }
}
</script>

<style lang="scss">
#map {
  height: 100%;

  & >>> .leaflet-pane {
    z-index: 200;
  }
}
.leaflet-interactive {
  cursor: url('/icons/flag.png') 0 32, auto;
}
</style>
