<template>
  <v-snackbar color="white" :value="showReadMoreSnackbar" :timeout="0">
    <img
      class="mr-4"
      src="~assets/images/icons/flag.png"
      alt="$t('accessibility.imgAlts.flag')"
      width="25"
      height="25"
    />
    <span class="black--text subtitle-1">
      {{ $t('snackbars.readMore.message') }}
    </span>
    <v-btn color="primary" small @click.prevent="onButtonClick">
      {{ $t('snackbars.readMore.buttonLabel') }}
    </v-btn>
  </v-snackbar>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ReadMoreSnackbar',
  computed: {
    ...mapState('app', ['showReadMoreSnackbar'])
  },
  methods: {
    onButtonClick(evt) {
      this.$store.commit('app/SET_SHOW_WELCOME_SNACKBAR', false)
    }
  }
}
</script>
