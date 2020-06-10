<template>
  <form class="d-flex flex-column white pa-2">
    <div class="d-flex justify-center flex-wrap">
      <a
        :href="facebookShareUrl"
        target="_blank"
        class="d-flex flex-column align-center text-decoration-none mr-2 mb-2"
      >
        <div class="share-btn">
          F
        </div>
        <span class="share-name">Facebook</span>
      </a>
    </div>
    <v-btn color="primary" class="mt-8" @click.prevent="onClick">
      {{ $t('dialogs.form.buttons.map.label') }}
    </v-btn>
  </form>
</template>

<script>
export default {
  name: 'ShareStep',
  data: (vm) => ({
    // vm.$nuxt.context.req ? context.req.headers.host : window.location.origin
  }),
  computed: {
    host() {
      const origin = this.$nuxt.context.req
        ? this.$nuxt.context.req.headers.host
        : window.location.origin
      return origin
    },
    pageUrl() {
      console.log(this.host)
      return `${this.host}`
    },
    facebookShareUrl() {
      return `https://www.facebook.com/sharer/sharer.php?u=${this.pageUrl}`
    }
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
