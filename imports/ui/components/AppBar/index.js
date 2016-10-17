import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';

import LoginDialog from '/imports/ui/components/Login/LoginDialog'

class MyAppBar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loginDialogOpen: false,
      userDropdownOpen: false,
    }
  }

  openDialog() {
    this.setState({
      loginDialogOpen: true,
    })
  }

  closeLoginDialog() {
    this.setState({
      loginDialogOpen: false,
    })
  }

  openUserDropdown(e) {
    e.preventDefault()
    this.setState({
      userDropdownAnchor: e.currentTarget,
      userDropdownOpen: true,
    })
  }

  closeUserDropdown() {
    this.setState({
      userDropdownOpen: false,
    })
  }

  handleSignout() {
    Meteor.logout()
    this.closeUserDropdown()
  }

  renderUserDropdown() {
    return (
      <Popover
        open={this.state.userDropdownOpen}
        anchorEl={this.state.userDropdownAnchor}
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        onRequestClose={this.closeUserDropdown.bind(this)} 
        style={{overflowY: 'auto', width: '200px'}}>
        <Menu>
          <MenuItem primaryText="Sign Out" onTouchTap={this.handleSignout.bind(this)} />
        </Menu>
      </Popover>
    )
  }

  renderSigninButton() {
    return <FlatButton label="Sign In" onTouchTap={this.openDialog.bind(this)} />
  }

  renderSignedIn() {
    const { user } = this.props
    if (user && user.emails) {
      const { address } = user.emails[0]
      return <FlatButton label={address} onTouchTap={this.openUserDropdown.bind(this)} />
    } else if (user) {
      return <FlatButton label={"Signed In"} />
    } else {
      return null
    }
  }

  render() {
    const { user } = this.props
    const shouldDisplayDialog = this.state.loginDialogOpen && !user
    return (
      <div>
        <LoginDialog open={shouldDisplayDialog} onClose={this.closeLoginDialog.bind(this)} />
        {this.renderUserDropdown()}
        <AppBar
          title="Xtern"
          iconElementLeft={<IconButton><NavigationClose /></IconButton>}
          iconElementRight={user
            ? this.renderSignedIn.bind(this)()
            : this.renderSigninButton.bind(this)()} />
      </div>
    )
  }

}

MyAppBar.propTypes = {
  user: React.PropTypes.object,
}

export default MyAppBar;