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
          'Want to join the fight for LGBT+ rights? Sign up to our mailing list below'
      }
    },
    form: {
      fields: {
        name: {
          label: 'Name',
          placeholder: 'Type your name'
        },
        email: {
          label: 'Email',
          placeholder: 'Enter your email address'
        },
        countrySelection: {
          label: "I'm sending solidarity from...",
          placeholder: 'Choose your location (optional)'
        },
        emojiSelection: {
          placeholder: 'Choose...'
        },
        emojiGrid: {
          placeholder: 'Select some emoji below...'
        },
        message: {
          label: 'Message of solidarity',
          placeholder:
            'Your voice matters – leave a message of support for the {prideLocation} LGBT+ community'
        }
      },
      copy: {
        addFlair: 'Personalise your flag with some flair!'
      },
      buttons: {
        showSupport: {
          label: 'Show your support!'
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
  validation: {
    ...en.messages
  }
}
