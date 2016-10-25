
import Paper from 'material-ui/Paper'
import { Meteor } from 'meteor/meteor'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import StudentsDetail from '/imports/ui/components/Students/StudentDetail'
import XternClassDetail from '/imports/ui/components/XternClasses/ClassDetail'

const paperStyle = {
  flexGrow: 1,
  margin: '20px 20px 20px 0px',
  padding: '0px 0px 0px 0px',
}

const HomePageDetail = ({ data, detailView, dispatch }) => {
  const detailComponent = (() => {
    switch (detailView) {
      case 'class': return <XternClassDetail 
        classData={data} />
      case 'students': return <StudentsDetail
        students={data} />
    }
  })()
  return (
    <Paper style={paperStyle} zDepth={2}>
      {detailComponent}
    </Paper>
  )
}

HomePageDetail.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
  detailView: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = ({ home }) => ({
  detailView: home.detailView,
})

export default connect(mapStateToProps)(HomePageDetail)