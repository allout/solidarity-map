import RestService from '@/services/RestService'
import { getIdLookup } from '@/utils/data'

export const state = () => ({
  attendees: [],
  attendeesIdLookup: {},
  newAttendeeId: null
})

export const mutations = {
  SET_ATTENDEES(state, attendees) {
    state.attendees = attendees
    state.attendeesIdLookup = getIdLookup(state.attendees)
  },
  ADD_ATTENDEE(state, attendee) {
    const prevLength = state.attendees.length
    state.attendeed.push(attendee)
    state.attendeesIdLookup[attendee._id] = prevLength
  }
}

export const actions = {
  async fetchAttendees({ commit, state, dispatch }) {
    const response = await RestService.getAttendees()
    commit('SET_ATTENDEES', response.data)
    return state.attendees
  },
  async createAttendee({ commit, rootState }) {
    const { lat, lng, solidarityCountry, emojiIndices } = rootState.formDialog
    console.log('createAttendee', lat, lng, solidarityCountry, emojiIndices)
    try {
      const response = await RestService.createAttendee(
        lat,
        lng,
        solidarityCountry,
        emojiIndices
      )
      const attendee = { isNewAttendee: true, ...response.data }
      commit('ADD_ATTENDEE', attendee)
      return attendee
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
      return null
    }
  }
}
