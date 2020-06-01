<template>
  <client-only>
    <l-map id="map" ref="leaflet" :zoom="zoom" :center="center">
      <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
      <l-marker
        v-for="(marker, index) in markers"
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
    isPortableWidth() {
      return this.$vuetify.breakpoint.mdAndDown
    },
    ...mapState('app', ['appBarHeight', 'flagIsPlanted']),
    ...mapState('map', ['markers', 'enableMarkerPopups', 'showZoomControl'])
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
    this.$store.dispatch('map/fetchMarkers')
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

      mapObject.on('click', function(evt) {
        vm.$store.commit('app/SET_SHOW_WELCOME_SNACKBAR', false)
        if (this.flagIsPlanted) {
          // If the flag is alredy planted, show the read more snackbar
          vm.$store.commit('app/SET_SHOW_READ_MORE_SNACKBAR', true)
        } else {
          vm.$store.commit('map/SET_SHOW_ZOOM_CONTROL', false)
          // Otherwise, if the flag is not already planted we enable the form
          vm.$store.commit('app/SET_SHOW_FORM_DIALOG', true)
        }
      })
    })
  },
  methods: {
    onMarkerMouseover(evt) {
      evt.target.openPopup()
    },
    onMarkerMouseout(evt) {
      evt.target.closePopup()
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

  // cursor: url('~assets/icons/flag-icon.png'), auto;
  cursor: crosshair;
}
</style>
