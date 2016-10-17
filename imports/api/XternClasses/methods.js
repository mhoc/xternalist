import { Meteor } from 'meteor/meteor'

import { XternClasses } from '/imports/api/XternClasses'

Meteor.methods({

  'XternClasses.insert'(name) {
    if (!this.userId) throw new Meteor.Error(401, 'unauthorized')
    XternClasses.insert({
      name: name,
      stage: 'Created',
    })
  },

  'XternClasses.remove'(id) {
    if (!this.userId) throw new Meteor.Error(401, 'unauthorized')
    XternClasses.remove({
      _id: id,
    })
  },

})