import { Meteor } from 'meteor/meteor'

import { Companies } from '/imports/api/Companies'

Meteor.publish({

  'Companies.all'() {
    if (!this.userId) return null
    return Companies.find({})
  },

})