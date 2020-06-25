import { countries } from 'countries-list'
import { emojis } from '~/utils/resources'

export const state = () => ({
  enableMarkerPopupOnHover: false,
  showZoomControl: false,
  bounds: [],
  maxBounds: [],
  center: [],
  zoom: 18,
  ready: false,
  areaGeojson: null,
  lastChosenLatlng: null,
  gRecaptchaResponse: null
})

export const getters = {
  flags: (state, getters, rootState) =>
    rootState.attendees.attendees.map(
      ({ _id, lat, lng, solidarityCountry, emojiIndices }) => ({
        _id,
        center: [lat, lng],
        countryEmoji: solidarityCountry
          ? countries[solidarityCountry]
            ? countries[solidarityCountry].emoji
            : ''
          : '',
        emojiMessage: emojiIndices
          ? emojiIndices
              .map((index) => {
                try {
                  return emojis[index]
                } catch (e) {
                  return ''
                }
              })
              .join('')
          : []
      })
    )
}

export const mutations = {
  SET_ENABLE_MARKER_POPUP_ON_HOVER(state, enableMarkerPopupOnHover) {
    state.enableMarkerPopupOnHover = enableMarkerPopupOnHover
  },
  SET_SHOW_ZOOM_CONTROL(state, showZoomControl) {
    state.showZoomControl = showZoomControl
  },
  UPDATE_MAP_STATE(state, newState) {
    Object.keys(newState).forEach((key) => {
      state[key] = newState[key]
    })
  },
  SET_AREA_GEOJSON(state, geojson) {
    state.areaGeojson = geojson
  },
  SET_LAST_CHOSEN_LATLNG(state, latlng) {
    state.lastChosenLatlng = latlng
  }
}

export const actions = {
  async fetchAreaGeojson({ commit }) {
    try {
      const response = await this.$axios.get(
        `/geojson/${process.env.PRIDE_LOCATION}/area.geojson`
      )
      commit('SET_AREA_GEOJSON', response.data)
      return response.data
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
      return null
    }
  }
}
