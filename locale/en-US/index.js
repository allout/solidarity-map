import messages from './messages.json'
import { languages } from 'countries-list'

const mergedMessages = {
  // An object of all language names keyed on ISO-3166 alpha-2 codes
  // See https://github.com/annexare/Countries
  // Format:
  // {
  //   "af": {
  //     "name": "Afrikaans",
  //     "native": "Afrikaans"
  //   },
  //   "am": {
  //     "name": "Amharic",
  //     "native": "አማርኛ"
  //   },
  //   "ar": {
  //     "name": "Arabic",
  //     "native": "العربية",
  //     "rtl": 1
  //   },
  //   ...
  // }
  languages,
  ...messages
}

export default mergedMessages
