const now = new Date()

export const state = () => ({
  docReady: false,
  appBarHeight: 0,
  flagIsPlaced: false,
  showWelcomeSnackbar: true,
  showReadMoreSnackbar: true,
  now,
  year: now.getFullYear(),
  prideLocation: '',
  numAttendees: 5000,
  numCountries: 12,
  baseUrl: ''
})

export const mutations = {
  SET_DOC_READY(state, docReady) {
    state.docReady = docReady
  },
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
  },
  SET_BASE_URL(state, baseUrl) {
    state.baseUrl = baseUrl
  },
  SET_FLAG_IS_PLACED(state, isPlaced) {
    state.flagIsPlaced = isPlaced
  }
}
