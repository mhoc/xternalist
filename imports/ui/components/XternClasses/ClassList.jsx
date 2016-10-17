import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List'
import Paper from 'material-ui/Paper'
import ActionGrade from 'material-ui/svg-icons/action/grade'
import CheckCircle from 'material-ui/svg-icons/action/check-circle'
import React, { Component } from 'react'

import AddXternClassDialog from '/imports/ui/components/XternClasses/AddClassDialog'

const containerStyle = {
  width: 275,
  flex: '1 1 1',
  padding: '20px 20px 20px 20px',
}

const paperStyle = {
  maxHeight: '45vh',
  overflowY: 'scroll',
}

class XternClassList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      addClassDialogOpen: false,
    }
  }

  openAddClassDialog() {
    this.setState({
      addClassDialogOpen: true,
    })
  }

  closeAddClassDialog() {
    this.setState({
      addClassDialogOpen: false,
    })
  }

  renderClassItem(c, selectedClass) {
    let rightAvatar = null
    if (selectedClass === c._id) {
      rightAvatar = <CheckCircle />
    }
    return <ListItem 
      key={c._id} 
      primaryText={c.name}
      rightIcon={rightAvatar} 
      onTouchTap={this.props.onSelectClass.bind(null, c._id)} />
  }

  render() {
    const { classes, selectedClass } = this.props
    return (
      <div style={containerStyle}>
        <AddXternClassDialog 
          open={this.state.addClassDialogOpen} 
          onClose={this.closeAddClassDialog.bind(this)} />
        <Paper zDepth={2} style={paperStyle}>
          <List>
            <ListItem 
              primaryText="Add A Class" 
              leftIcon={<ActionGrade />} 
              onTouchTap={this.openAddClassDialog.bind(this)} />
          </List>
          <Divider />
          <List>
            {classes.map((c) => this.renderClassItem(c, selectedClass))}
          </List>
        </Paper>
      </div>
    )
  }

}

XternClassList.propTypes = {
  classes: React.PropTypes.array.isRequired,
  onSelectClass: React.PropTypes.func,
  selectedClass: React.PropTypes.string,
}

export default XternClassList