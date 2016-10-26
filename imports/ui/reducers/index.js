import { combineReducers } from 'redux'

import appbar from '/imports/ui/reducers/appbar'
import csv from '/imports/ui/reducers/csv'
import dialogs from '/imports/ui/reducers/dialogs'
import home from '/imports/ui/reducers/home'
import students from '/imports/ui/reducers/students'
import user from '/imports/ui/reducers/user'

const reducers = combineReducers({
  appbar,
  csv,
  dialogs,
  home,
  students,
  user,
})

export default reducers