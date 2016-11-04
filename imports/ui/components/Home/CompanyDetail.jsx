import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import TextField from 'material-ui/TextField'
import { Meteor } from 'meteor/meteor'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import {
  getCandidatesForStudent,
  setDetailView,
  setDialogProps,
  setEditCompanyName,
  openDialog,
} from '/imports/ui/actions'
import TableDetail from '/imports/ui/components/Common/TableDetail'

const topActionButtons = (dispatch) => {
  return [
    { 
      label: "Import CSV",
      onTouchTap: () => {
        dispatch(setDialogProps({
          showTypes: [ '' ]
        }))
        dispatch(openDialog('importStudentCsv'))
      }
    }
  ]
}

const CompanyDetail = ({ companies, dispatch }) => {
  const data = _.map(companies, (c) => ({
    fields: [ c.name ],
    onTouchTap: () => {
      dispatch(setDialogProps({ company: c }))
      dispatch(setEditCompanyName(c.name))
      dispatch(openDialog('companyInfo'))
    },
  }))
  return <TableDetail
    backDetail="class"
    tData={data}
    tHeaders={[ "Name" ]}
    topActionButtons={topActionButtons(dispatch)}
  />
}

CompanyDetail.propTypes = {
  companies: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect()(CompanyDetail)