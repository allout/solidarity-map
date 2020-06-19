import en from 'vee-validate/dist/locale/en.json'

export default {
  site: {
    // Website title and subtitle. Also used for share title and description in twitter and facebook
    // shares
    title: 'Tag your Pride in {prideLocation}',
    subtitle: '#UnDistanced Online Pride {year}',
    author:
      'https://allout.org, in conjunction with https://www.unicornsintech.com/',
    purpose: '{prideLocation} Pride {year}'
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
          'Showing love for the LGBT+ community in {prideLocation} is easy. Choose the information you would like to add to your flag below!',
        emojiLimitReachedAlert: 'Emoji limit reached!'
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
          'To join our list, we just need a few more pieces of information from you...'
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
      message:
        'Choose a location in {prideLocation} to place your flag and show solidarity with {numAttendees} others from {numCountries} countries'
    },
    readMore: {
      message: 'Want more information?',
      buttonLabel: 'Find out more!'
    },
    backToMap: {
      message: 'Keep exploring?',
      buttonLabel: 'Back to map'
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
    },
    subscriptionConsent: {
      label:
        'We are required by law to request your explicit permission to send you emails. So, can we keep you in the loop?',
      accept: 'Yes, I agree to receiving emails from All Out',
      decline: "No, I don't wish to subscribe"
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
  map: {
    flags: {
      popups: {
        solidarityMessage: "I'm here in solidarity with"
      }
    }
  },
  infoPanel: {
    stPetersburg: {
      title: 'Global solidarity action for St. Petersburg Pride 2020',
      paragraphs: {
        p0:
          'Russia\'s "gay propaganda law" prevents LGBT+ people from coming together to advocate for their rights. In recent years, police have detained activists exercising their right to peacefully assemble and celebrate Pride.',
        p1:
          'St. Petersburg is one of the biggest cities in Russia and one that is known for its progressive culture. But LGBT+ people are still discriminated against, attacked, and even arrested when they attempt to celebrate Pride.',
        p2:
          "That's why we decided to bring Pride to St. Petersburg through our global digital movement:",
        p3:
          'This map is our way of sending a message of support and solidarity to Russian LGBT+ people.',
        p4:
          'We are thousands of people coming together virtually in St. Petersburg in a huge, colorful display of solidarity to LGBT+ people who are not allowed to celebrate Pride.',
        p5:
          'Every flag stands for a voice of support and love from all over the world, telling Russian LGBT+ people that they are not alone.'
      }
    }
  },
  validation: {
    ...en.messages
  }
}
