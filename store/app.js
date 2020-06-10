const now = new Date()

export const state = () => ({
  appBarHeight: 0,
  flagIsPlaced: false,
  showWelcomeSnackbar: true,
  showReadMoreSnackbar: true,
  now,
  year: now.getFullYear(),
  prideLocation: ''
})

export const mutations = {
  SET_APP_BAR_HEIGHT(state, appBarHeight) {
    state.appBarHeight = appBarHeight
  },
  SET_SHOW_WELCOME_SNACKBAR(state, showWelcomeSnackbar) {
    state.showWelcomeSnackbar = showWelcomeSnackbar
  },
  SET_SHOW_READ_MORE_SNACKBAR(state, showReadMoreSnackbar) {
    state.showReadMoreSnackbar = showReadMoreSnackbar
  },
  SET_PRIDE_LOCATION(state, prideLocation) {
    state.prideLocation = prideLocation
  }
}
