import _ from 'lodash'
import RaisedButton from 'material-ui/RaisedButton'
import {
  Table, 
  TableBody, 
  TableHeader, 
  TableHeaderColumn, 
  TableRow, 
  TableRowColumn
} from 'material-ui/Table'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import {
  setDetailView,
} from '/imports/ui/actions'

const styles = {
  headerContainer: {
    flexDirection: 'row',
    padding: '12px',
  },
  headerButton: {
    margin: '8px',
  },
}

const renderTop = ({ backDetail, dispatch, topActionButtons }) => {
  return (
    <div style={styles.headerContainer}>
      {[
        backDetail ? <RaisedButton
          key="Back"
          label="Back"
          onTouchTap={() => dispatch(setDetailView(backDetail))}
          secondary={true}
          style={styles.headerButton}
        /> : null,
        ..._.map(topActionButtons, (ab) => {
          return <RaisedButton
            key={ab.label}
            label={ab.label}
            primary={true}
            onTouchTap={ab.onTouchTap} 
            style={styles.headerButton}
          />
        }),
      ]}
    </div>
  )
}

const renderTable = ({ tHeaders, tData }) => {
  return (
    <Table fixedHeader={true} height={"250px"} selectable={false}>
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
        <TableRow>
          {_.map(tHeaders, (h) => <TableHeaderColumn key={h}>{h}</TableHeaderColumn>)}
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false} showRowHover={true}>
        {_.map(tData, (d) => {
          return <TableRow key={d.fields[0]} onTouchTap={_.get(d, 'onTouchTap')}>
            {_.map(d.fields, (dd) => <TableRowColumn key={dd}>{dd}</TableRowColumn>)}
          </TableRow>
        })}
      </TableBody>
    </Table>
  )
}

const TableDetail = ({
  backDetail,
  dispatch,
  tData,
  tHeaders,
  topActionButtons,
}) => {
  return (
    <div>
      {renderTop({ backDetail, dispatch, topActionButtons })}
      {renderTable({ tHeaders, tData })}
    </div>
  )
}

TableDetail.propTypes = {
  backDetail: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  tData: PropTypes.arrayOf(PropTypes.shape({
    fields: PropTypes.arrayOf(PropTypes.string).isRequired,
    onTouchTap: PropTypes.func.isRequired,
  })).isRequired,
  tHeaders: PropTypes.arrayOf(PropTypes.string).isRequired,
  topActionButtons: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    onTouchTap: PropTypes.func.isRequired,
  })),
}

export default connect()(TableDetail)