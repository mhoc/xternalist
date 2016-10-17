import { Meteor } from 'meteor/meteor'

import { Students } from '/imports/api/Students'

Meteor.publish({

  'Students.all'() {
    if (!this.userId) return null
    return Students.find({})
  }

})