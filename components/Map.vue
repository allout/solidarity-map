<template>
  <client-only>
    <l-map
      id="map"
      ref="leaflet"
      class="flag-planted"
      :zoom="zoom"
      :center="center"
      @ready="onMapReady"
      @update:zoom="onMapZoom"
    >
      <l-tile-layer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" />
      <l-geo-json
        v-if="areaGeojson"
        ref="area"
        :geojson="areaGeojson"
        :options="areaOptions"
        :options-style="areaOptionsStyle"
        @click="onAreaClick"
      />
      <l-marker
        v-for="flag in flags"
        :key="`flag-${flag._id}`"
        :ref="flag.isNewAttendee && 'newAttendee'"
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
      offset: [6, -15]
    },
    flagIconOptions: {
      iconSize: [22, 22],
      iconUrl: require('@/assets/images/icons/flag.png'),
      iconAnchor: [-4, 20]
    }
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
        className: this.flagIsPlaced ? '' : 'flag-pointer'
      }
    },
    ...mapState('app', [
      'appBarHeight',
      'flagIsPlaced',
      'prideLocation',
      'year'
    ]),
    ...mapState('map', [
      'enableMarkerPopupOnHover',
      'showZoomControl',
      'bounds',
      'center',
      'zoom',
      'areaGeojson'
    ]),
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
    flagIsPlaced(isPlaced) {
      this.$nextTick(() => {
        // We need to force a refresh of the area style when flagIsPlaced changes
        const { mapObject } = this.$refs.area
        mapObject.eachLayer((layer) => {
          if (isPlaced) {
            layer._path.classList.remove('flag-pointer')
          } else {
            layer._path.classList.add('flag-pointer')
          }
        })
      })
    },
    flags(newFlags, oldFlags) {
      console.log(newFlags)
    }
  },
  created() {
    this.$store.dispatch('attendees/fetchAttendees')
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

      // For some reason I need to assign the value of the reactive this.flagIsPlaced variable in
      // order for the correct value to be used by this function
      const flagIsPlaced = this.flagIsPlaced

      if (flagIsPlaced) {
        // If the flag is alredy placed, show the read more snackbar
        this.$store.commit('app/SET_SHOW_READ_MORE_SNACKBAR', true)
      } else {
        // When flag location is clicked, zoom the map in a little unless it's already zoomed enough
        const mapZoom = mapObject.getZoom()
        const zoomTo = mapZoom < 18 ? mapZoom + 1 : mapZoom
        // Center map on click location
        mapObject.setView(evt.latlng, zoomTo)

        // Since the flag is not already placed we enable the form
        this.$store.commit('formDialog/SET_VISIBLE', true)
        this.$store.commit('attendees/UPDATE_ATTENDEE', {
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
