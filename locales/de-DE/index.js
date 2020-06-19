import de from 'vee-validate/dist/locale/de.json'
import messages from './messages.json'

export default {
  ...messages,
  validation: {
    ...de.messages
  }
}
