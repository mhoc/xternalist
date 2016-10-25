import _ from 'lodash'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data';
import React, { Component } from 'react'

import { Companies } from '/imports/api/Companies'
import { Students } from '/imports/api/Students'
import { XternClasses } from '/imports/api/XternClasses'

import AppBar from '/imports/ui/components/AppBar'
import Dialog from '/imports/ui/components/Dialogs'
import HomePage from '/imports/ui/components/Home/HomePage'

const appContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
}

class App extends Component {

  render() {
    const { companies, students, user, xternClasses } = this.props
    return (
      <div>
        <Dialog />
        <div style={appContainerStyle}>
          <AppBar user={user} />
          {user && <HomePage
            companies={companies}
            students={students}
            user={user} 
            xternClasses={xternClasses} />}
        </div>
      </div>
    )
  }

}

App.propTypes = {
  companies: React.PropTypes.array,
  xternClasses: React.PropTypes.array,
  user: React.PropTypes.object,
}

const AppMeteorContainer = createContainer(() => {
  const subs = [
    Meteor.subscribe('Students.all'),
    Meteor.subscribe('XternClasses.all'),
  ]
  const students = Students.find({}).fetch()
  const user = Meteor.user()
  const xternClasses = XternClasses.find({}).fetch()
  return {
    students,
    xternClasses,
    user,
  }
}, App)

const ThemeWrappedApp = () => {
  return (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <AppMeteorContainer />
    </MuiThemeProvider>
  )
}

export default ThemeWrappedApp