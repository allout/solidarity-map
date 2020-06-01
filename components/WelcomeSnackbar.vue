<template>
  <v-snackbar color="white" :value="showWelcomeSnackbar" :timeout="0">
    <img
      class="mr-4"
      src="~assets/icons/flag.png"
      alt="$t('accessibility.imgAlts.flag')"
      width="25"
      height="25"
    />
    <span class="black--text title font-weight-bold">
      {{ $t('snackbars.welcome.message') }}
    </span>
    <v-btn color="primary" @click.prevent="onButtonClick">
      {{ $t('snackbars.welcome.buttonLabel') }}
    </v-btn>
  </v-snackbar>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'WelcomeSnackbar',
  computed: {
    ...mapState('app', ['showWelcomeSnackbar']),
    ...mapState('app', ['flagIsPlanted'])
  },
  methods: {
    onButtonClick(evt) {
      this.$store.commit('app/SET_SHOW_WELCOME_SNACKBAR', false)
      this.$store.commit('map/SET_ENABLE_MARKER_POPUPS', true)
    }
  }
}
</script>
