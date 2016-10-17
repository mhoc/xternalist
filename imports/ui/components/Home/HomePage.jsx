import _ from 'lodash'
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import CompanyList from '/imports/ui/components/Companies/CompanyList'
import XternClassList from '/imports/ui/components/XternClasses/ClassList'
import HomePageDetail from '/imports/ui/components/Home/HomePageDetail'

const containerStyle = {
  display: 'flex',
  flex: '1 1 auto',
  height: '90vh',
  overflowY: 'hidden',
}

class HomePage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      detailView: null,
      selectedClass: null,
      selectedCompany: null,
    }
  }

  onSelectClass(cid) {
    if (cid === this.state.selectedClass) {
      this.onCloseDetail()
    } else {
      this.setState({
        detailView: 'class',
        selectedClass: cid,
        selectedCompany: null,
      })
    }
  }

  onSelectCompany(cid) {
    if (cid === this.state.selectedCompany) {
      this.onCloseDetail()
    } else {
      this.setState({
        detailView: 'company',
        selectedClass: null,
        selectedCompany: cid,
      })
    }
  }

  onChangeDetail(to) {
    if (to === 'students') {
      this.setState({
        detailView: to,
        selectedCompany: null,
      })
    }
  }

  onCloseDetail() {
    this.setState({
      detailView: null,
      selectedClass: null,
      selectedCompany: null,
    })
  }

  render() {
    const { companies, students, xternClasses } = this.props
    const { detailView, selectedClass, selectedCompany } = this.state
    let selectedData = []
    if (detailView === 'class') {
      selectedData = _.find(xternClasses, (c) => c._id === selectedClass)
    } else if (detailView === 'company') {
      selectedData = _.find(companies, (c) => c._id === selectedCompany)
    } else if (detailView === 'students') {
      selectedData = _.filter(students, (s) => s.classId === selectedClass)
    }
    return (
      <div style={containerStyle}>
        <div style={{display: 'flex', flexDirection: 'column' }}>
          <XternClassList
            classes={xternClasses}
            onSelectClass={this.onSelectClass.bind(this)}
            selectedClass={this.state.selectedClass} />
          <CompanyList
            companies={companies}
            onSelectCompany={this.onSelectCompany.bind(this)}
            selectedCompany={this.state.selectedCompany} />
        </div>
        {detailView
          && <HomePageDetail 
            changeDetail={this.onChangeDetail.bind(this)}
            closeDetail={this.onCloseDetail.bind(this)}
            detailView={detailView}
            data={selectedData} />}

      </div>
    )
  }

}

HomePage.propTypes = {
  companies: React.PropTypes.array.isRequired,
  user: React.PropTypes.object.isRequired,
  students: React.PropTypes.array.isRequired,
  xternClasses: React.PropTypes.array.isRequired,
}

export default HomePage