import _ from 'lodash'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import { Meteor } from 'meteor/meteor'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import {
  closeDialog,
  setActiveStep,
  setCsvError,
} from '/imports/ui/actions'
import CSVConfirm from './CSVConfirm'
import CSVType from './CSVType'
import CSVPasteTextField from './CSVPasteTextField'

const onNextAfterCsv = (activeStep, classId, text, type, dispatch) => {
  Meteor.call('Students.patchCsv', type, classId, text, (err, resp) => {
    if (err) dispatch(setCsvError(err))
    dispatch(setActiveStep(activeStep + 1))
  })
}

const onFinish = (dispatch) => {
  dispatch(closeDialog())
} 

const renderStepper = (activeStep, dispatch) => {
  return <Stepper activeStep={activeStep}>
    <Step><StepLabel>CSV Type</StepLabel></Step>
    <Step><StepLabel>Upload</StepLabel></Step>
    <Step><StepLabel>Done!</StepLabel></Step>
  </Stepper>
}

const renderBody = (activeStep, dispatch) => {
  switch (activeStep) {
    case 0: return <CSVType />
    case 1: return <CSVPasteTextField />
    case 2: return <CSVConfirm />
  }
}

const CSVImportDialog = ({ activeStep, dispatch, open, classId, text, type }) => {
  const leftLabel = activeStep === 0 ? 'Cancel' : 'Back'
  const rightLabel = activeStep === 2 ? 'Finish' : 'Next'

  const leftAction = (() => {
    switch (activeStep) {
      case 0: return () => dispatch(closeDialog())
      default: return () => dispatch(setActiveStep(activeStep - 1))
    }
  })()

  const rightAction = (() => {
    switch (activeStep) {
      case 1: return () => onNextAfterCsv(activeStep, classId, text, type, dispatch)
      case 2: return () => onFinish(dispatch)
      default: return () => dispatch(setActiveStep(activeStep + 1))
    }
  })()
  
  const actions = [
    <FlatButton label={leftLabel} onTouchTap={leftAction} />,
    <FlatButton
      label={rightLabel}
      primary={true}
      keyboardFocused={true}
      onTouchTap={rightAction}
    />,
  ]
  return <Dialog
    title="Import Student CSV"
    actions={actions}
    open={open}
    onRequestClose={() => dispatch(closeDialog())}>
      <div style={{width: '100%', maxHeight: 700, maxWidth: 700, margin: 'auto'}}>
        {renderStepper(activeStep, dispatch)}
        {renderBody(activeStep, dispatch)}
      </div>
    </Dialog>
}

CSVImportDialog.propTypes = {
  activeStep: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
}

const mapStateToProps = ({ csv, home }) => ({
  activeStep: csv.activeStep,
  classId: home.selectedClass,
  text: csv.text,
  type: csv.csvType,
})

export default connect(mapStateToProps)(CSVImportDialog)