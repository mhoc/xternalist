import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List'
import Paper from 'material-ui/Paper'
import CheckCircle from 'material-ui/svg-icons/action/check-circle'
import BusinessCenter from 'material-ui/svg-icons/places/business-center'
import React, { Component } from 'react'

import AddCompanyDialog from '/imports/ui/components/Companies/AddCompanyDialog'

const containerStyle = {
  width: 275,
  flex: '1 1 1',
  padding: '0px 20px 20px 20px',
}

const paperStyle = {
  maxHeight: '45vh',
  overflowY: 'scroll',
}

class CompanyList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      addCompanyDialogOpen: false,
    }
  }

  openAddCompanyDialog() {
    this.setState({
      addCompanyDialogOpen: true,
    })
  }

  closeAddCompanyDialog() {
    this.setState({
      addCompanyDialogOpen: false,
    })
  }

  renderCompany(c, selectedClass) {
    let rightAvatar = null
    if (selectedClass === c._id) {
      rightAvatar = <CheckCircle />
    }
    return <ListItem 
      key={c._id} 
      primaryText={c.name}
      rightIcon={rightAvatar} 
      onTouchTap={this.props.onSelectCompany.bind(null, c._id)} />
  }

  render() {
    const { companies, selectedCompany } = this.props
    return (
      <div style={containerStyle}>
        <AddCompanyDialog
          open={this.state.addCompanyDialogOpen}
          onClose={this.closeAddCompanyDialog.bind(this)} />
        <Paper style={paperStyle} zDepth={2}>
          <List>
            <ListItem 
              primaryText="Add A Company" 
              leftIcon={<BusinessCenter />} 
              onTouchTap={this.openAddCompanyDialog.bind(this)} />
          </List>
          <Divider />
          <List>
            {companies.map((c) => this.renderCompany(c, selectedCompany))}
          </List>
        </Paper>
      </div>
    )
  }

}

CompanyList.propTypes = {
  companies: React.PropTypes.array.isRequired,
  onSelectCompany: React.PropTypes.func,
  selectedCompany: React.PropTypes.string,
}

export default CompanyList