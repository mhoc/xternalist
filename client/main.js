import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
 
import Router from '/imports/ui/components/Router.jsx';
 
Meteor.startup(() => {
  render(<Router />, document.getElementById('render-target'));
});