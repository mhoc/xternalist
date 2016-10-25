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

const XternClassDetail = ({ classData, dispatch }) => {
  const onDialogConfirm = () => {
    Meteor.call('XternClasses.remove', classData._id, (err) => {
      dispatch(setDetailView(null))
      dispatch(closeDialog())
    })
  }
  const openConfirmRemove = () => {
    dispatch(setDialogProps({
      onClose: () => dispatch(closeDialog()),
      onConfirm: onDialogConfirm,
    }))
    dispatch(openDialog('confirmRemoveClass'))
  }
  return (
    <List>
      <Subheader>{classData.name}</Subheader>
      <ListItem
        primaryText="Students"
        secondaryText="You can add students manually, import a CSV, or wait until finalist day and send out a form" 
        onTouchTap={() => dispatch(setDetailView('students'))} />
      <ListItem 
        style={{color: '#F44336'}}
        primaryText="Remove Class" 
        onTouchTap={openConfirmRemove} />
    </List>
  )
}

XternClassDetail.propTypes = {
  classData: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = ({ }) => ({
  
})

export default connect(mapStateToProps)(XternClassDetail)