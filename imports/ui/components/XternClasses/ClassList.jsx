import Divider from 'material-ui/Divider'
import { List, ListItem } from 'material-ui/List'
import Paper from 'material-ui/Paper'
import ActionGrade from 'material-ui/svg-icons/action/grade'
import CheckCircle from 'material-ui/svg-icons/action/check-circle'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import {
  selectClass,
  setDetailView,
  setDialogProps,
  openDialog,
} from '/imports/ui/actions'

const containerStyle = {
  width: 275,
  flex: '1 1 1',
  padding: '20px 20px 20px 20px',
}

const paperStyle = {
  maxHeight: '45vh',
  overflowY: 'scroll',
}

const XternClassList = ({ classes, dispatch, selectedClass }) => {
  const renderClassItem = (c, selectedClass) => {
    let rightAvatar = null
    if (selectedClass === c._id) {
      rightAvatar = <CheckCircle />
    }
    return <ListItem 
      key={c._id} 
      primaryText={c.name}
      rightIcon={rightAvatar}
      onTouchTap={() => {
        dispatch(selectClass(c._id))
        dispatch(setDetailView('class'))
      }}/>
  }
  return (
    <div style={containerStyle}>
      <Paper zDepth={2} style={paperStyle}>
        <List>
          <ListItem 
            primaryText="Add A Class" 
            leftIcon={<ActionGrade />} 
            onTouchTap={() => dispatch(openDialog('addClass'))} />
        </List>
        <Divider />
        <List>
          {classes.map((c) => renderClassItem(c, selectedClass))}
        </List>
      </Paper>
    </div>
  )
}

XternClassList.propTypes = {
  classes: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  selectedClass: React.PropTypes.string,
}

const mapStateToProps = ({ home }) => ({
  selectedClass: home.selectedClass,
})

export default connect(mapStateToProps)(XternClassList)