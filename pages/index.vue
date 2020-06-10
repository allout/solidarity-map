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
    title() {
      const { prideLocation } = this
      return this.$t('index.title', { prideLocation })
    },
    mapBoxHeight() {
      return `calc(100vh - ${this.appBarHeight}px)`
    },
    mapBoxStyle() {
      return `height: ${this.mapBoxHeight}`
    },
    ...mapState('app', ['prideLocation'])
  },
  head() {
    return {
      title: this.title
    }
  }
}
</script>

<style lang="scss" scoped></style>
