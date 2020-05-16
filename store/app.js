export const state = () => ({
  appBarHeight: 0
})

export const mutations = {
  SET_APP_BAR_HEIGHT(state, appBarHeight) {
    state.appBarHeight = appBarHeight
  }
}
