export const state = () => ({
  enableMarkerPopups: false,
  showZoomControl: false
})

export const mutations = {
  SET_ENABLE_MARKER_POPUPS(state, enableMarkerPopups) {
    state.enableMarkerPopups = enableMarkerPopups
  },
  SET_SHOW_ZOOM_CONTROL(state, showZoomControl) {
    state.showZoomControl = showZoomControl
  }
}
