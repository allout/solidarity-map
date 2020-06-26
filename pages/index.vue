<template>
  <div style="width: 100%">
    <v-row ref="mapPanel">
      <v-col class="pa-0 map-box" :style="mapBoxStyle">
        <Map v-if="ready" />
      </v-col>
    </v-row>
    <div ref="infoPanel">
      <InfoPanel />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import { latLngBounds } from 'leaflet'
import Map from '~/components/Map'
import InfoPanel from '~/components/InfoPanel'

const displayCorrectSnackBar = (vm, currentAttendeeId) => {
  // Display the appropriate snackbar based on whether
  // there is a currentAttendeeId or not
  vm.$store.commit('app/SET_SHOW_READ_MORE_SNACKBAR', !!currentAttendeeId)
  vm.$store.commit('app/SET_SHOW_WELCOME_SNACKBAR', !currentAttendeeId)
}

export default {
  components: {
    Map,
    InfoPanel
  },
  data: () => ({
    zoom: 1,
    center: [0, 0]
  }),
  computed: {
    mapBoxHeight() {
      return `calc(100vh - ${this.appBarHeight}px)`
    },
    mapBoxStyle() {
      return `height: ${this.mapBoxHeight}`
    },
    canonicalUrl() {
      const protocol = process.env.isProduction ? 'https' : 'http'
      return `${protocol}://${this.baseUrl}${this.$route.path}`
    },
    ...mapState('app', ['baseUrl', 'appBarHeight']),
    ...mapState('attendees', ['currentAttendeeId']),
    ...mapState('map', ['ready'])
  },
  watch: {
    currentAttendeeId(newId) {
      displayCorrectSnackBar(this, newId)
    }
  },
  created() {
    const {
      center,
      zoom,
      bounds: maxBounds
    } = require(`~/maps/${process.env.PRIDE_LOCATION}/initial.js`)
    this.$store.commit('map/UPDATE_MAP_STATE', {
      ready: true,
      center,
      zoom,
      maxBounds
    })

    const { req } = this.$nuxt.context
    const host = req ? req.headers.host : ''
    if (host) {
      this.$store.commit('app/SET_BASE_URL', host)
    }

    this.$store.dispatch('attendees/fetchTotals')
    this.$store.dispatch('map/fetchAreaGeojson')
  },
  mounted() {
    this.$store.commit('app/SET_INFO_PANEL_REF', this.$refs.infoPanel)
    this.$store.commit('app/SET_MAP_PANEL_REF', this.$refs.mapPanel)
    displayCorrectSnackBar(this, this.currentAttendeeId)
  },
  head() {
    return {
      meta: [
        {
          property: 'og:url',
          content: this.canonicalUrl
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped></style>
