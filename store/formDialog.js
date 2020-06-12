import { getKeyMirror } from '~/utils/data'

const steps = getKeyMirror('FLAG', 'SUBSCRIPTION', 'SHARE')

export const state = () => ({
  visible: false,
  steps,
  step: steps.FLAG
})

export const getters = {
  getFlagLatLng: ({ submitted }) => [submitted.lat, submitted.lng]
}

export const mutations = {
  SET_VISIBLE(state, visible) {
    state.visible = visible
  },
  NEXT_STEP(state) {
    switch (state.step) {
      case steps.FLAG:
        if (process.env.SKIP_SUBSCRIPTION) {
          state.step = steps.SHARE
        } else {
          state.step = steps.SUBSCRIPTION
        }
        break
      case steps.SUBSCRIPTION:
        state.step = steps.SHARE
        break
      default:
        state.step = steps.SHARE
    }
  }
}
