import _ from 'lodash'
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

const allTypes = [
  { label: 'Basic Data', value: 'basicStudent' },
  { label: 'Scheduling', value: 'companyScheduling' },
]

const CSVType = ({ dispatch, selected, showTypes }) => {
  return (
    <RadioButtonGroup 
      name="csvUploadType" 
      onChange={(e, v) => dispatch(setSelectedCsvType(v))}
      valueSelected={selected}>
      {
        _(allTypes)
          .filter((t) => _.includes(showTypes, t.value))
          .map((t) => <RadioButton
            checkedIcon={<ActionFavorite />}
            key={t.value}
            label={t.label} 
            style={styles.radioButton}
            uncheckedIcon={<ActionFavoriteBorder />}
            value={t.value} />
          )
          .value()
      }
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