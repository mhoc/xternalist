import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import XternClassList from '/imports/ui/components/XternClasses/ClassList'
import HomePageDetail from '/imports/ui/components/Home/HomePageDetail'

const containerStyle = {
  display: 'flex',
  flex: '1 1 auto',
  height: '90vh',
  overflowY: 'hidden',
}

const HomePage = ({ detailView, selectedClass, students, user, xternClasses }) => {
  let selectedData = []
  if (detailView === 'class') {
    selectedData = _.find(xternClasses, { _id: selectedClass })
  } else if (detailView === 'students') {
    selectedData = _.filter(students, { classId: selectedClass })
  }
  return (
    <div style={containerStyle}>
      <div style={{display: 'flex', flexDirection: 'column' }}>
        <XternClassList classes={xternClasses} />
      </div>
      {detailView
        && <HomePageDetail data={selectedData} />}
    </div>
  )
}

HomePage.propTypes = {
  students: React.PropTypes.array.isRequired,
  user: React.PropTypes.object.isRequired,
  xternClasses: React.PropTypes.array.isRequired,
}

const mapStateToProps = ({ home }) => ({
  detailView: home.detailView,
  selectedClass: home.selectedClass,
})

export default connect(mapStateToProps)(HomePage)