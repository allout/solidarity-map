<template>
  <v-dialog
    v-model="visible"
    max-width="380"
    class="form-dialog"
    @click:outside="$store.commit('formDialog/SET_VISIBLE', false)"
  >
    <v-app-bar
      ref="appBar"
      :color="appBarBgColor"
      height="150"
      :class="`dialog-app-bar ${appBarTextClass}`"
      flat
    >
      <div
        class="cross-icon"
        @click="$store.commit('formDialog/SET_VISIBLE', false)"
      >
        <CrossSVG :class="invertAppBarColors ? 'invert' : ''" />
      </div>
      <template v-if="step === steps.FLAG">
        <h2 class="title font-weight-bold mb-2 pr-5">
          {{ $t('dialogs.steps.flag.title') }}
        </h2>
        <p class="font-weight-bold">
          {{ $t('dialogs.steps.flag.text', { prideLocation }) }}
        </p>
      </template>
      <template v-if="step === steps.SUBSCRIPTION">
        <h2 class="title font-weight-bold mb-2 pr-5">
          {{ $t('dialogs.steps.subscription.title') }}
        </h2>
        <p class="font-weight-bold">
          {{ $t('dialogs.steps.subscription.text', { prideLocation }) }}
        </p>
      </template>
      <template v-if="step === steps.SHARE">
        <h2 class="title font-weight-bold mb-2 pr-5">
          {{ $t('dialogs.steps.share.title') }}
        </h2>
        <p class="">
          {{ $t('dialogs.steps.share.text', { prideLocation }) }}
        </p>
      </template>
    </v-app-bar>
    <flag-step v-if="step === steps.FLAG" :key="steps.FLAG" />
    <subscription-step
      v-if="step === steps.SUBSCRIPTION"
      :key="steps.SUBSCRIPTION"
    />
    <share-step v-if="step === steps.SHARE" :key="steps.SHARE" />
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'
import FlagStep from './components/FlagStep'
import SubscriptionStep from './components/SubscriptionStep'
import ShareStep from './components/ShareStep'
import CrossSVG from '~/assets/images/icons/cross.svg?inline'

export default {
  components: {
    FlagStep,
    CrossSVG,
    SubscriptionStep,
    ShareStep
  },
  computed: {
    prideLocation() {
      return this.$t(`cities.${this.$nuxt.context.env.PRIDE_LOCATION}`)
    },
    invertAppBarColors() {
      return this.step === this.steps.SHARE
    },
    appBarBgColor() {
      return this.invertAppBarColors ? 'white' : 'primary'
    },
    appBarTextClass() {
      return this.invertAppBarColors ? 'black--text' : 'white--text'
    },
    ...mapState('formDialog', ['visible', 'step', 'steps']),
    ...mapState('app', ['flagIsPlaced'])
  },
  watch: {
    visible(newVal, oldVal) {
      // Activate some things if the flag is already placed and the dialog is going invisible
      if (!newVal && this.flagIsPlaced) {
        // Make it so hovering over flags now reveals the popup
        this.$store.commit('map/SET_ENABLE_MARKER_POPUP_ON_HOVER', true)
        // Display the read more snackbar
        this.$store.commit('app/SET_SHOW_READ_MORE_SNACKBAR', true)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.form-dialog {
  z-index: 1002;
}
.dialog-app-bar {
  &::v-deep .v-toolbar__content {
    flex-direction: column;
    justify-content: flex-start;
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

  svg {
    &.invert {
      g {
        stroke: var(--v-primary-base);
      }
    }
  }
}
</style>
