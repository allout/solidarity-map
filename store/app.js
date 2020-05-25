export const state = () => ({
  appBarHeight: 0,
  showFormDialog: true
})

export const mutations = {
  SET_APP_BAR_HEIGHT(state, appBarHeight) {
    state.appBarHeight = appBarHeight
  },
  SET_FORM_VISIBLE(state, showFormDialog) {
    state.showFormDialog = showFormDialog
  }
}
