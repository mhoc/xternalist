import csv from 'csv'
import _ from 'lodash'
import { Meteor } from 'meteor/meteor'
import { Random  } from 'meteor/random'

import { Students } from '/imports/api/Students'

Meteor.methods({

  'Students.create'(student) {
    if (!this.userId) throw new Meteor.Error(401, 'unauthorized')
    student = _.assign(student, { _id: Random.id() })
    Students.insert(student)
  },

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

  'Students.patchCsv'(type, classId, data) {
    if (!this.userId) throw new Meteor.Error(401, 'unauthorized')
    let csvData = null
    try {
      csvData = Meteor.wrapAsync(csv.parse)(data)
    } catch (e) {
      throw new Meteor.Error(400, "Error parsing your CSV file.")
    }
    csvData = _.tail(csvData)
    _.forEach(csvData, (dp) => {
      const [ email, name, school ] = dp
      let existing = Students.findOne({ classId, email })
      if (existing) {
        existing = _.assign(existing, { name, school })
        Meteor.call('Students.update', existing) 
      } else {
        Meteor.call('Students.create', { classId, email, name, school })
      }
    })
  },

  'Students.remove'(studentId) {
    if (!this.userId) throw new Meteor.Error(401, 'unauthorized')
    Students.remove({ _id: studentId })
  },

})