import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import Checkbox from 'material-ui/Checkbox'
import Toggle from 'material-ui/Toggle'
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
      <Subheader>{"Xtern Class"}</Subheader>
      <ListItem
        primaryText="Students"
        secondaryText="You can add students manually or import a CSV" 
        onTouchTap={() => dispatch(setDetailView('students'))} />
      <ListItem
        primaryText="Schedule"
        secondaryText="Create a schedule for Xtern Finalist day. Make sure you've imported a company schedule csv"
        onTouchTap={() => doSchedule({ dispatch })} />
    </List>
  )
}

XternClassDetail.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default connect()(XternClassDetail)