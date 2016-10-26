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
  getCandidatesForStudent,
  setCandidatesForStudent,
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

const onClose = (dispatch) => {
  dispatch(closeDialog())
}

const onRemove = (student, dispatch) => {
  Meteor.call('Students.remove', student._id, (err) => {
    if (err) console.error(err)
    dispatch(closeDialog())
  })
}

const renderCandidates = (companies) => {
  if (companies.length === 0) {
    return <h3>Candidate Nowhere</h3>
  } else {
    return (
      <div>
        <h3>Candidate At...</h3>
        <span>{companies.map((c, i) => {
          const prefix = i !== 0 ? ', ' : ''
          return <span key={c._id}>{prefix}{c.name}</span>
        })}</span>
      </div>
    )
  }
}

const renderBody = (email, name, school, candidates, dispatch) => {
  const mailto = `mailto:${email}`
  return (
    <div>
      <TextField hintText={"Email"} onChange={(e) => dispatch(setEditStudentEmail(e.target.value))} value={email} />
      <RaisedButton style={{margin: '4px'}} label={"Send Email"} href={mailto} primary={true} />
      <br />
      <TextField hintText={"Name"} onChange={(e) => dispatch(setEditStudentName(e.target.value))} value={name} />
      <br />
      <TextField hintText={"School"} onChange={(e) => dispatch(setEditStudentSchool(e.target.value))} value={school} />
      {candidates ? renderCandidates(candidates) : null}
    </div>
  )
}

const EditStudentDialog = ({ 
  candidateCompanies,
  dispatch, 
  editStudentEmail, 
  editStudentName, 
  editStudentSchool, 
  open, 
  student,
}) => {
  const actions = [
    <FlatButton
      label="Cancel"
      onTouchTap={() => onClose(dispatch)}
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
      onRequestClose={() => dispatch(onClose)}>
      {renderBody(editStudentEmail, editStudentName, editStudentSchool, candidateCompanies, dispatch)}
    </Dialog>
  )
}

EditStudentDialog.propTypes = {
  candidateCompanies: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
  editStudentEmail: PropTypes.string.isRequired,
  editStudentName: PropTypes.string.isRequired,
  editStudentSchool: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  student: React.PropTypes.object,
}

const mapStateToProps = ({ dialogs, students }, { student }) => {
  let getKeys = {
    editStudentEmail: dialogs.editStudentEmail,
    editStudentName: dialogs.editStudentName,
    editStudentSchool: dialogs.editStudentSchool,
  }
  if (student) {
    getKeys = _.assign(getKeys, {
      candidateCompanies: _.get(students, `candidateCompanies.${student._id}`),
    })
  }
  return getKeys
}

export default connect(mapStateToProps)(EditStudentDialog)