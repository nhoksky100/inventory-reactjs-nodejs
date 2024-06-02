import React, { Component } from 'react';


class NotificationList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // tooltipVisible: false, // State để kiểm soát việc hiển thị tooltip
            activeTab: 'tab-content-all-notification',
        };
        // this.tooltipRef = React.createRef(); // Ref để tham chiếu đến tooltip element
    }






    // Hàm xử lý sự kiện click tab
    handleTabClick = (tabId) => {
        this.setState({ activeTab: tabId }); // Cập nhật activeTab thành tab được click
    };
    render() {
        const { activeTab } = this.state;

        return (
            <div>
                {/* tipClick */}
                <span title='' className="tipClick">
                    <a href="#tooltip"><i className="fa fa-bell" aria-hidden="true" /></a>
                    <strong className="tooltipT">
                        <h3 className='titleNotification'>Thông báo</h3>
                        <div className="tabs-notification">
                            <div className={`tab ${activeTab === 'tab-content-all-notification' ? 'active' : ''}`} onClick={() => this.handleTabClick('tab-content-all-notification')}>Tất cả</div>
                            <div className={`tab ${activeTab === 'tab-unread' ? 'active' : ''}`} onClick={() => this.handleTabClick('tab-unread')}>Chưa đọc</div>
                        </div>
                        <div className='div-all-new-notification'>
                            <ul style={{ display: 'inline-flex' }}  >
                                <li>Mới</li>
                                <li>Xem tất cả</li>
                            </ul>
                        </div>

                        <div className='row'>

                            <div className="tab-content" style={{ display: activeTab === 'tab-content-all-notification' ? 'block' : 'none' }}>
                                <ul>
                                    <li>
                                        <div className='information-notification'>


                                            <div className='row'>
                                                <div className='col-md-3'><img style={{ borderRadius: '100%', width: '50px' }} src='../images/profile.jpg' /></div>

                                                <div className='col-md-7'>tieu de</div>
                                                <div className='col-md-2'>...</div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='information-notification'>


                                            <div className='row'>
                                                <div className='col-md-3'><img style={{ borderRadius: '100%', width: '50px' }} src='../images/profile.jpg' /></div>

                                                <div className='col-md-7'>tieu de</div>
                                                <div className='col-md-2'>...</div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="tab-content" style={{ display: activeTab === 'tab-unread' ? 'block' : 'none' }}>
                                Nội dung của tab 2
                            </div>
                        </div>
                        {/* <p> 'Danh số hôm nay' sẽ được tính khi giao dịch thành công & đã thanh toán & đã gửi hàng cho khách! </p> */}


                    </strong>

                </span>
            </div>
        );
    }
}

export default NotificationList;
