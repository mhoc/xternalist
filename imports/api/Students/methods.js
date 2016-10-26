import csv from 'csv'
import _ from 'lodash'
import { Meteor } from 'meteor/meteor'
import { Random  } from 'meteor/random'

import { Companies } from '/imports/api/Companies'
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

  'Students.patchCsv'(type, data) {
    if (!this.userId) throw new Meteor.Error(401, 'unauthorized')
    let csvData = null
    try {
      csvData = Meteor.wrapAsync(csv.parse)(data)
    } catch (e) {
      throw new Meteor.Error(400, "Error parsing your CSV file.")
    }
    csvData = _.tail(csvData)
    if (type === 'basicStudent') {
      _.forEach(csvData, (dp) => {
        const [ email, name, school ] = dp
        let existing = Students.findOne({ email })
        if (existing) {
          existing = _.assign(existing, { name, school })
          Meteor.call('Students.update', existing) 
        } else {
          Meteor.call('Students.create', { email, name, school })
        }
      })
    } else if (type === 'companyScheduling') {
      Meteor.call('Companies.patchCandidatePrefs', csvData)
    }
  },

  'Students.remove'(studentId) {
    if (!this.userId) throw new Meteor.Error(401, 'unauthorized')
    Students.remove({ _id: studentId })
  },

  'Students.getCandidateCompanies'(studentId) {
    if (!this.userId) throw new Meteor.Error(401, 'unauthorized')
    return Companies.find({ candidates: studentId }).fetch()
  },

})