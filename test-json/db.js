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
    attendees: []
  }
  // Create attendees
  // for (let i = 0; i < 1000; i++) {
  //   const numEmojis = faker.random.number(emojis.length)
  //   data.attendees.push({
  //     _id: i,
  //     center: [59.93952, 30.31522],
  //     firstName: faker.name.firstName(),
  //     lastName: faker.name.lastName(),
  //     country: faker.address.countryCode(),
  //     emojiIndices: faker.helpers
  //       .shuffle(range(0, numEmojis, 1))
  //       .map((index) => index)
  //   })
  // }
  return data
}
