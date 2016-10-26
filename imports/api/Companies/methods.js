import _ from 'lodash'
import { Meteor } from 'meteor/meteor'

import { Companies } from '/imports/api/Companies'
import { Students } from '/imports/api/Students'

Meteor.methods({

  'Companies.insert'(params) {
    if (!this.userId) throw new Meteor.Error('unauthorized')
    return Companies.insert({
      name: params.name,
      email: params.email,
    })
  },

  'Companies.patchCandidatePrefs'(data) {
    _.forEach(data, (dp) => {
      const name = dp[0]
      const candidates = _.tail(dp)
      let company = Companies.findOne({ name })
      if (!company) {
        const id = Meteor.call('Companies.insert', { name })
        company = Companies.findOne({ name })
      }
      // Check that the candidates actually exist
      let userIdList = []
      let error = ""
      _.forEach(candidates, (c) => {
        const cStudent = Students.findOne({ email: c })
        if (!cStudent) error += `${c} `
        userIdList.push(cStudent._id)
      })
      if (error.length > 0) throw new Meteor.Error(400, `Candidates not found: ${error}`)
      Companies.update({ _id: company._id }, {
        $push: { candidates: { $each: userIdList } }
      })
    })
  },

  'Companies.update'(id, doc) {
    if (!this.userId) throw new Meteor.Error('unauthorized')
    Companies.update({ _id: id }, { $set: doc })
  },

})