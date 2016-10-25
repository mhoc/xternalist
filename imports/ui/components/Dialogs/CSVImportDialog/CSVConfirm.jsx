import csv from 'csv'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import {
  setCsvError,
} from '/imports/ui/actions'

const CSVConfirm = ({ dispatch, error }) => {
  console.log(error)
  const render = error 
    ? <p>{error.reason}</p>
    : <p>{"Looks Great! Hit Finish."}</p>
  return render
}

CSVConfirm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.object,
}

const mapStateToProps = ({ csv }) => ({
  error: csv.error,
})

export default connect(mapStateToProps)(CSVConfirm)