<template>
  <client-only>
    <l-map
      id="map"
      ref="leaflet"
      class="flag-planted"
      :zoom="zoom"
      :center="center"
      :max-bounds="maxBounds"
      @ready="onMapReady"
      @update:zoom="onMapZoom"
      @update:bounds="onBoundsUpdated"
    >
      <l-tile-layer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" />
      <l-geo-json
        v-if="areaGeojson"
        ref="area"
        :geojson="areaGeojson"
        :options="areaOptions"
        :options-style="areaOptionsStyle"
        :attribution="geoJsonAttribution"
        @click="onAreaClick"
      />
      <l-marker
        v-for="flag in flags"
        :key="`marker-${flag._id}`"
        :ref="`marker-${flag._id}`"
        :lat-lng="flag.center"
        :options="flagOptions"
        @mouseover="onMarkerMouseover"
        @mouseout="onMarkerMouseout"
      >
        <l-popup :options="flagPopupOptions">
          <div class="d-flex flex-column align-center">
            <div class="emoji-flags">{{ flag.countryEmoji }} 🏳️‍🌈</div>
            <div class="subtitle-1 font-weight-bold">
              {{ $t('map.flags.popups.solidarityMessage') }}
            </div>
            <div class="subtitle-1 font-weight-bold mb-3">
              {{
                $t('site.purpose', {
                  prideLocation,
                  year
                })
              }}
            </div>
            <div class="emoji-message text-center">
              {{ flag.emojiMessage }}
            </div>
          </div>
        </l-popup>
        <l-icon :options="flagIconOptions" />
      </l-marker>
    </l-map>
  </client-only>
</template>

<script>
// import { LatLngBounds } from 'leaflet'
import { mapState, mapGetters } from 'vuex'
import { debounce } from 'lodash'

const debouncedOnBoundsUpdated = debounce((vm, bounds) => {
  // Store new map bounds to state so it can be used in query filters when fetching attendees/flags
  vm.$store.commit('map/UPDATE_MAP_STATE', { bounds })
  // Subsequent flags fetch
  vm.$store.dispatch('attendees/fetchAttendees')
}, 500)

const setCorrectMapBehaviour = (vm, currentAttendeeId) => {
  // Depending on whether there is a currentAttendeeId set or not, we change the map behaviour
  vm.$nextTick(() => {
    if (vm.$refs.area) {
      const { mapObject } = vm.$refs.area
      mapObject.eachLayer((layer) => {
        if (currentAttendeeId) {
          layer._path.classList.remove('flag-pointer')
        } else {
          layer._path.classList.add('flag-pointer')
        }
      })
    }
    if (currentAttendeeId) {
      const markerRefs = vm.$refs[`marker-${currentAttendeeId}`]
      if (markerRefs) {
        const marker = markerRefs[0]
        marker.mapObject.openPopup()
      }
    }
  })
}

export default {
  name: 'Map',
  data: () => ({
    flagOptions: {
      riseOnHover: true
    },
    flagPopupOptions: {
      closeButton: false,
      className: 'flag-popup',
      maxWidth: 200,
      offset: [6, -15],
      // If autoPan is activated the map tries to pan to get the popup in view,
      // even if it exceeds maxBounds causing havok
      autoPan: false
    },
    flagIconOptions: {
      iconSize: [22, 22],
      iconUrl: require('@/assets/images/icons/flag.png'),
      iconAnchor: [-4, 20]
    },
    geoJsonAttribution:
      '&copy; <a href="http://osm.org/copyright" target="_blank">OpenStreetMap</a> contributors'
  }),
  computed: {
    isPortableWidth() {
      return this.$vuetify.breakpoint.mdAndDown
    },
    areaOptions() {
      return {
        // L.geoJSON options
        // See: https://leafletjs.com/reference-1.6.0.html#geojson-option
        filter: (geoJsonFeature) => {
          // Ensure none of the points from the geojson get rendered.
          // They end up showing up as markers
          return geoJsonFeature.geometry.type !== 'Point'
        }
      }
    },
    areaOptionsStyle() {
      // Apply styles to the area overlay
      return {
        color: 'var(--v-primary-lighten1)',
        className: this.currentAttendeeId ? '' : 'flag-pointer'
      }
    },
    prideLocation() {
      return this.$t(`cities.${this.prideLocationEnvValue}`, this.$i18n.locale)
    },
    ...mapState('app', ['appBarHeight', 'prideLocationEnvValue', 'year']),
    ...mapState('map', [
      'enableMarkerPopupOnHover',
      'showZoomControl',
      'maxBounds',
      'center',
      'zoom',
      'areaGeojson'
    ]),
    ...mapState('attendees', ['currentAttendeeId']),
    ...mapGetters('map', ['flags'])
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
    },
    currentAttendeeId(newAttendeeId) {
      setCorrectMapBehaviour(this, newAttendeeId)
    }
  },
  created() {
    // Initial flags fetch
    this.$store.dispatch('attendees/fetchAttendees')
  },
  mounted() {
    setCorrectMapBehaviour(this, this.currentAttendeeId)
  },
  methods: {
    onMapReady(mapObject) {
      // Fix sizing
      mapObject.invalidateSize()
      // Remove default zoom control that comes with the map (we dynamically add our own below)
      mapObject.removeControl(mapObject.zoomControl)
      // Dynamically set the initial state for the visibility of the zoom control
      this.$store.commit('map/SET_SHOW_ZOOM_CONTROL', !this.isPortableWidth)
    },
    onMapZoom(zoom) {
      this.$store.commit('map/UPDATE_MAP_STATE', { zoom })
    },
    onMarkerMouseover(evt) {
      if (this.enableMarkerPopupOnHover) {
        evt.target.openPopup()
      }
    },
    onMarkerMouseout(evt) {
      // if (this.enableMarkerPopupOnHover) {
      //   evt.target.closePopup()
      // }
    },
    onAreaClick(evt) {
      const { mapObject } = this.$refs.leaflet

      // Hide welcome snackbar
      this.$store.commit('app/SET_SHOW_WELCOME_SNACKBAR', false)

      if (this.currentAttendeeId) {
        // If there is already a currentAttendeeId set, show the read more snackbar
        this.$store.commit('app/SET_SHOW_READ_MORE_SNACKBAR', true)
      } else {
        // When flag location is clicked, zoom the map in a little unless it's already zoomed enough
        const mapZoom = mapObject.getZoom()
        const zoomTo = mapZoom < 18 ? mapZoom + 1 : mapZoom
        // Center map on click location
        mapObject.setView(evt.latlng, zoomTo)

        // Since we don't yet have a currentAttendeeId we enable the form
        this.$store.commit('formDialog/SET_VISIBLE', true)
        // Save the lat / lng of the map click in the store
        this.$store.commit('map/SET_LAST_CHOSEN_LATLNG', evt.latlng)
      }
    },
    onBoundsUpdated(bounds) {
      debouncedOnBoundsUpdated(this, bounds)
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
.leaflet-pane {
  z-index: 200;
}
.leaflet-interactive {
  &.flag-pointer {
    cursor: url('/images/icons/flag.png') 5 32, auto;
  }
}
.flag-popup {
  .emoji-flags {
    font-size: 2.5rem;
  }
  .emoji-message {
    font-size: 1.5rem;
  }
}
</style>
