export const state = () => ({
  enableMarkerPopups: false,
  showZoomControl: false,
  bounds: [],
  center: [],
  zoom: 18,
  ready: false
})

export const mutations = {
  SET_ENABLE_MARKER_POPUPS(state, enableMarkerPopups) {
    state.enableMarkerPopups = enableMarkerPopups
  },
  SET_SHOW_ZOOM_CONTROL(state, showZoomControl) {
    state.showZoomControl = showZoomControl
  },
  UPDATE_MAP_STATE(state, newState) {
    Object.keys(newState).forEach((key) => {
      state[key] = newState[key]
    })
  }
}

export const actions = {
  updateMapState({ commit }, newState) {
    commit('UPDATE_MAP_STATE', newState)
  }
}
