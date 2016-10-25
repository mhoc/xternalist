import { combineReducers } from 'redux'

import appbar from '/imports/ui/reducers/appbar'
import csv from '/imports/ui/reducers/csv'
import dialogs from '/imports/ui/reducers/dialogs'
import home from '/imports/ui/reducers/home'
import user from '/imports/ui/reducers/user'

const reducers = combineReducers({
  appbar,
  csv,
  dialogs,
  home,
  user,
})

export default reducers