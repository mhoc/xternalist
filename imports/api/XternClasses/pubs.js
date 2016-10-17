import { Meteor } from 'meteor/meteor'

import { XternClasses } from '/imports/api/XternClasses'

Meteor.publish({

  'XternClasses.all'() {
    if (!this.userId) return null
    return XternClasses.find({})
  }

})