<template>
  <v-snackbar color="white" :value="showReadMoreSnackbar" :timeout="-1">
    <span class="black--text subtitle-1">
      {{ $t('snackbars.readMore.message') }}
    </span>
    <v-btn color="primary" @click="onButtonClick">
      {{ $t('snackbars.readMore.buttonLabel') }}
    </v-btn>
  </v-snackbar>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ReadMoreSnackbar',
  computed: {
    ...mapState('app', ['showReadMoreSnackbar', 'infoPanelRef'])
  },
  methods: {
    onButtonClick(evt) {
      this.infoPanelRef.scrollIntoView(true)
      this.$store.commit('app/SET_SHOW_READ_MORE_SNACKBAR', false)
      this.$store.commit('app/SET_SHOW_BACK_TO_MAP_SNACKBAR', true)
    }
  }
}
</script>
