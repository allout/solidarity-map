<template>
  <v-app class="app">
    <v-app-bar
      ref="appBar"
      class="app-bar"
      color="primary"
      :height="appBarHeight"
      app
      fixed
    >
      <div ref="appBarContent" class="d-flex flex-column" style="width: 100%">
        <div class="d-flex justify-space-between align-start mb-3">
          <div class="d-flex justify-center align-center logo logo-header">
            <MainLogoSVG />
          </div>
          <language-select />
        </div>
        <h1 class="headline white--text font-weight-bold">
          {{ siteTitle }}
        </h1>
        <h2 class="headline white--text font-weight-bold">
          {{ siteSubtitle }}
        </h2>
      </div>
    </v-app-bar>
    <v-content>
      <v-container fluid fill-height>
        <nuxt />
      </v-container>
    </v-content>
    <form-dialog />
    <welcome-snackbar />
    <read-more-snackbar />
    <back-to-map-snackbar />
    <v-footer
      color="primary"
      class="white--text app-footer font-weight-600"
      absolute
      app
    >
      <v-row>
        <v-col class="d-flex flex-column align-center footer-content">
          <div class="d-flex flex-column align-center mb-3">
            <span style="font-weight: 600;" class="mb-5">{{
              $t('footer.byLine')
            }}</span>
            <div class="d-flex align-center justify-center">
              <a
                :href="$t('links.allout.href')"
                target="_blank"
                alt="All Out"
                class="d-flex logo logo-footer mr-5"
              >
                <MainLogoSVG />
              </a>
              <a
                :href="$t('links.unicorns.href')"
                target="_blank"
                alt="Unicorns in Tech"
                class="d-flex logo logo-footer logo-unicorns"
              >
                <img
                  src="/images/logos/unicornsintech.png"
                  alt="Unicorns in Tech"
                />
              </a>
            </div>
          </div>
          <div class="d-flex flex-column align-center footer-links">
            <a
              :href="$t('links.privacy.href')"
              target="_blank"
              class="white--text text-decoration-none body-2 mr-2 mb-1"
            >
              {{ $t('links.privacy.label') }}
            </a>
            <a
              :href="$t('links.terms.href')"
              target="_blank"
              class="white--text text-decoration-none body-2 mr-2 mb-1"
            >
              {{ $t('links.terms.label') }}
            </a>
            <a
              :href="$t('links.contact.href')"
              target="_blank"
              class="white--text text-decoration-none body-2 mr-2 mb-1"
            >
              {{ $t('links.contact.label') }}
            </a>
          </div>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import LanguageSelect from '~/components/LanguageSelect'
import FormDialog from '~/components/FormDialog'
import WelcomeSnackbar from '~/components/WelcomeSnackbar'
import ReadMoreSnackbar from '~/components/ReadMoreSnackbar'
import BackToMapSnackbar from '~/components/BackToMapSnackbar'
import MainLogoSVG from '~/assets/images/logos/main.svg?inline'

export default {
  components: {
    LanguageSelect,
    FormDialog,
    WelcomeSnackbar,
    ReadMoreSnackbar,
    BackToMapSnackbar,
    MainLogoSVG
  },
  data: () => ({
    appBarContentHeight: 130
  }),
  computed: {
    siteSubtitle() {
      const { prideLocation, year } = this
      return this.$t('site.subtitle', {
        prideLocation,
        year
      })
    },
    siteTitle() {
      const { prideLocation, year } = this
      return this.$t('site.title', {
        prideLocation,
        year
      })
    },
    ...mapState('app', [
      'prideLocation',
      'year',
      'baseUrl',
      'docReady',
      'appBarHeight'
    ])
  },
  watch: {
    docReady(newVal) {
      this.appBarContentHeight = this.$refs.appBarContent.getBoundingClientRect().height
      this.$store.commit(
        'app/SET_APP_BAR_HEIGHT',
        this.appBarContentHeight + 20
      )
    }
  },
  created() {
    const prideLocationEnvValue = this.$nuxt.context.env.PRIDE_LOCATION
    this.$store.commit('app/UPDATE_STORE', {
      prideLocationEnvValue,
      prideLocation: this.$t(`cities.${prideLocationEnvValue}`)
    })
  },
  mounted() {
    document.onreadystatechange = () => {
      this.$store.commit('app/SET_DOC_READY', true)
    }
  },
  head() {
    const i18nSEO = this.$nuxtI18nSeo()
    return {
      title: this.$t('site.title', {
        prideLocation: this.prideLocation,
        year: this.year
      }),
      htmlAttrs: {
        ...i18nSEO.htmlAttrs
      },
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content:
            'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
        },
        {
          hid: 'description',
          name: 'description',
          content: this.siteSubtitle
        },
        { name: 'author', content: this.$t('site.author') },
        {
          property: 'og:title',
          content: this.siteTitle
        },
        {
          property: 'og:description',
          content: this.siteSubtitle
        },
        {
          property: 'og:image',
          content:
            'https://s3.amazonaws.com/all-in-live-media/__sized__/campaign_image_store/b0220a60-09df-4369-abfc-a15d914bc2c8/content_image/HPMH6RY7GVEAFBIA35MPTWXTCM-crop-c0-5__0-5-1200x1200.png'
        },
        { property: 'og:image:height', content: '1200' },
        { property: 'og:image:width', content: '1200' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@allout' },
        { name: 'twitter:creator', content: '@allout' },
        {
          name: 'twitter:title',
          content: this.siteTitle
        },
        {
          name: 'twitter:description',
          content: this.siteSubtitle
        },
        {
          name: 'twitter:image',
          content:
            'https://s3.amazonaws.com/all-in-live-media/__sized__/campaign_image_store/b0220a60-09df-4369-abfc-a15d914bc2c8/content_image/HPMH6RY7GVEAFBIA35MPTWXTCM-crop-c0-5__0-5-1200x1200.png'
        },
        ...i18nSEO.meta
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'stylesheet',
          href:
            'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap'
        },
        ...i18nSEO.link
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.app-bar {
  z-index: 1001;
}

.logo {
  height: auto;

  &.logo-header {
    width: 60px;
  }

  &.logo-footer {
    width: 58px;
  }

  &.logo-unicorns {
    img {
      width: 100%;
      height: auto;
    }
  }

  svg {
    width: 100%;
    height: auto;
  }
}

.container:first-of-type {
  align-items: stretch !important;
  padding-top: 0;
  padding-bottom: 0;
}

.footer-content {
  // Make room for the snackbars so they don't obscure the footer
  margin-bottom: 70px;
}

.footer-links {
  a {
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
