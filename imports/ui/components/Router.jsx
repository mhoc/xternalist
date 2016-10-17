import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'
import {
  browserHistory,
  IndexRoute,
  Router, 
  Route,
} from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from '/imports/ui/components/App'

injectTapEventPlugin()

export default class MyRouter extends Component {

  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={App} />
      </Router>
    )
  }

}