import { getIdLookup, getObjFromProps } from '@/utils/data'

const mapOnlyProps = ['lat', 'lng', 'solidarityCountry', 'emojiIndices']

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
      const { _id, _etag } = response.data
      commit('APPEND_ATTENDEE', {
        _id,
        _etag,
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
  async updateAttendee({ commit, state }, data) {
    console.log('updateAttendee', data)
    const { _id, ...rest } = data
    // Requires the passed in attendee record to have an _id value and already be stored
    // with an _etag from the REST interface for data integrity
    const { _etag } = state.attendees[state.attendeesIdLookup[_id]]
    try {
      const response = await this.$axios.patch(
        `/api/v1/attendees/${_id}`,
        rest,
        {
          headers: {
            'If-Match': _etag
            // 'Content-Type': 'application/json'
          }
        }
      )
      console.log(response.data)
      commit('UPDATE_ATTENDEE', _id, {
        // save the new _etag value just in case we need to update again
        _etag: response.data._etag,
        // save any extra data that is valid for map display
        ...getObjFromProps(rest, mapOnlyProps)
      })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }
}
