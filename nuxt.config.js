import colors from 'vuetify/es5/util/colors'
import enUS from './locale/en-us.json'
import ruRU from './locale/ru-ru.json'

export default {
  mode: 'universal',
  env: {
    prideLocation: process.env.PRIDE_LOCATION || 'St Petersburg'
  },
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
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
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
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
        treeShake: true
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
        locales: ['en-us', 'ru-ru'],
        defaultLocale: 'en-us',
        vueI18n: {
          fallbackLocale: 'en-us',
          messages: {
            'en-us': enUS,
            'ru-ru': ruRU
          }
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
