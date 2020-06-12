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
    <transition-group name="fade" tag="div">
      <flag-step v-if="step === steps.FLAG" :key="steps.FLAG" />
      <subscription-step
        v-if="step === steps.SUBSCRIPTION"
        :key="steps.SUBSCRIPTION"
      />
      <share-step v-if="step === steps.SHARE" :key="steps.SHARE" />
    </transition-group>
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
    ...mapState('formDialog', ['visible', 'step', 'steps'])
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
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
