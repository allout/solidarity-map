<template>
  <v-snackbar color="white" :value="showBackToMapSnackbar" :timeout="0">
    <span class="black--text subtitle-1 font-weight-bold">
      {{ $t('snackbars.backToMap.message') }}
    </span>
    <v-btn color="primary" @click="onButtonClick">
      {{ $t('snackbars.backToMap.buttonLabel') }}
    </v-btn>
  </v-snackbar>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'BackToMapSnackbar',
  computed: {
    ...mapState('app', ['showBackToMapSnackbar', 'mapPanelRef'])
  },
  methods: {
    onButtonClick(evt) {
      this.mapPanelRef.scrollIntoView(false)
      this.$store.commit('app/SET_SHOW_BACK_TO_MAP_SNACKBAR', false)
      this.$store.commit('app/SET_SHOW_READ_MORE_SNACKBAR', true)
    }
  }
}
</script>
