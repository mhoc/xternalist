import _ from 'lodash'
import { Meteor } from 'meteor/meteor'

import { Students } from '/imports/api/Students'

Meteor.methods({

  'Students.update'(student) {
    if (!this.userId) throw new Meteor.Error(401, 'unauthorized')
    Students.update({ _id: student._id }, {
      $set: {
        email: student.email,
        name: student.name,
        school: student.school,
      }
    })
  },

  'Students.remove'(studentId) {
    if (!this.userId) throw new Meteor.Error(401, 'unauthorized')
    Students.remove({ _id: studentId })
  }

})