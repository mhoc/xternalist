import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'

class ConfirmRemoveClassDialog extends Component {

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        onTouchTap={this.props.onClose}
      />,
      <FlatButton
        label="Remove Class"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.props.onConfirm}
      />,
    ]
    return (
      <Dialog
        title="Remove An Xtern Class"
        actions={actions}
        open={this.props.open}
        onRequestClose={this.props.onClose}>
        Are You Sure?
      </Dialog>
    )
  }

}

ConfirmRemoveClassDialog.propTypes = {
  open: React.PropTypes.bool.isRequired,
  onConfirm: React.PropTypes.func.isRequired,
  onClose: React.PropTypes.func.isRequired,
}

export default ConfirmRemoveClassDialog