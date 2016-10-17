import { Meteor } from 'meteor/meteor'

import { Companies } from '/imports/api/Companies'

Meteor.methods({

  'Companies.insert'(params) {
    if (!this.userId) throw new Meteor.Error('unauthorized')
    Companies.insert({
      name: params.name,
      email: params.email,
    })
  },

  'Companies.update'(id, doc) {
    if (!this.userId) throw new Meteor.Error('unauthorized')
    Companies.update({ _id: id }, { $set: doc })
  }

})