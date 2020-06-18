import RestService from '@/services/RestService'
import { getIdLookup } from '@/utils/data'

export const state = () => ({
  attendees: [],
  attendeesIdLookup: {},
  attendee: {}
})

export const mutations = {
  SET_ATTENDEES(state, attendees) {
    state.attendees = attendees
    state.attendeesIdLookup = getIdLookup(state.attendees)
  },
  UPDATE_ATTENDEE(state, data) {
    state.attendee = { ...data, ...state.attendee }
  },
  APPEND_ATTENDEE(state) {
    const prevLength = state.attendees.length
    state.attendees.push(state.attendee)
    state.attendeesIdLookup[state.attendee._id] = prevLength
  }
}

export const actions = {
  async fetchAttendees({ commit, state, dispatch }) {
    try {
      const response = await RestService.getAttendees()
      commit('SET_ATTENDEES', response.data)
      return state.attendees
    } catch (e) {
      console.error(e)
    }
  },
  async createAttendee(
    { commit },
    { lat, lng, solidarityCountry, emojiIndices }
  ) {
    console.log('createAttendee', lat, lng, solidarityCountry, emojiIndices)
    try {
      const response = await RestService.createAttendee(
        lat,
        lng,
        solidarityCountry,
        emojiIndices
      )
      console.log(response.data)
      commit('UPDATE_ATTENDEE', { isNewAttendee: true, ...response.data })
      commit('APPEND_ATTENDEE')
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  },
  async syncAttendee({ commit, state }) {
    // Requires createAttendee to be called first, or else the attendee will not be
    // available in this store
    try {
      const response = await RestService.updateAttendee(state.attendee)
      console.log(response.data)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }
}
