import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import { Meteor } from 'meteor/meteor'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import {
  closeDialog,
  setNewClassName,
} from '/imports/ui/actions'

const AddClassDialog = ({ dispatch, newClassName, open }) => {
  const checkEnter = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault()
      onSubmit()
    }
  }
  const actions = [
    <FlatButton
      label="Cancel"
      onTouchTap={() => dispatch(closeDialog())}
    />,
    <FlatButton
      label="Add Class"
      primary={true}
      keyboardFocused={true}
      onTouchTap={() => {
        Meteor.call('XternClasses.insert', newClassName, (err, resp) => {
          if (err) console.error(err)
          dispatch(closeDialog())
        })
      }}
    />,
  ]
  return (
    <Dialog
      title="Add An Xtern Class"
      actions={actions}
      open={open}
      onRequestClose={() => dispatch(closeDialog())}>
      <TextField 
        hintText="Name"
        floatingLabelText="Name"
        fullWidth={true}
        onChange={(e) => dispatch(setNewClassName(e.target.value))}
        value={newClassName} 
        onKeyDown={checkEnter} />
    </Dialog>
  )
}

AddClassDialog.propTypes = {
  dispatch: PropTypes.func.isRequired,
  newClassName: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
}

const mapStateToProps = ({ dialogs }) => ({
  newClassName: dialogs.newClassName,
})

export default connect(mapStateToProps)(AddClassDialog)