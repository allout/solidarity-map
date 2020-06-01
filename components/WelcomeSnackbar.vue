<template>
  <v-snackbar color="white" :value="showWelcomeSnackbar" :timeout="0">
    <img
      class="mr-4"
      src="~assets/icons/flag.png"
      alt="$t('accessibility.imgAlts.flag')"
      width="25"
      height="25"
    />
    <span class="black--text subtitle-1 font-weight-bold">
      {{ $t('snackbars.welcome.message') }}
    </span>
    <v-btn color="primary" small @click.prevent="onButtonClick">
      {{ $t('snackbars.welcome.buttonLabel') }}
    </v-btn>
  </v-snackbar>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'WelcomeSnackbar',
  computed: {
    ...mapState('app', ['showWelcomeSnackbar'])
  },
  methods: {
    onButtonClick(evt) {
      this.$store.commit('app/SET_SHOW_WELCOME_SNACKBAR', false)
    }
  }
}
</script>
