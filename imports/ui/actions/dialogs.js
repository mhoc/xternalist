
export const OPEN_DIALOG = 'OPEN_DIALOG'
export const openDialog = (to) => ({
  type: OPEN_DIALOG,
  to,
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