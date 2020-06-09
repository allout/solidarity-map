<template>
  <v-dialog
    v-model="visible"
    max-width="380"
    class="form-dialog"
    @click:outside="$store.commit('formDialog/SET_VISIBLE', false)"
  >
    <v-app-bar
      ref="appBar"
      color="primary"
      height="200"
      class="dialog-app-bar"
      flat
    >
      <div
        class="cross-icon"
        @click="$store.commit('formDialog/SET_VISIBLE', false)"
      >
        <CrossSVG />
      </div>
      <template v-if="step === steps.FLAG">
        <h2 class="title font-weight-bold white--text mb-2">
          {{ $t('dialogs.steps.flag.title') }}
        </h2>
        <p class="white--text font-weight-bold">
          {{ $t('dialogs.steps.flag.text', { prideLocation }) }}
        </p>
      </template>
      <template v-if="step === steps.SUBSCRIPTION">
        <h2 class="title font-weight-bold white--text mb-2">
          {{ $t('dialogs.steps.subscription.title') }}
        </h2>
        <p class="white--text font-weight-bold">
          {{ $t('dialogs.steps.subscription.text', { prideLocation }) }}
        </p>
      </template>
    </v-app-bar>
    <flag-step v-if="step === steps.FLAG" />
    <subscription-step v-if="step === steps.SUBSCRIPTION" />
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'
import FlagStep from './components/FlagStep'
import SubscriptionStep from './components/SubscriptionStep'
import CrossSVG from '~/assets/icons/cross.svg?inline'

export default {
  components: {
    FlagStep,
    CrossSVG,
    SubscriptionStep
  },
  computed: {
    prideLocation() {
      return this.$t(`cities.${this.$nuxt.context.env.PRIDE_LOCATION}`)
    },
    ...mapState('formDialog', ['visible', 'step', 'steps'])
  }
}
</script>

<style lang="scss" scoped>
.dialog-app-bar {
  &::v-deep .v-toolbar__content {
    flex-direction: column;
    justify-content: flex-end;
    align-items: start;
    padding-top: 11px;
  }
}
.cross-icon {
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 14px;
  top: 15px;
  cursor: pointer;
}
</style>
