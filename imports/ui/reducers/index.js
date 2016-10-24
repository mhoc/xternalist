import { combineReducers } from 'redux'

import appbar from '/imports/ui/reducers/appbar'
import dialogs from '/imports/ui/reducers/dialogs'
import user from '/imports/ui/reducers/user'

const reducers = combineReducers({
  appbar,
  dialogs,
  user,
})

export default reducers