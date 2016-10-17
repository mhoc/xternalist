import Divider from 'material-ui/Divider'
import TextField from 'material-ui/TextField'
import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'

const containerStyle = {
  padding: '0px 12px 0px 12px',
}

class CompanyDetail extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  updateCompanyName(to) {
    const { companyData } = this.props
    Meteor.call('Companies.update', companyData._id, { name: to }, (err) => {
      if (err) return this.setState({ error: err })
    })
  }

  updateCompanyContact(to) {
    const { companyData } = this.props
    Meteor.call('Companies.update', companyData._id, { email: to }, (err) => {
      if (err) return this.setState({ error: err })
    })
  }

  render() {
    const { companyData } = this.props
    return (
      <div style={containerStyle}>
        <TextField
          hintText="Name"
          floatingLabelText="Name"
          value={companyData.name} 
          fullWidth={true}
          onChange={(e) => this.updateCompanyName(e.target.value)} />
        <br />
        <TextField
          hintText="Contact Email"
          floatingLabelText="Email"
          value={companyData.email}
          fullWidth={true}
          onChange={(e) => this.updateCompanyContact(e.target.value)} />
        
      </div>
    )
  }

}

CompanyDetail.propTypes = {
  companyData: React.PropTypes.object.isRequired,
  closeDetail: React.PropTypes.func.isRequired,
}

export default CompanyDetail