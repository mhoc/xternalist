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
  setEditStudentSchool,
} from '/imports/ui/actions'

const onClose = (dispatch) => {
  dispatch(closeDialog())
}

const renderTableHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHeaderColumn>Company</TableHeaderColumn>
        <TableHeaderColumn>Candidate</TableHeaderColumn>
      </TableRow>
    </TableHeader>
  )
}

const renderInterview = ({ company, student }) => {
  return (
    <TableRow>
      <TableRowColumn>{company.name}</TableRowColumn>
      <TableRowColumn>{student.email}</TableRowColumn>
    </TableRow>
  )
}

const renderBody = (dispatch, schedule) => {
  return _.map(schedule.rounds, (round, i) => {
    <div>
      <h2>{`Round ${i}`}</h2>
      <Table>
        {renderTableHeader()}
        <TableBody>
          {_.map(round, renderInterview)}
        </TableBody>
      </Table>
    </div>
  })
}

const ScheduleResultsDialog = ({ 
  dispatch,
  open,
  schedule,
}) => {
  return (
    <Dialog
      title="Schedule"
      open={open}
      onRequestClose={() => onClose(dispatch)}>
      {schedule ? renderBody(dispatch, schedule) : null}
    </Dialog>
  )
}

// schedule:
// {
//   rounds: [
//     [ { company, student } ],
//     [ { company, student } ],
//     ...
//   ]
// }

ScheduleResultsDialog.propTypes = {
  dispatch: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  schedule: PropTypes.object,
}

const mapStateToProps = ({}) => ({

})

export default connect(mapStateToProps)(ScheduleResultsDialog)