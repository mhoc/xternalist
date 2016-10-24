import {
  CLOSE_DIALOG,
  OPEN_DIALOG,
  SET_LOGIN_ERROR,
  UPDATE_LOGIN_EMAIL,
  UPDATE_LOGIN_PASSWORD,
} from '/imports/ui/actions'

const initialState = {
  loginEmail: "",
  loginError: null,
  loginPassword: "",
  openDialog: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_DIALOG:
      return { ...state, openDialog: action.to }
    case CLOSE_DIALOG:
      return { ...state, openDialog: null }
    case UPDATE_LOGIN_EMAIL:
      return { ...state, loginEmail: action.email }
    case UPDATE_LOGIN_PASSWORD:
      return { ...state, loginPassword: action.password }
    case SET_LOGIN_ERROR:
      return { ...state, loginError: action.loginError }
    default:
      return state
  }
}
