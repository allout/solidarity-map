<template>
  <v-dialog
    v-model="showFormDialog"
    max-width="380"
    class="form-dialog"
    @click:outside="$store.commit('app/SET_SHOW_FORM_DIALOG', false)"
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
        @click="$store.commit('app/SET_SHOW_FORM_DIALOG', false)"
      >
        <CrossSVG />
      </div>
      <h2 class="title font-weight-bold white--text mb-2">
        {{ $t('dialogs.form.header.title') }}
      </h2>
      <h2 class="title white--text mb-2">
        {{ $t('dialogs.form.header.subtitle') }}
      </h2>
      <p class="white--text">
        {{ $t('dialogs.form.header.text', { prideLocation }) }}
      </p>
    </v-app-bar>
    <flag-step v-if="step === steps.FLAG" />
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'
import FlagStep from './components/FlagStep'
import { getKeyMirror } from '~/utils/data'
import CrossSVG from '~/assets/icons/cross.svg?inline'

const steps = getKeyMirror('FLAG', 'SUBSCRIPTION', 'SHARE')

export default {
  components: {
    FlagStep,
    CrossSVG
  },
  data: (vm) => ({
    steps,
    step: steps.FLAG
  }),
  computed: {
    prideLocation() {
      return this.$t(`cities.${this.$nuxt.context.env.PRIDE_LOCATION}`)
    },
    ...mapState('app', ['showFormDialog'])
  }
}
</script>

<style lang="scss" scoped>
.dialog-app-bar {
  &::v-deep .v-toolbar__content {
    flex-direction: column;
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
