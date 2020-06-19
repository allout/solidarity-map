import pt from 'vee-validate/dist/locale/pt_BR.json'
import messages from './messages.json'

export default {
  ...messages,
  validation: {
    ...pt.messages
  }
}
