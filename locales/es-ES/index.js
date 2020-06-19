import es from 'vee-validate/dist/locale/es.json'
import messages from './messages.json'

export default {
  ...messages,
  validation: {
    ...es.messages
  }
}
