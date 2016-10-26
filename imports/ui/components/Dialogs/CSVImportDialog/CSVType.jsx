import {
  RadioButton, 
  RadioButtonGroup,
} from 'material-ui/RadioButton'
import ActionFavorite from 'material-ui/svg-icons/action/favorite'
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import {
  setSelectedCsvType,
} from '/imports/ui/actions'

const styles = {
  radioButton: {
    marginBottom: 16,
  },
}

const CSVType = ({ dispatch, selected }) => {
  return (
    <RadioButtonGroup 
      name="csvUploadType" 
      onChange={(e, v) => dispatch(setSelectedCsvType(v))}
      valueSelected={selected}>
      <RadioButton 
        checkedIcon={<ActionFavorite />}
        label="Basic" 
        style={styles.radioButton}
        uncheckedIcon={<ActionFavoriteBorder />}
        value="basic" 
      />
      <RadioButton
        checkedIcon={<ActionFavorite />}
        label="Company Scheduling"
        style={styles.radioButton}
        uncheckedIcon={<ActionFavoriteBorder />}
        value="companyScheduling"
      />
    </RadioButtonGroup>
  )
}

CSVType.propTypes = {
  dispatch: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired,
}

const mapStateToProps = ({ csv }) => ({
  selected: csv.csvType,
})

export default connect(mapStateToProps)(CSVType)