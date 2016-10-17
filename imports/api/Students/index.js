import { Mongo } from 'meteor/mongo'

const Students = new Mongo.Collection('students')

export {
  Students,
}