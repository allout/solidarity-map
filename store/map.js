import RestService from '@/services/RestService'

export const state = () => ({
  markers: [],
  enableMarkerPopups: false,
  showZoomControl: false
})

export const mutations = {
  SET_MARKERS(state, markers) {
    state.markers = markers
  },
  SET_ENABLE_MARKER_POPUPS(state, enableMarkerPopups) {
    state.enableMarkerPopups = enableMarkerPopups
  },
  SET_SHOW_ZOOM_CONTROL(state, showZoomControl) {
    state.showZoomControl = showZoomControl
  }
}

export const actions = {
  async fetchMarkers({ commit, state }) {
    const response = await RestService.getParticipants()
    commit('SET_MARKERS', response.data)
    return state.markers
  }
}
