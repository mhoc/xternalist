import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import {
  browserHistory,
  IndexRoute,
  Router, 
  Route,
} from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from '/imports/ui/components/App'
import store from '/imports/ui/store'

injectTapEventPlugin()

export default class MyRouter extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/" component={App} />
        </Router>
      </Provider>
    )
  }

}