import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'

class AddCompanyDialog extends Component {

  constructor(props) {
    super(props)
    this.state = {
      companyName: "",
      error: null,
    }
  }

  checkEnter(e) {
    if (e.keyCode === 13) {
      e.preventDefault()
      this.handleAddCompany()
    }
  }

  handleAddCompany() {
    const { companyName, contactEmail } = this.state
    const params = {
      name: companyName,
      email: contactEmail,
    }
    Meteor.call('Companies.insert', params, (err) => {
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
        label="Add Company"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleAddCompany.bind(this)}
      />,
    ]
    return (
      <Dialog
        title="Add A Company"
        actions={actions}
        open={this.props.open}
        onRequestClose={this.props.onClose}>
        {error && <p>{error}</p>}
        <TextField 
          hintText="Name" 
          floatingLabelText="Name"
          fullWidth={true}
          onChange={(e) => this.setState({ companyName: e.target.value })}
          value={this.state.companyName} />
        <TextField
          hintText="Contact Email (Optional)"
          floatingLabelText="Contact Email" 
          fullWidth={true}
          onChange={(e) => this.setState({ contactEmail: e.target.value })}
          value={this.state.contactEmail}
          onKeyDown={this.checkEnter.bind(this)} />
      </Dialog>
    )
  }

}

AddCompanyDialog.propTypes = {
  open: React.PropTypes.bool.isRequired,
  onClose: React.PropTypes.func.isRequired,
}

export default AddCompanyDialog