import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import TextField from 'material-ui/TextField'
import { Meteor } from 'meteor/meteor'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import {
  getCandidatesForStudent,
  setDetailView,
  setDialogProps,
  setEditStudentEmail,
  setEditStudentName,
  setEditStudentSchool,
  openDialog,
} from '/imports/ui/actions'
import TableDetail from '/imports/ui/components/Common/TableDetail'

const topActionButtons = (dispatch) => {
  return [
    { 
      label: "Import CSV",
      onTouchTap: () => {
        dispatch(setDialogProps({
          showTypes: [ 'basicStudent' ]
        }))
        dispatch(openDialog('importStudentCsv'))
      }
    }
  ]
}

const StudentListDetail = ({ dispatch, students }) => {
  const data = _.map(students, (s) => ({
    fields: [ s.email, s.name, s.school ],
    onTouchTap: () => {
      dispatch(setDialogProps({ student: s }))
      dispatch(setEditStudentEmail(s.email))
      dispatch(setEditStudentName(s.name))
      dispatch(setEditStudentSchool(s.school))
      dispatch(openDialog('editStudent'))
      dispatch(getCandidatesForStudent(s._id))
    },
  }))
  return <TableDetail
    backDetail="class"
    tData={data}
    tHeaders={[ "Email", "Name", "School" ]}
    topActionButtons={topActionButtons(dispatch)}
  />
}

StudentListDetail.propTypes = {
  dispatch: PropTypes.func.isRequired,
  students: PropTypes.array.isRequired,
}

export default connect()(StudentListDetail)