import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import { Meteor } from 'meteor/meteor'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import {
  closeDialog,
  setLoginError,
  updateLoginEmail,
  updateLoginPassword,
} from '/imports/ui/actions'

const LoginDialog = ({ dispatch, loginEmail, loginError, loginPassword, open }) => {
  const onLoginSubmit = () => {
    Meteor.loginWithPassword(loginEmail, loginPassword, (err) => {
      if (err) {
        dispatch(setLoginError(err))
      } else {
        dispatch(setLoginError(null))
        dispatch(closeDialog())
      }
    })
  }
  const checkEnter = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault()
      onLoginSubmit()
    }
  }
  const actions = [
    <FlatButton
      label="Cancel"
      onTouchTap={() => dispatch(closeDialog())}
    />,
    <FlatButton
      label="Sign In"
      primary={true}
      keyboardFocused={true}
      onTouchTap={onLoginSubmit}
    />,
  ]
  return (
    <Dialog
      title="Sign In"
      actions={actions}
      open={open}
      onRequestClose={() => dispatch(closeDialog())}>
      <TextField 
        hintText="Email Address" 
        floatingLabelText="Email Address"
        fullWidth={true}
        onChange={(e) => dispatch(updateLoginEmail(e.target.value))}
        value={loginEmail} />
      <br />
      <TextField 
        hintText="Password" 
        floatingLabelText="Password"
        type="password" 
        fullWidth={true}
        onChange={(e) => dispatch(updateLoginPassword(e.target.value))}
        value={loginPassword} 
        onKeyDown={checkEnter} />
      {loginError && loginError.reason
        ? <span style={{color: 'red'}}>{loginError.reason}</span>
        : null
      }
    </Dialog>
  )
}

LoginDialog.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loginEmail: PropTypes.string.isRequired,
  loginError: PropTypes.object,
  loginPassword: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
}

const mapStateToProps = ({ dialogs }) => ({
  loginEmail: dialogs.loginEmail,
  loginError: dialogs.loginError,
  loginPassword: dialogs.loginPassword,
})

export default connect(mapStateToProps)(LoginDialog)