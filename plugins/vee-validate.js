import Vue from 'vue'
import { ValidationProvider, configure } from 'vee-validate'

// Register validation component globally
Vue.component('ValidationProvider', ValidationProvider)

// The magic that allows us to inject translated strings into vee-validate error messages
// Adapted from https://medium.com/js-dojo/connect-i18n-and-vee-validate-nuxt-js-i18n-and-vee-validate-works-greate-together-d086edd4ca22
export default ({ app }) => {
  configure({
    defaultMessage: (field, values) => {
      values._field_ = app.i18n.t(`${field}`)
      return app.i18n.t(`validation.${values._rule_}`, values)
    }
  })
}
