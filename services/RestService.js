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
  getParticipants() {
    return apiClient.get('/participants')
  }
}
