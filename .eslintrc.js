module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    // 'plugin:vue/vue3-recommended',  // Use this if you are using Vue.js 3.x.
    'plugin:vue/recommended',
    'plugin:prettier/recommended'
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'prettier/prettier': [
      'error',
      {},
      {
        usePrettierrc: true
        // trailingComma: 'none',
        // useTabs: false
      }
    ],
    'comma-dangle': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/html-self-closing': 'off',
    'unicorn/prefer-includes': 'off'
    // 'vue/comment-directive': [
    //   'error',
    //   {
    //     reportUnusedDisableDirectives: false
    //   }
    // ]
  }
}
