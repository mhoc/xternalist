import { 
  OPEN_APP_BAR_DROPDOWN,
  CLOSE_APP_BAR_DROPDOWN,
} from '/imports/ui/actions'

const initialState = {
  dropdownOpen: false,
  dropdownAnchor: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_APP_BAR_DROPDOWN:
      return { ...state, dropdownOpen: true, dropdownAnchor: action.anchor }
    case CLOSE_APP_BAR_DROPDOWN:
      return { ...state, dropdownOpen: false, dropdownAnchor: null }
    default:
      return state
  }
}
