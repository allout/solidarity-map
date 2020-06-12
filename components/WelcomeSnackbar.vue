<template>
  <v-snackbar color="white" :value="showWelcomeSnackbar" :timeout="0">
    <div class="d-flex align-center mb-2">
      <img
        class="mr-4"
        src="~assets/images/icons/flag.png"
        srcset="
          ~assets/images/icons/flag@2x.png 2x,
          ~assets/images/icons/flag@3x.png 3x
        "
        :alt="$t('accessibility.imgAlts.flag')"
        width="25"
        height="25"
      />
      <span class="black--text subtitle-1 font-weight-bold">
        {{
          $t('snackbars.welcome.message', {
            prideLocation,
            numAttendees,
            numCountries
          })
        }}
      </span>
    </div>
  </v-snackbar>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'WelcomeSnackbar',
  computed: {
    ...mapState('app', [
      'showWelcomeSnackbar',
      'flagisPlaced',
      'prideLocation',
      'numAttendees',
      'numCountries'
    ])
  },
  methods: {
    onButtonClick(evt) {
      this.$store.commit('app/SET_SHOW_WELCOME_SNACKBAR', false)
      this.$store.commit('map/SET_ENABLE_MARKER_POPUPS', true)
    }
  }
}
</script>
