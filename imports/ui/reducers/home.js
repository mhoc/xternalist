import { 
  SET_DETAIL_VIEW,
} from '/imports/ui/actions'

const initialState = {
  detailView: 'class',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DETAIL_VIEW:
      return { ...state, detailView: action.to }
    default:
      return state
  }
}
