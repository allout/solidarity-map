require('dotenv').config()

export default {
  mode: 'universal',
  env: {
    // The values that are referenced from process.env can be overridden in the system environment
    // or a .env file at the root of this repository.
    PRIDE_LOCATION: process.env.PRIDE_LOCATION || 'stPetersburg',
    REST_DB_ENDPOINT: process.env.production ? '' : 'http://localhost:3001',
    // Setting SUBSCRIPTION_ENABLED=0 will disable the subscription step
    SKIP_SUBSCRIPTION:
      process.env.SUBSCRIPTION_ENABLED === undefined
        ? false
        : !Number(process.env.SUBSCRIPTION_ENABLED)
  },
  /*
   ** Headers of the page
   */
  head() {
    return {
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
            'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap'
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
  plugins: ['./plugins/vee-validate.js', './plugins/i18n-iso-countries.js'],
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
    ],
    [
      '@nuxtjs/dotenv',
      {
        /* module options */
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
    // https://nuxt-community.github.io/nuxt-i18n/options-reference.html
    [
      'nuxt-i18n',
      {
        lazy: true,
        loadLanguagesAsync: true,
        locales: [
          {
            name: 'English',
            code: 'en',
            iso: 'en-US',
            file: 'en-US.js'
          },
          {
            name: 'Russian',
            code: 'ru',
            iso: 'ru-RU',
            file: 'ru-RU.js'
          }
        ],
        langDir: 'locales/',
        defaultLocale: 'en',
        fallbackLocale: 'en',
        strategy: 'prefix',
        detectBrowserLanguage: {
          useCookie: true,
          cookieKey: 'i18n_redirected'
        },
        rootRedirect: 'en'
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
    // Add exception as per https://logaretm.github.io/vee-validate/guide/rules.html#importing-rules-in-nuxt-js
    transpile: ['vee-validate/dist/rules'],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Optimisation
      if (ctx && ctx.isClient) {
        config.optimization.splitChunks.maxSize = 100000
      }

      // The below solution is taken from
      // https://github.com/visualfanatic/vue-svg-loader/issues/75#issuecomment-468342586
      // This sollution allows optional inlining of the SVG markup with vue-svg-loader with an
      // ?inline query. Otherwise, normal url-loader behaviour occurs
      const svgRule = config.module.rules.find((rule) => rule.test.test('.svg'))

      // Overwrite the test regex (remove .svg file extension)
      svgRule.test = /\.(png|jpe?g|gif|webp)$/i

      config.module.rules.push({
        test: /\.(svg|svgz)(\?.+)?$/,
        oneOf: [
          {
            loader: 'vue-svg-loader',
            resourceQuery: /inline/
          },
          // Add original url-loader config to resolve every other svg without inline query
          svgRule.use[0]
        ]
      })
    }
  }
}
