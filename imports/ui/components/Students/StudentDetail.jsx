import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import TextField from 'material-ui/TextField'
import { Meteor } from 'meteor/meteor'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import {
  getCandidatesForStudent,
  setDialogProps,
  setEditStudentEmail,
  setEditStudentName,
  setEditStudentSchool,
  openDialog,
} from '/imports/ui/actions'

const styles = {
  headerContainer: {
    padding: "12px",
  }
}

const renderHeader = (dispatch) => {
  return (
    <div style={styles.headerContainer}>
      <RaisedButton 
        label="Import CSV" 
        secondary={true} 
        onTouchTap={() => dispatch(openDialog('importStudentCsv'))}
      />
    </div>
  )
}

const renderStudentRow = (s, dispatch) => {
  const onClick = () => {
    dispatch(setDialogProps({ student: s }))
    dispatch(setEditStudentEmail(s.email))
    dispatch(setEditStudentName(s.name))
    dispatch(setEditStudentSchool(s.school))
    dispatch(openDialog('editStudent'))
    dispatch(getCandidatesForStudent(s._id))
  }
  return (
    <TableRow key={s.email} 
      onTouchTap={onClick}>
      <TableRowColumn>{s.email}</TableRowColumn>
      <TableRowColumn>{s.name}</TableRowColumn>
      <TableRowColumn>{s.school}</TableRowColumn>
    </TableRow>
  )
}

const renderStudentTable = (students, dispatch) => {
  return (
    <Table 
      fixedHeader={true} 
      height={"250px"}
      selectable={false}
      >
      <TableHeader
        displaySelectAll={false}
        adjustForCheckbox={false}
        >
        <TableRow>
          <TableHeaderColumn>Email</TableHeaderColumn>
          <TableHeaderColumn>Name</TableHeaderColumn>
          <TableHeaderColumn>School</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody
        displayRowCheckbox={false}
        showRowHover={true}
        >
        {students.map((s) => renderStudentRow(s, dispatch))}
      </TableBody>
    </Table>
  )
}

const StudentListDetail = ({ dispatch, students }) => {
  return (
    <div>
      {renderHeader(dispatch)}
      {renderStudentTable(students, dispatch)}
    </div>
  )
}

StudentListDetail.propTypes = {
  dispatch: PropTypes.func.isRequired,
  students: PropTypes.array.isRequired,
}

export default connect()(StudentListDetail)