import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { 
  closeDialog,
} from '/imports/ui/actions'
import CSVImportDialog from '/imports/ui/components/Dialogs/CSVImportDialog'
import EditStudentDialog from '/imports/ui/components/Dialogs/EditStudentDialog'
import LoginDialog from '/imports/ui/components/Dialogs/LoginDialog'
import ScheduleResultsDialog from '/imports/ui/components/Dialogs/ScheduleResultsDialog'

const OpenDialog = ({ dispatch, open, props }) => {
  return (
    <div>
      <CSVImportDialog open={open === 'importStudentCsv'} {...props} />
      <EditStudentDialog open={open === 'editStudent'} {...props} />
      <LoginDialog open={open === 'login'} {...props} />
      <ScheduleResultsDialog open={open === 'scheduleResults'} {...props} />
    </div>
  )
}

OpenDialog.propTypes = {
  dispatch: PropTypes.func.isRequired,
  open: PropTypes.string,
  props: PropTypes.object,
}

const mapStateToProps = ({ dialogs }) => ({
  open: dialogs.openDialog,
  props: dialogs.props,
})

export default connect(mapStateToProps)(OpenDialog)