import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'

const ConfirmRemoveClassDialog = ({ onConfirm, onClose, open }) => {
  const actions = [
    <FlatButton
      label="Cancel"
      onTouchTap={onClose}
    />,
    <FlatButton
      label="Remove Class"
      primary={true}
      keyboardFocused={true}
      onTouchTap={onConfirm}
    />,
  ]
  return (
    <Dialog
      title="Remove An Xtern Class"
      actions={actions}
      open={open}
      onRequestClose={onClose}>
      Are You Sure?
    </Dialog>
  )
}

ConfirmRemoveClassDialog.propTypes = {
  open: React.PropTypes.bool.isRequired,
  onConfirm: React.PropTypes.func,
  onClose: React.PropTypes.func,
}

export default ConfirmRemoveClassDialog