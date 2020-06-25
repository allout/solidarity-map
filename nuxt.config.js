require('dotenv').config()

const apiAuthToken = Buffer.from(
  `${process.env.API_USER || 'api'}:${process.env.API_PASSWORD ||
    'JY9^QUfNt}+HuDfgvJ62'}`,
  'utf8'
).toString('base64')

export default {
  mode: 'universal',
  env: {
    // The values that are referenced from process.env can be overridden in the system environment
    // or a .env file at the root of this repository.
    PRIDE_LOCATION: process.env.PRIDE_LOCATION || 'stPetersburg',
    // Setting SUBSCRIPTION_ENABLED=0 will disable the subscription step
    SKIP_SUBSCRIPTION:
      process.env.SUBSCRIPTION_ENABLED === undefined
        ? false
        : !Number(process.env.SUBSCRIPTION_ENABLED),
    recaptchaEnabled:
      process.env.RECAPTCHA_ENABLED && Boolean(process.env.RECAPTCHA_ENABLED),
    recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['@/assets/styles/global.scss'],
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
    ],
    // https://axios.nuxtjs.org/
    '@nuxtjs/axios'
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
            file: 'en-US/index.js'
          },
          {
            name: 'Russian',
            code: 'ru',
            iso: 'ru-RU',
            file: 'ru-RU/index.js'
          },
          {
            name: 'German',
            code: 'de',
            iso: 'de-DE',
            file: 'de-DE/index.js'
          },
          {
            name: 'Italian',
            code: 'it',
            iso: 'it-IT',
            file: 'it-IT/index.js'
          },
          {
            name: 'French',
            code: 'fr',
            iso: 'fr-FR',
            file: 'fr-FR/index.js'
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
   ** Axios and proxy module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true
    // proxy: {
    //   pathRewrite: { '^/api/': '/ap1/v1/' }
    // }
  },
  proxy: {
    '/api/v1': {
      target: process.env.API_BASE || 'http://localhost:5000',
      headers: {
        Authorization: `Basic ${apiAuthToken}`
      }
    }
  },
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
