import ru from 'vee-validate/dist/locale/ru.json'
import messages from './messages.json'

export default {
  ...messages,
  validation: {
    ...ru.messages
  }
}
