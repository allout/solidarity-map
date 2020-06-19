import ru from 'vee-validate/dist/locale/ru.json'

export default {
  site: {
    title: 'Pride #UnDistanced'
  },
  index: {
    title: 'Solidarity with {prideLocation} Pride 2020'
  },
  cities: {
    stPetersburg: 'St. Petersburg'
  },
  forms: {
    fields: {
      name: 'Name',
      email: 'Email',
      country: 'Country'
    }
  },
  validation: {
    ...ru.messages
  }
}
