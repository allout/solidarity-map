import en from 'vee-validate/dist/locale/en.json'

export default {
  site: {
    // Website title and subtitle. Also used for share title and description in twitter and facebook
    // shares
    title: '{prideLocation} Solidarity {year}',
    subtitle: 'Pride #UnDistanced'
  },
  cities: {
    // Here we provide the translated city names for every city this app currently supports
    stPetersburg: 'St. Petersburg'
  },
  sharing: {
    // Facebook does not support share messages, but twitter and whatsapp do.
    // Here we define those messages
    message:
      "You're invited! Join me and {numAttendees} others from {numCountries} countries in an act of #UnDistanced solidarity for {prideLocation} Pride {year}! {pageUrl}"
  },
  dialogs: {
    steps: {
      flag: {
        title: 'What would you like to add to your flag?',
        text:
          'Showing love for the LGBT+ community in {prideLocation} is easy. Choose the information you would like to add to your flag below!'
      },
      subscription: {
        title: 'Can we keep you up to date with future issues?',
        text:
          'Want to join the fight for LGBT+ rights? Sign up to our mailing list.',
        disclaimer:
          'By submitting my email address I am consenting to receive emails from All Out etc etc...'
      },
      share: {
        title: 'One final thing - solidarity is better with friends.',
        text: 'Share now and invite others the party!'
      }
    },
    form: {
      copy: {
        addFlair: 'Personalise your flag with some flair!',
        extraInfoAsk:
          'To join our list, we just need a few more pieces of information...'
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
        },
        map: {
          label: 'Back to map'
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
    firstName: {
      label: 'First name',
      placeholder: 'Enter your first name'
    },
    lastName: {
      label: 'Last name',
      placeholder: 'Enter your last name'
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
    emojiGrid: {
      placeholder: 'Select emoji below...'
    }
  },
  disclaimers: {
    // This section is only used if the subscription step is enabled.
    // All Out only has these links currently available in EN, DE, FR, IT, ES and PT.
    // So maybe use this english version if your language isn't supported
    links: {
      privacy: '//allout.org/en/privacy-policy',
      unsubscribe: '//allout.org/en/unsubscribe',
      smsterms: '//allout.org/en/sms-terms'
    },
    subscription: `
      By clicking this button, I consent to receive emails about All Out's campaign updates,
      surveys, petitions, and donation opportunities as described in All Out's
      <a target='_blank' href='@:disclaimers.links.privacy'>privacy policy</a>.
      I understand that I have the right to
      <a target='_blank' href='@:disclaimers.links.unsubscribe'>unsubscribe</a>
      at any time.
      `
  },
  validation: {
    ...en.messages
  }
}
