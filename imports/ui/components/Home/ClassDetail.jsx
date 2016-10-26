import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import Checkbox from 'material-ui/Checkbox'
import Toggle from 'material-ui/Toggle'
import BookIcon from 'material-ui/svg-icons/action/book'
import CityIcon from 'material-ui/svg-icons/social/location-city'
import Calendar from 'material-ui/svg-icons/action/perm-contact-calendar'
import Heart from 'material-ui/svg-icons/action/favorite'
import { Meteor } from 'meteor/meteor'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import {
  closeDialog,
  openDialog,
  setDetailView,
  setDialogProps,
} from '/imports/ui/actions'

const paperStyle = {
  flexGrow: 1,
  margin: 20,
}

const doSchedule = ({ dispatch }) => {
  Meteor.call('Students.schedule', (err, resp) => {
    if (err) console.error(err)
    console.log(resp)
    //dispatch(openDialog('scheduleResults'))
  })
}

const XternClassDetail = ({ dispatch }) => {
  return (
    <List>
      <Subheader>{"Class Management"}</Subheader>
      <ListItem
        leftIcon={<BookIcon />}
        primaryText="Students"
        secondaryText="Import and modify students and their company preferences" 
        onTouchTap={() => dispatch(setDetailView('students'))} />
      <ListItem
        leftIcon={<CityIcon />}
        primaryText="Companies"
        secondaryText="Import and modify companies and their scheduling and matching preferences"
        onTouchTap={() => dispatch(setDetailView('companies'))} />
      <ListItem
        leftIcon={<Calendar />}
        primaryText="Schedule"
        secondaryText="Create a schedule for Xtern Finalist day. Make sure you've imported a company schedule csv"
        onTouchTap={() => doSchedule({ dispatch })} />
      <ListItem
        leftIcon={<Heart />}
        primaryText="Match"
        secondaryText="To Be Implemented" />
    </List>
  )
}

XternClassDetail.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default connect()(XternClassDetail)