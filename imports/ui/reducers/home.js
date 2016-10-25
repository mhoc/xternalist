import { 
  SELECT_CLASS,
  SET_DETAIL_VIEW,
} from '/imports/ui/actions'

const initialState = {
  selectedClass: null,
  detailView: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECT_CLASS:
      return { ...state, selectedClass: action.classId }
    case SET_DETAIL_VIEW:
      return { ...state, detailView: action.to }
    default:
      return state
  }
}
