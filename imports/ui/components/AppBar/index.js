import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import Popover from 'material-ui/Popover'
import { Meteor } from 'meteor/meteor'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import {
  closeAppBarDropdown,
  logoutUser,
  openAppBarDropdown,
  openDialog,
} from '/imports/ui/actions'

const MyAppBar = ({ dispatch, dropdownAnchor, dropdownOpen, user }) => {
  const handleOpenDropdown = (e) => {
    e.preventDefault()
    dispatch(openAppBarDropdown(e.currentTarget))
  }
  const renderSignedIn = () => {
    if (user && user.emails) {
      const { address } = user.emails[0]
      return <FlatButton label={address} onTouchTap={handleOpenDropdown} />
    } else if (user) {
      return <FlatButton label={"Signed In"} />
    }
  }
  const renderSigninButton = () => {
    return <FlatButton label="Sign In" onTouchTap={() => dispatch(openDialog('login'))} />
  }
  return (
    <div>
      <Popover
        open={dropdownOpen}
        anchorEl={dropdownAnchor}
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        onRequestClose={() => dispatch(closeAppBarDropdown())} 
        style={{overflowY: 'auto', width: '200px'}}>
        <Menu>
          <MenuItem primaryText="Sign Out" onTouchTap={() => dispatch(logoutUser())} />
        </Menu>
      </Popover>
      <AppBar
        title="Xtern"
        iconElementLeft={<IconButton><NavigationClose /></IconButton>}
        iconElementRight={user
          ? renderSignedIn()
          : renderSigninButton()} />
    </div>
  )
}

MyAppBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  dropdownAnchor: PropTypes.object,
  dropdownOpen: PropTypes.bool,
  user: PropTypes.object,
}

MyAppBar.defaultProps = {
  dropdownOpen: false,
}

const mapStateToProps = ({ appbar }) => ({
  dropdownOpen: appbar.dropdownOpen,
  dropdownAnchor: appbar.dropdownAnchor,
})

export default connect(mapStateToProps)(MyAppBar)