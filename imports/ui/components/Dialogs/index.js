import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { 
  closeDialog,
} from '/imports/ui/actions'
import LoginDialog from '/imports/ui/components/Dialogs/LoginDialog'

const OpenDialog = ({ dispatch, open }) => {
  return (
    <div>
      <LoginDialog open={open === 'login'} />
    </div>
  )
}

OpenDialog.propTypes = {
  dispatch: PropTypes.func.isRequired,
  open: PropTypes.string,
}

const mapStateToProps = ({ dialogs }) => ({
  open: dialogs.openDialog,
})

export default connect(mapStateToProps)(OpenDialog)