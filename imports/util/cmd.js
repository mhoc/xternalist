import { parse } from 'csv'
import fs from 'fs'
import _ from 'lodash'
import { Meteor } from 'meteor/meteor'

import { Schedule } from '/imports/util/scheduler'

// This function runs the scheduler for three CSV files located in `basePath`
// - `{basePath}/cCandidates.csv`
// - `{basePath}/cRoles.csv`
// - `{basePath}/sRoles.csv`
export const RunScheduler = (basePath) => {
  const parseCsv = Meteor.wrapAsync(parse)
  const companies = _(parseCsv(fs.readFileSync(`${basePath}/cCandidates.csv`)))
    .tail()
    .map(([ name, ...candidates ]) => ({ name, candidates: _.compact(candidates) }))
    .value()
  _(parseCsv(fs.readFileSync(`${basePath}/cRoles.csv`)))
    .tail()
    .forEach(([ name, ...roles]) => {
      _.find(companies, (c) => c.name === name)['roles'] = _.compact(roles)
    })
  const students = _(parseCsv(fs.readFileSync(`${basePath}/sRoles.csv`)))
    .tail()
    .map(([ email, ...roles ]) => ({ email, roles: _.compact(roles) }))
    .value()
  Schedule({
    companies,
    students,
  })
}