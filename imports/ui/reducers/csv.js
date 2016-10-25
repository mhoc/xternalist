import { 
  SET_ACTIVE_STEP,
  SET_CSV_TEXT,
  SET_CSV_ERROR,
  SET_SELECTED_CSV_TYPE,
} from '/imports/ui/actions'

const initialState = {
  activeStep: 0,
  csvType: 'basic',
  error: null,
  text: "",
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_STEP:
      return { ...state, activeStep: action.activeStep }
    case SET_CSV_TEXT:
      return { ...state, text: action.text }
    case SET_SELECTED_CSV_TYPE:
      return { ...state, csvType: action.csvType }
    case SET_CSV_ERROR:
      return { ...state, error: action.error }
    default:
      return state
  }
}
