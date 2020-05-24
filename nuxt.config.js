import colors from 'vuetify/es5/util/colors'
import enUS from './locale/en-US'
import ruRU from './locale/ru-RU'

export default {
  mode: 'universal',
  env: {
    prideLocation: process.env.PRIDE_LOCATION || 'stPetersburg'
  },
  /*
   ** Headers of the page
   */
  head() {
    return {
      titleTemplate: this.$t('site.title') + ' - %s',
      title: this.$t('site.title'),
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
          content: process.env.npm_package_description || ''
        }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'stylesheet',
          href:
            'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap'
        }
      ]
    }
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    /*
     ** vuetify module configuration
     ** https://github.com/nuxt-community/vuetify-module
     */

    [
      '@nuxtjs/vuetify',
      {
        customVariables: ['~/assets/variables.scss'],
        optionsPath: './vuetify.options.js',
        defaultAssets: false,
        treeShake: true,
        indentedSyntax: true
      }
    ]
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // https://github.com/schlunsen/nuxt-leaflet
    // https://github.com/vue-leaflet/Vue2Leaflet
    [
      'nuxt-leaflet',
      {
        /* module options */
      }
    ],
    [
      'nuxt-i18n',
      {
        locales: ['en-US', 'ru-RU'],
        defaultLocale: 'en-US',
        vueI18n: {
          fallbackLocale: 'en-US',
          messages: {
            'en-US': enUS,
            'ru-RU': ruRU
          }
        },
        detectBrowserLanguage: {
          useCookie: true,
          cookieKey: 'i18n_redirected'
        }
      }
    ]
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      if (ctx && ctx.isClient) {
        config.optimization.splitChunks.maxSize = 100000
      }
    }
  }
}
