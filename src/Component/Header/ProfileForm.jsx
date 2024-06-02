import React, { Component, Fragment } from 'react';
import axios from 'axios';
import ProfileAccount from './ProfileAccount';
import { UpdateDateTime } from '../UpdateDateTime';
import RequestHistoryForm from './RequestHistoryForm';
import RequestHistoryPDFForm from './RequestHistoryPDFForm';
class ProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'Thông tin',

    };
    this._isMounted = false
  }



  changeTab = (tabName) => {
    this.setState({ activeTab: tabName });
  };

  renderTabContent = () => {
    const { activeTab } = this.state;

    switch (activeTab) {
      case 'Thông tin':
        return this.profileInformation();
      case 'Lịch sử đơn':
        return this.historyRequest();
      case 'Xuất file PDF':
        return this.exportPDF();

      default:
        return null;
    }
  };






  profileInformation = () => {
    const { tokenObj } = this.props || {}
    return <ProfileAccount tokenObj={tokenObj} />
  };

  historyRequest = () => {
    const { tokenObj } = this.props || {}
    return <RequestHistoryForm tokenObj={tokenObj} />
  };

  exportPDF = () => {
    const { tokenObj } = this.props || {}
    return <RequestHistoryPDFForm  tokenObj={tokenObj}/>
  };


  handleSaveImageProfile = () => {
    this.setState({
      imageProfile: '',
      errorMessageImage: ''
    })
  }


  render() {
    const { activeTab } = this.state;
    const dateTime = UpdateDateTime() || ''
    return (
      <Fragment>

        <div className="tabsOverView">

          <div
            className={activeTab === 'Thông tin' ? 'active tab' : 'tab'}
            onClick={() => this.changeTab('Thông tin')}
          >
            Thông tin
          </div>
          <div
            className={activeTab === 'Lịch sử đơn' ? 'active tab' : 'tab'}
            onClick={() => this.changeTab('Lịch sử đơn')}
          >
            Lịch sử đơn
          </div>
          <div
            className={activeTab === 'Xuất file PDF' ? 'active tab' : 'tab'}
            onClick={() => this.changeTab('Xuất file PDF')}
          >
            Xuất tệp PDF
          </div>
          <div><h5 style={{color:'blue', fontFamily: 'cursive', position: 'absolute', right: '3px', top: '95px' }}><span>Tường nhà của bạn</span></h5></div>
        </div>

        <div className='dateOverView'>
          <span style={{color:'blue'}}>
            {dateTime}
          </span>
        </div >
        {this.renderTabContent()}
      </Fragment >
    );
  }
}


export default ProfileForm;
