import _ from 'lodash'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import { Meteor } from 'meteor/meteor'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import {
  closeDialog,
  setEditStudentEmail,
  setEditStudentName,
  setEditStudentSchool,
} from '/imports/ui/actions'

const onSubmit = (student, email, name, school, dispatch) => {
  const newStudent = _.assign(student, {
    email, 
    name,
    school,
  })
  Meteor.call('Students.update', newStudent, (err) => {
    if (err) console.error(err)
    dispatch(closeDialog())
  })
}

const onRemove = (student, dispatch) => {
  Meteor.call('Students.remove', student._id, (err) => {
    if (err) console.error(err)
    dispatch(closeDialog())
  })
}

const renderBody = (email, name, school, dispatch) => {
  const mailto = `mailto:${email}`
  return (
    <div>
      <TextField hintText={"Email"} onChange={(e) => dispatch(setEditStudentEmail(e.target.value))} value={email} />
      <RaisedButton style={{margin: '4px'}} label={"Send Email"} href={mailto} primary={true} />
      <br />
      <TextField hintText={"Name"} onChange={(e) => dispatch(setEditStudentName(e.target.value))} value={name} />
      <br />
      <TextField hintText={"School"} onChange={(e) => dispatch(setEditStudentSchool(e.target.value))} value={school} />
    </div>
  )
}

const EditStudentDialog = ({ dispatch, editStudentEmail, editStudentName, editStudentSchool, open, student }) => {
  const actions = [
    <FlatButton
      label="Cancel"
      onTouchTap={() => dispatch(closeDialog())}
    />,
    <FlatButton
      style={{color: '#F44336'}}
      label="Remove Student"
      onTouchTap={() => onRemove(student, dispatch)}
    />,
    <FlatButton
      label="Submit"
      primary={true}
      keyboardFocused={true}
      onTouchTap={() => onSubmit(student, editStudentEmail, editStudentName, editStudentSchool, dispatch)}
    />,
  ]
  return (
    <Dialog
      title="Edit Student"
      actions={actions}
      open={open}
      onRequestClose={() => dispatch(onClose())}>
      {renderBody(editStudentEmail, editStudentName, editStudentSchool, dispatch)}
    </Dialog>
  )
}

EditStudentDialog.propTypes = {
  dispatch: PropTypes.func.isRequired,
  editStudentEmail: PropTypes.string.isRequired,
  editStudentName: PropTypes.string.isRequired,
  editStudentSchool: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  student: React.PropTypes.object,
}

const mapStateToProps = ({ dialogs }) => ({
  editStudentEmail: dialogs.editStudentEmail,
  editStudentName: dialogs.editStudentName,
  editStudentSchool: dialogs.editStudentSchool,
})

export default connect(mapStateToProps)(EditStudentDialog)