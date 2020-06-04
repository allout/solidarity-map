<template>
  <v-dialog v-model="showFormDialog" max-width="380" class="form-dialog">
    <v-app-bar ref="appBar" color="primary" extension-height="200" flat>
      <div slot="extension" class="appbar-ext">
        <h2 class="title font-weight-bold white--text mb-2">
          {{ $t('dialogs.form.header.title') }}
        </h2>
        <h2 class="title white--text mb-2">
          {{ $t('dialogs.form.header.subtitle') }}
        </h2>
        <p class="white--text">
          {{ $t('dialogs.form.header.text', { prideLocation }) }}
        </p>
      </div>
    </v-app-bar>
    <flag-step v-if="step === steps.FLAG" />
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'
import FlagStep from './components/FlagStep'
import { getKeyMirror } from '~/utils/data'

const steps = getKeyMirror('FLAG', 'SUBSCRIPTION', 'SHARE')

export default {
  components: {
    FlagStep
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

<style lang="scss" scoped></style>
