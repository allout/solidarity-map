<template>
  <div class="info-panel py-5" :style="infoStyle">
    <h3 class="headline text-center font-weight-bold">Story copy goes here</h3>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'InfoPanel',
  computed: {
    infoMinHeight() {
      return `calc(100vh - ${this.appBarHeight}px)`
    },
    infoStyle() {
      return `min-height: ${this.infoMinHeight};`
    },
    ...mapState('app', ['appBarHeight'])
  }
}
</script>

<style lang="scss" scoped></style>
