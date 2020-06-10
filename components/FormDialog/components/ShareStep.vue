<template>
  <div class="d-flex flex-column white pa-2">
    <div class="d-flex justify-center flex-wrap ml-5">
      <a
        :href="facebookShareUrl"
        target="_blank"
        class="d-flex flex-column align-center text-decoration-none mr-5 mb-2"
      >
        <div class="share-btn">
          <FacebookSVG />
        </div>
        <span class="share-name">Facebook</span>
      </a>
      <a
        :href="twitterShareUrl"
        target="_blank"
        class="d-flex flex-column align-center text-decoration-none mr-5 mb-2"
      >
        <div class="share-btn">
          <TwitterSVG />
        </div>
        <span class="share-name">Twitter</span>
      </a>
      <a
        :href="whatsappShareUrl"
        target="_blank"
        class="d-flex flex-column align-center text-decoration-none mr-5 mb-2"
      >
        <div class="share-btn">
          <WhatsAppSVG />
        </div>
        <span class="share-name">WhatsApp</span>
      </a>
    </div>
    <v-btn color="primary" class="mt-8" @click.prevent="onClick">
      {{ $t('dialogs.form.buttons.map.label') }}
    </v-btn>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import FacebookSVG from '~/assets/icons/facebook.svg?inline'
import TwitterSVG from '~/assets/icons/twitter.svg?inline'
import WhatsAppSVG from '~/assets/icons/whatsapp.svg?inline'

export default {
  name: 'ShareStep',
  components: {
    FacebookSVG,
    TwitterSVG,
    WhatsAppSVG
  },
  computed: {
    host() {
      const origin = this.$nuxt.context.req
        ? this.$nuxt.context.req.headers.host
        : window.location.origin
      return origin
    },
    pageUrl() {
      return this.host + this.$nuxt.context.route.path
    },
    facebookShareUrl() {
      return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        this.pageUrl
      )}`
    },
    twitterShareUrl() {
      const { prideLocation, year, pageUrl } = this
      return `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        this.$t('sharing.twitter', { prideLocation, year, pageUrl })
      )}`
    },
    whatsappShareUrl() {
      const { prideLocation, year, pageUrl } = this
      return `https://api.whatsapp.com/send?text=${encodeURIComponent(
        this.$t('sharing.whatsapp', { prideLocation, year, pageUrl })
      )}`
    },
    ...mapState('app', ['year', 'prideLocation'])
  }
}
</script>

<style lang="scss" scoped>
.text-decoration-none {
  text-decoration: none;
}
.share-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 60px;
  background-color: var(--v-primary-base);
  border-radius: 4px;
  color: white;
}
.share-name {
  font-weight: 600;
}
</style>
