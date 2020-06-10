import axios from 'axios'

const apiClient = axios.create({
  baseURL: `${process.env.REST_DB_ENDPOINT}`,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getAttendees() {
    return apiClient.get('/attendees')
  },
  createAttendee(markerLatLng) {
    return apiClient.post('/attendees', { center: markerLatLng })
  },
  updateAttendee(id, data) {
    return apiClient.patch(`/attendees/${id}`, data)
  }
}
