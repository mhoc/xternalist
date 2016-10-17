import { Mongo } from 'meteor/mongo'

const Companies = new Meteor.Collection('companies')

export {
  Companies,
}