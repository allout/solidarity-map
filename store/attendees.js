import { getIdLookup, getObjFromProps } from '@/utils/data'

const mapOnlyProps = ['lat', 'lng', 'solidarityCountry', 'emojiIndices']

export const state = () => ({
  attendees: [],
  attendeesIdLookup: {},
  currentAttendeeId: null,
  numAttendees: 0,
  numCountries: 0
})

export const getters = {
  currentAttendee: (state) =>
    state.currentAttendeeId &&
    state.attendees[state.attendeesIdLookup[state.currentAttendeeId]]
}

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
  },
  UPDATE_STORE(state, newState) {
    Object.keys(newState).forEach((key) => {
      state[key] = newState[key]
    })
  }
}

export const actions = {
  async fetchAttendees({ commit, state, rootState }) {
    let filter = null
    const { bounds } = rootState.map
    const { _northEast, _southWest } = bounds
    if (_northEast && _southWest) {
      filter = {
        lat: { $gte: _southWest.lat, $lte: _northEast.lat },
        lng: { $gte: _southWest.lng, $lte: _northEast.lng }
      }
    }
    const options = filter
      ? {
          params: {
            where: filter
          }
        }
      : {}
    try {
      const response = await this.$axios.get('/api/v1/attendees', options)
      commit('SET_ATTENDEES', response.data._items)
      return state.attendees
    } catch (e) {
      console.error(e)
    }
  },
  async fetchTotals({ commit }) {
    try {
      const response = await this.$axios.get('/api/v1/attendees/totals')
      const { countries, attendees } = response.data._items[0]
      const toUpdate = {
        numCountries: countries[0].total,
        numAttendees: attendees[0].total
      }
      commit('UPDATE_STORE', toUpdate)
      commit('app/SET_SHOW_WELCOME_SNACKBAR', true, { root: true })
      return toUpdate
    } catch (e) {
      console.error(e)
    }
  },
  async createCurrentAttendee(
    { commit, rootState },
    { lat, lng, solidarityCountry, emojiIndices }
  ) {
    try {
      let toPost = {
        lat,
        lng,
        solidarityCountry,
        emojiIndices
      }
      const { gRecaptchaResponse } = rootState.app
      if (gRecaptchaResponse) {
        toPost = { gRecaptchaResponse, ...toPost }
      }
      console.log('createCurrentAttendee', toPost)
      const response = await this.$axios.post('/api/v1/attendees', toPost)
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
  async updateAttendee({ commit, state, rootState }, data) {
    console.log('updateAttendee', data)
    const { _id, ...rest } = data
    // Requires the passed in attendee record to have an _id value and already be stored
    // with an _etag from the REST interface for data integrity
    const { _etag } = state.attendees[state.attendeesIdLookup[_id]]
    const { gRecaptchaResponse } = rootState.app
    if (gRecaptchaResponse) {
      rest.gRecaptchaResponse = gRecaptchaResponse
    }
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
