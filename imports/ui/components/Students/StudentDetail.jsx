import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField'
import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'

import EditStudentDialog from './EditStudentDialog'

const styles = {
  headerContainer: {
    padding: "12px",
  }
}

class StudentListDetail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      editStudentDialogOpen: false,
      studentSelected: null,
    }
  }

  onCancelEdit() {
    this.setState({
      editStudentDialogOpen: false,
    })
  }

  onClickEdit(s) {
    this.setState({
      editStudentDialogOpen: true,
      studentSelected: s,
    })
  }

  renderHeader() {
    const { studentSelected } = this.state
    return (
      <div style={styles.headerContainer}>
        <RaisedButton 
          disabled={!studentSelected}
          label="Edit" 
          secondary={true} 
          onTouchTap={this.onClickEdit.bind(this)} 
        />
      </div>
    )
  }

  renderStudentRow(s) {
    const { studentSelected } = this.state
    const mailTo = `mailto:${s.email}`
    const selected = studentSelected && studentSelected._id === s._id
    return (
      <TableRow key={s.email} onTouchTap={this.onClickEdit.bind(this, s)} selected={selected}>
        <TableRowColumn>{s.email}</TableRowColumn>
        <TableRowColumn>{s.name}</TableRowColumn>
        <TableRowColumn>{s.school}</TableRowColumn>
      </TableRow>
    )
  }

  renderStudentTable() {
    const { students } = this.props
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
          {students.map(this.renderStudentRow.bind(this))}
        </TableBody>
      </Table>
    )
  }

  render() {
    const { editStudentDialogOpen, studentSelected } = this.state
    return (
      <div>
        <EditStudentDialog
          open={editStudentDialogOpen} 
          onClose={this.onCancelEdit.bind(this)}
          student={studentSelected}
        />
        {this.renderHeader()}
        {this.renderStudentTable()}
      </div>
    )
  }

}

StudentListDetail.propTypes = {
  students: React.PropTypes.array.isRequired,
}

export default StudentListDetail