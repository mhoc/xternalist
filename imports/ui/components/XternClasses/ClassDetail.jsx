import React, { Component } from 'react'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import Checkbox from 'material-ui/Checkbox'
import Toggle from 'material-ui/Toggle'
import { Meteor } from 'meteor/meteor'

import ConfirmRemoveClassDialog from '/imports/ui/components/XternClasses/ConfirmRemoveClassDialog'

const paperStyle = {
  flexGrow: 1,
  margin: 20,
}

class XternClassDetail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      confirmRemoveOpen: false,
    }
  }

  openConfirmRemove() {
    this.setState({
      confirmRemoveOpen: true,
    })
  }

  closeDialogs() {
    this.setState({
      confirmRemoveOpen: false,
    })
  }

  handleRemoveClass() {
    const { classData } = this.props
    Meteor.call('XternClasses.remove', classData._id, (err) => {
      if (err) {
        this.setState({
          error: err,
        })
      } else {
        this.props.closeDetail()
      }
    })
  }

  render() {
    const { classData } = this.props
    return (
      <List>
        <ConfirmRemoveClassDialog 
          open={this.state.confirmRemoveOpen}
          onClose={this.closeDialogs.bind(this)}
          onConfirm={this.handleRemoveClass.bind(this)} />
        <Subheader>{classData.name}</Subheader>
        <ListItem
          primaryText="Students"
          secondaryText="You can add students manually, import a CSV, or wait until finalist day and send out a form" 
          onTouchTap={this.props.changeDetail.bind(null, 'students')} />
        <ListItem 
          style={{color: '#F44336'}}
          primaryText="Remove Class" 
          onTouchTap={this.openConfirmRemove.bind(this)} />
      </List>
    )
  }

}

XternClassDetail.propTypes = {
  classData: React.PropTypes.object.isRequired,
  changeDetail: React.PropTypes.func.isRequired,
  closeDetail: React.PropTypes.func.isRequired,
}

export default XternClassDetail