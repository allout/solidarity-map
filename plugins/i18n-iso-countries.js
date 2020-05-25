import i18nCountries from 'i18n-iso-countries'
// Setup requirements for translatable country names
// https://github.com/michaelwittig/node-i18n-iso-countries#readme

// Add required support for languages here
i18nCountries.registerLocale(require('i18n-iso-countries/langs/en.json'))
i18nCountries.registerLocale(require('i18n-iso-countries/langs/ru.json'))
