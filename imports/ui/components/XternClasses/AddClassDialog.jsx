import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'

class AddClassDialog extends Component {

  constructor(props) {
    super(props)
    this.state = {
      className: "",
      error: null,
    }
  }

  checkEnter(e) {
    if (e.keyCode === 13) {
      e.preventDefault()
      this.handleAddClass()
    }
  }

  handleAddClass() {
    const { className } = this.state
    Meteor.call('XternClasses.insert', className, (err) => {
      if (err) {
        this.setState({ error: err })
      } else {
        this.props.onClose()
      }
    })
  }

  render() {
    const { error } = this.state
    const actions = [
      <FlatButton
        label="Cancel"
        onTouchTap={this.props.onClose}
      />,
      <FlatButton
        label="Add Class"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleAddClass.bind(this)}
      />,
    ]
    return (
      <Dialog
        title="Add An Xtern Class"
        actions={actions}
        open={this.props.open}
        onRequestClose={this.props.onClose}>
        {error && <p>{error}</p>}
        <TextField 
          hintText="Name" 
          floatingLabelText="Name"
          fullWidth={true}
          onChange={(e) => this.setState({ className: e.target.value })}
          value={this.state.className} 
          onKeyDown={this.checkEnter.bind(this)} />
      </Dialog>
    )
  }

}

AddClassDialog.propTypes = {
  open: React.PropTypes.bool.isRequired,
  onClose: React.PropTypes.func.isRequired,
}

export default AddClassDialog