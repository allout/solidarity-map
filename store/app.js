export const state = () => ({
  appBarHeight: 0,
  showFormDialog: false,
  flagIsPlaced: false,
  showWelcomeSnackbar: true,
  showReadMoreSnackbar: true
})

export const mutations = {
  SET_APP_BAR_HEIGHT(state, appBarHeight) {
    state.appBarHeight = appBarHeight
  },
  SET_SHOW_FORM_DIALOG(state, showFormDialog) {
    state.showFormDialog = showFormDialog
  },
  SET_SHOW_WELCOME_SNACKBAR(state, showWelcomeSnackbar) {
    state.showWelcomeSnackbar = showWelcomeSnackbar
  },
  SET_SHOW_READ_MORE_SNACKBAR(state, showReadMoreSnackbar) {
    state.showReadMoreSnackbar = showReadMoreSnackbar
  }
}
