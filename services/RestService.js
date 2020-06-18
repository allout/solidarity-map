import axios from 'axios'

const apiClient = axios.create({
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getAttendees() {
    return apiClient.get('/api/attendees')
  },
  createAttendee(lat, lng, solidarityCountry, emojiIndices) {
    return apiClient.post('/api/attendees', {
      lat,
      lng,
      solidarityCountry,
      emojiIndices
    })
  },
  updateAttendee(id, data) {
    return apiClient.patch(`/api/attendees/${id}`, data)
  }
}
