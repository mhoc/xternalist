
import Paper from 'material-ui/Paper'
import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'

import CompanyDetail from '/imports/ui/components/Companies/CompanyDetail'
import StudentsDetail from '/imports/ui/components/Students/StudentDetail'
import XternClassDetail from '/imports/ui/components/XternClasses/ClassDetail'

const paperStyle = {
  flexGrow: 1,
  margin: '20px 20px 20px 0px',
  padding: '0px 0px 0px 0px',
}

class HomePageDetail extends Component {

  render() {
    const { changeDetail, closeDetail, detailView, data } = this.props
    const detailComponent = (() => {
      switch (detailView) {
        case 'class': return <XternClassDetail 
          classData={data} 
          changeDetail={changeDetail}
          closeDetail={closeDetail} />
        case 'company': return <CompanyDetail 
          companyData={data}
          changeDetail={changeDetail}
          closeDetail={closeDetail} />
        case 'students': return <StudentsDetail
          students={data}
          changeDetail={changeDetail}
          closeDetail={closeDetail} />
      }
    })()
    return (
      <Paper style={paperStyle} zDepth={2}>
        {detailComponent}
      </Paper>
    )
  }

}

HomePageDetail.propTypes = {
  data: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.array,
  ]).isRequired,
  detailView: React.PropTypes.string.isRequired,
  changeDetail: React.PropTypes.func.isRequired,
  closeDetail: React.PropTypes.func.isRequired,
}

export default HomePageDetail