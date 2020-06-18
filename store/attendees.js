import { getIdLookup } from '@/utils/data'

export const state = () => ({
  attendees: [],
  attendeesIdLookup: {},
  currentAttendeeId: null
})

export const mutations = {
  SET_ATTENDEES(state, attendees) {
    state.attendees = attendees
    state.attendeesIdLookup = getIdLookup(state.attendees)
  },
  UPDATE_ATTENDEE(state, _id, attendeeData) {
    const { attendees, attendeesIdLookup } = state
    const attendee = attendees[attendeesIdLookup[_id]]
    attendees[attendeesIdLookup[_id]] = { ...attendeeData, ...attendee }
  },
  APPEND_ATTENDEE(state, attendee) {
    const prevLength = state.attendees.length
    state.attendees.push(attendee)
    state.attendeesIdLookup[attendee._id] = prevLength
  },
  SET_CURRENT_ATTENDEE_ID(state, _id) {
    state.currentAttendeeId = _id
  }
}

export const actions = {
  async fetchAttendees({ commit, state, dispatch }) {
    try {
      const response = await this.$axios.get('/api/v1/attendees')
      commit('SET_ATTENDEES', response.data._items)
      return state.attendees
    } catch (e) {
      console.error(e)
    }
  },
  async createCurrentAttendee(
    { commit },
    { lat, lng, solidarityCountry, emojiIndices }
  ) {
    console.log(
      'createCurrentAttendee',
      lat,
      lng,
      solidarityCountry,
      emojiIndices
    )
    try {
      const response = await this.$axios.post('/api/v1/attendees', {
        lat,
        lng,
        solidarityCountry,
        emojiIndices
      })
      console.log(response.data)
      const { _id } = response.data
      commit('APPEND_ATTENDEE', {
        _id,
        lat,
        lng,
        solidarityCountry,
        emojiIndices
      })
      commit('SET_CURRENT_ATTENDEE_ID', _id)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  },
  async updateCurrentAttendee({ commit, state }, _id, newData) {
    // Requires createAttendee to be called first, or else the attendee will not be
    // available in this store
    try {
      const response = await this.$axios.patch(
        `/api/v1/attendees/${state.currentAttendeeId}`,
        newData
      )
      console.log(response.data)
      commit('UPDATE_ATTENDEE', _id, response.data)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }
}
