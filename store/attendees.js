import { v4 as uuidv4 } from 'uuid'
import { getIdLookup, getObjFromProps } from '@/utils/data'

const mapOnlyProps = ['lat', 'lng', 'solidarityCountry', 'emojiIndices']
// Performance: the maximum number of attendees to request for any given map view
const maxAttendees = 1000

export const state = () => ({
  attendees: [],
  attendeesIdLookup: {},
  currentAttendeeId: null,
  totalsReady: false,
  numAttendees: 0,
  numCountries: 0,
  fetchJobId: null
})

export const getters = {
  currentAttendee: (state) =>
    state.currentAttendeeId &&
    state.attendees[state.attendeesIdLookup[state.currentAttendeeId]],
  numFetchedAttendees: (state) => state.attendees.length
}

export const mutations = {
  SET_ATTENDEES(state, attendees) {
    state.attendees = attendees
    state.attendeesIdLookup = getIdLookup(state.attendees)
  },
  APPEND_ATTENDEES(state, attendees) {
    // for (const attendee of attendees) {}
    // state.attendees = state.attendees.concat(attendees)
    state.attendees.push(...attendees)
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
  },
  SET_FETCH_JOB_ID(state, fetchJobId) {
    state.fetchJobId = fetchJobId
  }
}

const fetchAttendeesPage = (state, rootState, $axios, fetchJobId, page) => {
  const { bounds } = rootState.map
  const { _northEast, _southWest } = bounds

  const params = {}
  if (_northEast && _southWest) {
    params.where = {
      $and: [
        { lat: { $gt: _southWest.lat, $lt: _northEast.lat } },
        { lng: { $gt: _southWest.lng, $lt: _northEast.lng } }
      ]
    }
  }
  if (page) {
    params.page = page
  }

  const options = {}
  if (Object.keys(params).length) {
    options.params = params
  }

  const promise = $axios.get('/api/v1/attendees', options).then((response) => {
    if (state.fetchJobId === fetchJobId) {
      return response
    }
  })
  return promise
}

export const actions = {
  async fetchAttendees({ commit, state, rootState, dispatch, getters }) {
    const fetchJobId = uuidv4()

    commit('SET_FETCH_JOB_ID', fetchJobId)
    commit('SET_ATTENDEES', [])

    let page = 1
    let error = null
    let nextPage

    do {
      nextPage = null

      try {
        const response = await fetchAttendeesPage(
          state,
          rootState,
          this.$axios,
          fetchJobId,
          page
        )
        if (response) {
          const { data } = response
          if (data) {
            const { _items } = data
            commit('APPEND_ATTENDEES', _items)
            const { next } = data._links || {}
            nextPage = next
          }
        }
      } catch (e) {
        error = e
        console.error(e)
      }

      page = page + 1
    } while (nextPage && !error && getters.numFetchedAttendees < maxAttendees)
  },
  async fetchTotals({ commit }) {
    try {
      const response = await this.$axios.get('/api/v1/attendees/totals')
      const { countries, attendees } = response.data._items[0]
      const toUpdate = {
        numCountries: countries[0].total,
        numAttendees: attendees[0].total,
        totalsReady: true
      }
      commit('UPDATE_STORE', toUpdate)
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
      // Persist ID in local storage
      this.$warehouse.set('attendee', { currentAttendeeId: _id })
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
