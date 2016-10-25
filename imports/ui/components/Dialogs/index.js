import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { 
  closeDialog,
} from '/imports/ui/actions'
import AddClassDialog from '/imports/ui/components/Dialogs/AddClassDialog'
import ConfirmRemoveClassDialog from '/imports/ui/components/Dialogs/ConfirmRemoveClassDialog'
import CSVImportDialog from '/imports/ui/components/Dialogs/CSVImportDialog'
import EditStudentDialog from '/imports/ui/components/Dialogs/EditStudentDialog'
import LoginDialog from '/imports/ui/components/Dialogs/LoginDialog'

const OpenDialog = ({ dispatch, open, props }) => {
  return (
    <div>
      <AddClassDialog open={open === 'addClass'} {...props} />
      <ConfirmRemoveClassDialog open={open === 'confirmRemoveClass'} {...props} />
      <CSVImportDialog open={open === 'importStudentCsv'} {...props} />
      <EditStudentDialog open={open === 'editStudent'} {...props} />
      <LoginDialog open={open === 'login'} {...props} />
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