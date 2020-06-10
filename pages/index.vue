<template>
  <v-row class="">
    <v-col class="pa-0 map-box" :style="mapBoxStyle">
      <Map :zoom="zoom" :center="center" />
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
import Map from '@/components/Map'

export default {
  components: {
    Map
  },
  asyncData({ store, env }) {
    return {
      ...require(`~/geojson/${env.PRIDE_LOCATION}/map-initial.json`)
    }
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
    ...mapState('app', ['prideLocation'])
  }
}
</script>

<style lang="scss" scoped></style>
