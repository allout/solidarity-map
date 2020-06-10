const faker = require('faker')

const emojis = [
  '❤️',
  '🧡',
  '💛',
  '💚',
  '💙',
  '💜',
  '💕',
  '💞',
  '💖',
  '🥰',
  '😘',
  '😍',
  '😗',
  '😙',
  '😚',
  '🤗',
  '😀',
  '😃',
  '😄',
  '😁',
  '🙂',
  '😊',
  '😎',
  '🤩',
  '🏳️‍🌈',
  '🌈',
  '🦄',
  '💪'
]

const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step)

module.exports = () => {
  const data = {
    attendees: [
      {
        _id: 0,
        center: [59.93912, 30.31562],
        name: 'Tim',
        country: 'AU',
        message: 'We are with you! 🥰'
      },
      {
        _id: 1,
        center: [59.93892, 30.31762],
        name: 'Stana',
        country: 'BU',
        message: 'So much love! ❤️'
      },
      {
        _id: 2,
        center: [59.93952, 30.31762],
        name: 'Janina',
        country: 'DE',
        message: 'So glad I could be here today 😊'
      },
      {
        _id: 3,
        center: [59.93952, 30.31522],
        name: 'Christoffer',
        country: 'DE',
        message: 'Sending solidarity from Deutschland! 💪🏻'
      }
    ]
  }
  // Create attendees
  for (let i = 0; i < 1000; i++) {
    const numEmojis = faker.random.number(emojis.length)
    data.attendees.push({
      _id: i,
      center: [59.93952, 30.31522],
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      country: faker.address.countryCode(),
      emojiIndices: faker.helpers
        .shuffle(range(0, numEmojis, 1))
        .map((index) => index)
    })
  }
  return data
}
