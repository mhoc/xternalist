import _ from 'lodash'
import Paper from 'material-ui/Paper'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import CompanyDetail from '/imports/ui/components/Home/CompanyDetail'
import StudentsDetail from '/imports/ui/components/Home/StudentDetail'
import XternClassDetail from '/imports/ui/components/Home/ClassDetail'

const styles = {
  container: {
    display: 'flex',
    flex: '1 1 auto',
    height: '90vh',
    overflowY: 'hidden',
  },
  paper: {
    flexGrow: 1,
    margin: '20px 20px 20px 20px',
    padding: '0px 0px 0px 0px',
  },
}

const HomePage = ({ companies, detailView, selectedClass, students, user }) => {
  const detailComponent = (() => {
    switch (detailView) {
      case 'class': return <XternClassDetail />
      case 'students': return <StudentsDetail students={students} />
      case 'companies': return <CompanyDetail companies={companies} />
    }
  })()
  return (
    <div style={styles.container}>
      <Paper style={styles.paper} zDepth={2}>
        {detailComponent}
      </Paper>
    </div>
  )
}

HomePage.propTypes = {
  companies: PropTypes.array.isRequired,
  detailView: PropTypes.string.isRequired,
  students: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
}

const mapStateToProps = ({ home }) => ({
  detailView: home.detailView,
})

export default connect(mapStateToProps)(HomePage)