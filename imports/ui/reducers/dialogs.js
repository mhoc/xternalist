import {
  CLOSE_DIALOG,
  OPEN_DIALOG,
  SET_DIALOG_PROPS,
  SET_LOGIN_ERROR,
  SET_EDIT_STUDENT_NAME,
  SET_EDIT_STUDENT_EMAIL,
  SET_EDIT_STUDENT_SCHOOL,
  UPDATE_LOGIN_EMAIL,
  UPDATE_LOGIN_PASSWORD,
} from '/imports/ui/actions'

const initialState = {
  editStudentEmail: "",
  editStudentName: "",
  editStudentSchool: "",
  loginEmail: "",
  loginError: null,
  loginPassword: "",
  openDialog: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_DIALOG:
      return { ...state, openDialog: action.to }
    case SET_DIALOG_PROPS:
      return { ...state, props: action.props }
    case CLOSE_DIALOG:
      return { ...state, openDialog: null }
    case UPDATE_LOGIN_EMAIL:
      return { ...state, loginEmail: action.email }
    case UPDATE_LOGIN_PASSWORD:
      return { ...state, loginPassword: action.password }
    case SET_LOGIN_ERROR:
      return { ...state, loginError: action.loginError }
    case SET_EDIT_STUDENT_NAME:
      return { ...state, editStudentName: action.editStudentName }
    case SET_EDIT_STUDENT_EMAIL:
      return { ...state, editStudentEmail: action.editStudentEmail }
    case SET_EDIT_STUDENT_SCHOOL:
      return { ...state, editStudentSchool: action.editStudentSchool }
    default:
      return state
  }
}
