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
        title: 'People from all over the world are already here',
        subtitle: 'Simply fill out the form to join them',
        text:
          'Showing love for the LGBT+ community in {prideLocation} is easy. Simply submit the form below!'
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
        country: {
          label: 'Country',
          placeholder: 'Choose your location'
        },
        message: {
          label: 'Message of solidarity',
          placeholder:
            'Your voice matters – leave a message of support for the {prideLocation} LGBT+ community'
        },
        button: {
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
      message: 'Choose a place on the map to plant your flag and join!',
      buttonLabel: 'or explore the map'
    }
  },
  validation: en.messages
}
