<template>
  <v-dialog v-model="showFormDialog" persistent max-width="300">
    <v-app-bar ref="appBar" color="primary" extension-height="160" flat>
      <div slot="extension" class="appbar-ext">
        <h3 class="title font-weight-bold white--text mb-2" extended>
          Optionally tell us who you are and your message of solidarity
        </h3>
        <p class="white--text">
          Showing love for the LGBT+ community in {{ prideLocation }} is easy!
          Simply submit the form below.
        </p>
      </div>
    </v-app-bar>
    <v-card>
      <!-- <v-btn
        color="green darken-1"
        text
        @click="$store.commit('app/SET_FORM_VISIBLE', false)"
      >
        Disagree
      </v-btn>
      <v-btn
        color="green darken-1"
        text
        @click="$store.commit('app/SET_FORM_VISIBLE', false)"
      >
        Agree
      </v-btn> -->
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    prideLocation() {
      return this.$t(`cities.${this.$nuxt.context.env.prideLocation}`)
    },
    ...mapState('app', ['showFormDialog'])
  }
}
</script>
