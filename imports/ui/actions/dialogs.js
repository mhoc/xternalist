
export const OPEN_DIALOG = 'OPEN_DIALOG'
export const openDialog = (to) => ({
  type: OPEN_DIALOG,
  to,
})

export const SET_DIALOG_PROPS = "SET_DIALOG_PROPS"
export const setDialogProps = (props) => ({
  type: SET_DIALOG_PROPS,
  props,
})

export const CLOSE_DIALOG = 'CLOSE_DIALOG'
export const closeDialog = () => ({
  type: CLOSE_DIALOG,
})

export const UPDATE_LOGIN_EMAIL = "UPDATE_LOGIN_EMAIL"
export const updateLoginEmail = (email) => ({
  type: UPDATE_LOGIN_EMAIL,
  email,
})

export const UPDATE_LOGIN_PASSWORD = "UPDATE_LOGIN_PASSWORD"
export const updateLoginPassword = (password) => ({
  type: UPDATE_LOGIN_PASSWORD,
  password,
})

export const SET_LOGIN_ERROR = "SET_LOGIN_ERROR"
export const setLoginError = (err) => ({
  type: SET_LOGIN_ERROR,
  loginError: err,
})

export const SET_NEW_CLASS_NAME = "SET_NEW_CLASS_NAME"
export const setNewClassName = (name) => ({
  type: SET_NEW_CLASS_NAME,
  newClassName: name,
})

export const SET_EDIT_STUDENT_EMAIL = "SET_EDIT_STUDENT_EMAIL"
export const setEditStudentEmail = (email) => ({
  type: SET_EDIT_STUDENT_EMAIL,
  editStudentEmail: email,
})

export const SET_EDIT_STUDENT_NAME = "SET_EDIT_STUDENT_NAME"
export const setEditStudentName = (name) => ({
  type: SET_EDIT_STUDENT_NAME,
  editStudentName: name,
})

export const SET_EDIT_STUDENT_SCHOOL = "SET_EDIT_STUDENT_SCHOOL"
export const setEditStudentSchool = (school) => ({
  type: SET_EDIT_STUDENT_SCHOOL,
  editStudentSchool: school,
}) 