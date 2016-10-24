import { Meteor } from 'meteor/meteor'

import {
  closeAppBarDropdown,
  closeDialog,
} from '/imports/ui/actions'

export const LOGIN_USER = 'LOGIN_USER'
export const loginUser = (email, password) => (
  (dispatch) => {
    Meteor.loginWithPassword(email, password)
    dispatch(closeDialog())
  }
)

export const LOGOUT_USER = 'LOGOUT_USER'
export const logoutUser = () => (
  (dispatch) => {
    Meteor.logout()
    dispatch(closeAppBarDropdown())
  }
)
