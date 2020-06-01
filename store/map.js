import RestService from '@/services/RestService'

export const state = () => ({
  markersReady: false,
  markers: [],
  showFormDialog: true
})

export const mutations = {
  SET_MARKERS(state, markers) {
    state.markers = markers
  }
}

export const actions = {
  async fetchMarkers({ commit, state }) {
    const response = await RestService.getParticipants()
    commit('SET_MARKERS', response.data)
    return state.markers
  }
}
