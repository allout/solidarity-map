import en from 'vee-validate/dist/locale/en.json'
import messages from './messages.json'

export default {
  ...messages,
  validation: {
    ...en.messages
  }
}
