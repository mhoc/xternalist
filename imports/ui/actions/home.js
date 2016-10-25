
export const SET_DETAIL_VIEW = 'SET_DETAIL_VIEW'
export const setDetailView = (to) => ({
  type: SET_DETAIL_VIEW,
  to,
})

export const SELECT_CLASS = "SELECT_CLASS"
export const selectClass = (cid) => ({
  type: SELECT_CLASS,
  classId: cid,
})