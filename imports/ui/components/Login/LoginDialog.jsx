import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'

class LoginDialog extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
    }
  }

  checkEnter(e) {
    if (e.keyCode === 13) {
      e.preventDefault()
      this.handleLoginSubmit()
    }
  }

  handleLoginSubmit() {
    const { onClose } = this.props
    const { email, password } = this.state
    Meteor.loginWithPassword(email, password)
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        onTouchTap={this.props.onClose}
      />,
      <FlatButton
        label="Sign In"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleLoginSubmit.bind(this)}
      />,
    ]
    return (
      <Dialog
        title="Sign In"
        actions={actions}
        open={this.props.open}
        onRequestClose={this.props.onClose}>
        <TextField 
          hintText="Email Address" 
          floatingLabelText="Email Address"
          fullWidth={true}
          onChange={(e) => this.setState({ email: e.target.value })}
          value={this.state.email}/>
        <br />
        <TextField 
          hintText="Password" 
          floatingLabelText="Password"
          type="password" 
          fullWidth={true}
          onChange={(e) => this.setState({ password: e.target.value })}
          value={this.state.password} 
          onKeyDown={this.checkEnter.bind(this)} />
      </Dialog>
    )
  }

}

LoginDialog.propTypes = {
  open: React.PropTypes.bool.isRequired,
  onClose: React.PropTypes.func.isRequired,
}

export default LoginDialog