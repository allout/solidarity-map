// This generates random test and uses it to populate a test rest endpoint.
// Not to be used for production! Note this will only work if recaptcha is disabled.
// Hence the not in production thing!
const faker = require('faker')
const mapInitial = require('../maps/stPetersburg/initial.js')
const axios = require('axios').default
require('dotenv').config()

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

const apiAuthToken = Buffer.from(
  `${process.env.API_USER || 'api'}:${process.env.API_PASSWORD ||
    'JY9^QUfNt}+HuDfgvJ62'}`,
  'utf8'
).toString('base64')

async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await axios.post(url, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${apiAuthToken}`
    }
  })
  return response.data
}

async function createAttendees() {
  // Create test attendees and post them to the rest api
  for (let i = 0; i < 10000; i++) {
    const numEmojis = faker.random.number(emojis.length)
    try {
      const response = await postData(
        'http://127.0.0.1:5000/api/v1/attendees',
        {
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
        }
      )
      console.log(response)
    } catch (e) {
      console.error(e)
    }
  }
}

createAttendees()
