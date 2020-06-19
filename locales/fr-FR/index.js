import fr from 'vee-validate/dist/locale/fr.json'
import messages from './messages.json'

export default {
  ...messages,
  validation: {
    ...fr.messages
  }
}
