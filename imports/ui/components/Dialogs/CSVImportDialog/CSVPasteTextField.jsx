import TextField from 'material-ui/TextField'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import {
  setCsvText,
} from '/imports/ui/actions'

const getHelpText = (type) => {
  switch (type) {
    case 'basic': return 'Email, Name, School'
    case 'companyScheduling': return 'CompanyName, CandidateEmail1, CandidateEmail2, ...'
  }
}

const CSVPasteTextField = ({ csvText, csvType, dispatch }) => {
  return <TextField
    floatingLabelText={"Paste CSV File (With Headers) Here"}
    fullWidth={true}
    hintText={getHelpText(csvType)}
    multiLine={true}
    onChange={(e) => dispatch(setCsvText(e.target.value))}
    rows={8}
    rowsMax={8}
    value={csvText}
  />
}

CSVPasteTextField.propTypes = {
  csvText: PropTypes.string.isRequired,
  csvType: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = ({ csv }) => ({
  csvText: csv.text,
  csvType: csv.csvType,
})

export default connect(mapStateToProps)(CSVPasteTextField)