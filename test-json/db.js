// This is the test data generator for json server
const faker = require('faker')
const mapInitial = require('../maps/stPetersburg/initial.js')

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
  for (let i = 0; i < 1000; i++) {
    const numEmojis = faker.random.number(emojis.length)
    data.attendees.push({
      _id: i,
      lat: faker.finance.amount(
        mapInitial.bounds[1][0],
        mapInitial.bounds[0][0],
        5
      ),
      lng: faker.finance.amount(
        mapInitial.bounds[1][1],
        mapInitial.bounds[0][1],
        5
      ),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      subscriptionCountry: faker.address.countryCode(),
      solidarityCountry: faker.address.countryCode(),
      emojiIndices: faker.helpers
        .shuffle(range(0, numEmojis, 1))
        .map((index) => index)
    })
  }
  return data
}
