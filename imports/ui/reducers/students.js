import _ from 'lodash'

import { 
  SET_CANDIDATES_FOR_STUDENT,
} from '/imports/ui/actions'

const initialState = {
  candidateCompanies: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CANDIDATES_FOR_STUDENT:
      const candidateCompanies = _.set(
        state.candidateCompanies,
        `${action.studentId}`,
        action.companies
      )
      return { ...state, candidateCompanies }
    default:
      return state
  }
}
