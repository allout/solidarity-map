<template>
  <v-row class="">
    <v-col class="pa-0 map-box" :style="mapBoxStyle">
      <Map v-if="ready" />
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
// import { latLngBounds } from 'leaflet'
import Map from '@/components/Map'

export default {
  components: {
    Map
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
      return `${this.baseUrl}${this.$route.path}`
    },
    ...mapState('app', ['prideLocation', 'baseUrl']),
    ...mapState('map', ['ready'])
  },
  created() {
    const mapState = require(`~/maps/${process.env.PRIDE_LOCATION}/initial.js`)
    this.$store.commit('map/UPDATE_MAP_STATE', {
      ready: true,
      ...mapState
    })

    const { req } = this.$nuxt.context
    const host = req ? req.headers.host : ''
    if (host) {
      this.$store.commit('app/SET_BASE_URL', host)
    }

    this.$store.dispatch('map/fetchAreaGeojson')
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
