const now = new Date()

export const state = () => ({
  docReady: false,
  appBarHeight: 170,
  flagIsPlaced: false,
  showWelcomeSnackbar: true,
  showReadMoreSnackbar: false,
  showBackToMapSnackbar: false,
  now,
  year: now.getFullYear(),
  prideLocation: '',
  numAttendees: 5000,
  numCountries: 12,
  baseUrl: '',
  infoPanelRef: null,
  mapPanelRef: null
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
  },
  SET_INFO_PANEL_REF(state, infoPanelRef) {
    state.infoPanelRef = infoPanelRef
  },
  SET_SHOW_BACK_TO_MAP_SNACKBAR(state, showBackToMapSnackbar) {
    state.showBackToMapSnackbar = showBackToMapSnackbar
  },
  SET_MAP_PANEL_REF(state, mapPanelRef) {
    state.mapPanelRef = mapPanelRef
  }
}
