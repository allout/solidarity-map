import RestService from '@/services/RestService'
import { getIdLookup } from '@/utils/data'

export const state = () => ({
  attendees: [],
  attendeesIdLookup: {}
})

export const mutations = {
  SET_ATTENDEES(state, attendees) {
    state.attendees = attendees
    state.attendeesIdLookup = getIdLookup(state.attendees)
  }
}

export const actions = {
  async fetchAttendees({ commit, state, dispatch }) {
    const response = await RestService.getAttendees()
    commit('SET_ATTENDEES', response.data)
    return state.attendees
  }
}
