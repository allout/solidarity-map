<template>
  <v-row class="info-panel">
    <v-col>
      <div class="py-5">
        <h3 class="headline text-center font-weight-bold mb-5">
          {{ $t(`infoPanel.${prideLocationEnvValue}.title`) }}
        </h3>
        <p
          v-for="(paragraph, index) in paragraphs"
          :key="`p${index}`"
          class="headline"
        >
          {{ paragraph }}
        </p>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'InfoPanel',
  computed: {
    paragraphs() {
      let index = 0
      const paragraphs = []

      do {
        const translationPath = `infoPanel.${this.prideLocationEnvValue}.paragraphs.p${index}`
        if (!this.$te(translationPath)) {
          // As soon as we can't find a translation match for the given path we exit the loop
          break
        }
        paragraphs.push(this.$t(translationPath))
        index++
      } while (true)

      return paragraphs
    },
    ...mapState('app', ['appBarHeight', 'prideLocationEnvValue'])
  }
}
</script>

<style lang="scss" scoped>
.info-panel {
  background-color: #333;
  color: white;
}
</style>
