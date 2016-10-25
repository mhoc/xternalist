
export const SET_ACTIVE_STEP = 'SET_ACTIVE_STEP'
export const setActiveStep = (to) => ({
  type: SET_ACTIVE_STEP,
  activeStep: to,
})

export const SET_SELECTED_CSV_TYPE = 'SET_SELECTED_CSV_TYPE'
export const setSelectedCsvType = (to) => ({
  type: SET_SELECTED_CSV_TYPE,
  csvType: to,
})

export const SET_CSV_TEXT = 'SET_CSV_TEXT'
export const setCsvText = (to) => ({
  type: SET_CSV_TEXT,
  text: to,
})

export const SET_CSV_ERROR = 'SET_CSV_ERROR'
export const setCsvError = (to) => ({
  type: SET_CSV_ERROR,
  error: to,
})