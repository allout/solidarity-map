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
    form: {
      header: {
        title: 'What would you like to add to your flag?',
        subtitle: '?????????',
        text:
          'Showing love for the LGBT+ community in {prideLocation} is easy. Choose the information you would like to add to your flag below!!'
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
      message: 'Choose a location on the map to place your flag and join!',
      buttonLabel: 'or explore the map'
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
