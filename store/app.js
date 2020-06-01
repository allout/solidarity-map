export const state = () => ({
  appBarHeight: 0,
  showFormDialog: false
})

export const mutations = {
  SET_APP_BAR_HEIGHT(state, appBarHeight) {
    state.appBarHeight = appBarHeight
  },
  SET_SHOW_FORM_DIALOG(state, showFormDialog) {
    state.showFormDialog = showFormDialog
  }
}
