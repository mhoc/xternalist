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
  setEditCompanyName,
} from '/imports/ui/actions'

const onSubmit = (company, name, dispatch) => {
  const newCompany = _.assign(company, {
    name,
  })
  Meteor.call('Companies.update', company._id, newCompany, (err) => {
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

const renderBody = (name, dispatch) => {
  return (
    <div>
      <TextField hintText={"Name"} onChange={(e) => dispatch(setEditCompanyName(e.target.value))} value={name} />
      <br />
    </div>
  )
}

const CompanyInfoDialog = ({ 
  company,
  dispatch, 
  editCompanyName, 
  open, 
}) => {
  const actions = [
    <FlatButton
      label="Cancel"
      onTouchTap={() => onClose(dispatch)}
    />,
    <FlatButton
      style={{color: '#F44336'}}
      label="Remove Company"
      onTouchTap={() => onRemove(company, dispatch)}
    />,
    <FlatButton
      label="Submit"
      primary={true}
      keyboardFocused={true}
      onTouchTap={() => onSubmit(company, editCompanyName, dispatch)}
    />,
  ]
  return (
    <Dialog
      title="Edit Company"
      actions={actions}
      open={open}
      onRequestClose={() => onClose(dispatch)}>
      {renderBody(editCompanyName, dispatch)}
    </Dialog>
  )
}

CompanyInfoDialog.propTypes = {
  company: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  editCompanyName: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
}

const mapStateToProps = ({ dialogs }) => {
  let getKeys = {
    editCompanyName: dialogs.editCompanyName,
  }
  // if (student) {
  //   getKeys = _.assign(getKeys, {
  //     candidateCompanies: _.get(students, `candidateCompanies.${student._id}`),
  //   })
  // }
  return getKeys
}

export default connect(mapStateToProps)(CompanyInfoDialog)