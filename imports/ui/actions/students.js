import { Meteor } from 'meteor/meteor'

export const GET_CANDIDATES_FOR_STUDENT = 'GET_CANDIDATES_FOR_STUDENT'
export const getCandidatesForStudent = (studentId) => (
  (dispatch) => {
    Meteor.call('Students.getCandidateCompanies', studentId, (err, resp) => {
      if (err) console.error(err)
      else dispatch(setCandidatesForStudent(studentId, resp))
      console.log(resp)
    }) 
  }
)

export const SET_CANDIDATES_FOR_STUDENT = 'SET_CANDIDATES_FOR_STUDENT'
export const setCandidatesForStudent = (studentId, companies) => ({
  type: SET_CANDIDATES_FOR_STUDENT,
  companies,
  studentId,
})

