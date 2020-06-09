import { getKeyMirror } from '~/utils/data'

const steps = getKeyMirror('FLAG', 'SUBSCRIPTION', 'SHARE')

export const state = () => ({
  visible: false,
  steps,
  step: steps.FLAG,
  submitted: {}
})

export const mutations = {
  SET_VISIBLE(state, visible) {
    state.visible = visible
  },
  UPDATE_SUBMITTED(state, obj = {}) {
    state.submitted = { ...obj, ...state.submitted }
  },
  NEXT_STEP(state) {
    switch (state.step) {
      case steps.FLAG:
        state.step = steps.SUBSCRIPTION
        break
      case steps.SUBSCRIPTION:
        state.step = steps.SHARE
        break
    }
  }
}
