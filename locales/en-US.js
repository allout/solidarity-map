import en from 'vee-validate/dist/locale/en.json'

export default {
  site: {
    title: 'Pride #UnDistanced'
  },
  index: {
    title: 'Solidarity with {prideLocation} Pride 2020'
  },
  cities: {
    st_petersburg: 'St. Petersburg'
  },
  dialogs: {
    steps: {
      flag: {
        title: 'What would you like to add to your flag?',
        text:
          'Showing love for the LGBT+ community in {prideLocation} is easy. Choose the information you would like to add to your flag below!!'
      },
      subscription: {
        title: 'Can we keep you up to date with future issues?',
        text:
          'Want to join the fight for LGBT+ rights? Sign up to our mailing list below.',
        disclaimer:
          'By submitting my email address I am consenting to receive emails from All Out etc etc...',
        or: '...or you can'
      }
    },
    form: {
      copy: {
        addFlair: 'Personalise your flag with some flair!',
        extraInfoAsk:
          'To join our list, we just need a couple more pieces of information...'
      },
      buttons: {
        showSupport: {
          label: 'Show your support!'
        },
        subscribe: {
          label: 'Subscribe'
        },
        skip: {
          label: 'Skip this step'
        }
      }
    }
  },
  accessibility: {
    imgAlts: {
      flag: 'Flag'
    }
  },
  snackbars: {
    welcome: {
      message: 'Choose a location on the map to place your flag and join!'
    },
    readMore: {
      message: 'Want more information?',
      buttonLabel: 'Find out more!'
    }
  },
  fields: {
    name: {
      label: 'Name',
      placeholder: 'Type your name'
    },
    email: {
      label: 'Email',
      placeholder: 'Enter your email address'
    },
    solidarityCountry: {
      label: "I'm sending solidarity from...",
      placeholder: 'Choose your location (optional)'
    },
    subscriptionCountry: {
      label: 'Country',
      placeholder: 'Choose...'
    },
    emojiSelection: {
      placeholder: 'Choose...'
    },
    emojiGrid: {
      placeholder: 'Select some emoji below...'
    }
  },
  disclaimers: {
    links: {
      privacy: '//allout.org/en/privacy-policy',
      unsubscribe: '//allout.org/en/unsubscribe',
      smsterms: '//allout.org/en/sms-terms'
    },
    subscription:
      "By clicking this button, I consent to receive emails about All Out's campaign updates, surveys, petitions, and donation opportunities as described in All Out's <a target='_blank' href='@:disclaimers.links.privacy'>privacy policy</a>. I understand that I have the right to <a target='_blank' href='@:disclaimers.links.unsubscribe'>unsubscribe</a> at any time."
  },
  validation: {
    ...en.messages
  }
}
