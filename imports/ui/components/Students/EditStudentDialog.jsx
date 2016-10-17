import _ from 'lodash'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'

class EditStudentDialog extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      name: '',
      school: '',
    }
  }

  componentWillReceiveProps(props) {
    const { student } = props
    if (student) {
      this.setState({
        email: student.email,
        name: student.name,
        school: student.school,
      })
    }
  }

  onSubmit() {
    const { student } = this.props
    const { email, name, school } = this.state
    const newStudent = _.assign(student, {
      email, 
      name,
      school,
    })
    Meteor.call('Students.update', newStudent, (err) => {
      if (err) console.error(err)
      this.props.onClose()
    })
  }

  onRemove() {
    const { student } = this.props
    Meteor.call('Students.remove', student._id, (err) => {
      if (err) console.error(err)
      this.props.onClose()
    })
  }

  onEmailChange(e) {
    this.setState({ email: e.target.value })
  }

  onNameChange(e) {
    this.setState({ name: e.target.value })
  }

  onSchoolChange(e) {
    this.setState({ school: e.target.value })
  }

  renderBody() {
    const { email, name, school } = this.state
    const mailto = `mailto:${email}`
    return (
      <div>
        <TextField hintText={"Email"} onChange={this.onEmailChange.bind(this)} value={email} />
        <RaisedButton style={{margin: '4px'}} label={"Send Email"} href={mailto} primary={true} />
        <br />
        <TextField hintText={"Name"} onChange={this.onNameChange.bind(this)} value={name} />
        <br />
        <TextField hintText={"School"} onChange={this.onSchoolChange.bind(this)} value={school} />
      </div>
    )
  }

  render() {
    const { student } = this.props
    
    const actions = [
      <FlatButton
        label="Cancel"
        onTouchTap={this.props.onClose}
      />,
      <FlatButton
        style={{color: '#F44336'}}
        label="Remove Student"
        onTouchTap={this.onRemove.bind(this)}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.onSubmit.bind(this)}
      />,
    ]
    return (
      <Dialog
        title="Edit Student"
        actions={actions}
        open={this.props.open}
        onRequestClose={this.props.onClose}>
        {this.renderBody()}
      </Dialog>
    )
  }

}

EditStudentDialog.propTypes = {
  open: React.PropTypes.bool.isRequired,
  onClose: React.PropTypes.func.isRequired,
  student: React.PropTypes.object,
}

export default EditStudentDialog