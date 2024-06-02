import React, { Component } from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import RequestListNotApprove from './RequestListNotApprove';
import RequestListApproved from './RequestListApproved';

class RequestInto extends Component {
    constructor(props) {
        super(props);
        this.state = {
          
            selectedComponent: null
        }
    }
    handleClickMenu = (component) => {
        // Cập nhật state selectedComponent khi click vào menu
        this.setState({ selectedComponent: component });
    }
    render() {
        // return (
        //     <div className="head-content-menu">
        //         {/* <NavLink to='/requestInto/request-not' type="button" className="btn btn-success">Đơn chưa duyệt</NavLink>
        //         <NavLink to='/requestInto/add-request' type="button" className="btn btn-success">Tạo đơn</NavLink>
        //         <NavLink to='/requestInto/request-approved' type="button" className="btn btn-success">Đơn đã duyệt</NavLink>
        //         <NavLink to='/requestInto/request-return' type="button" className="btn btn-success">Đơn từ chối</NavLink>
        //         <NavLink to='/requestInto/request-all' type="button" className="btn btn-success">Tất cả đơn</NavLink> */}
               


        //     </div>
        // );
        const {tokenObj}=this.props ||[]
        return (
            <div className="head-content-menu">
              
                {/* <a onClick={() => this.handleClickMenu(<RequestListNotApprove tokenObj={tokenObj} />)} type="button" className="btn btn-success">Đơn chưa duyệt</a>
                <a to='/requestInto/add-request' type="button" className="btn btn-success">Tạo đơn</a>
                <a  onClick={() => this.handleClickMenu(<RequestListApproved tokenObj={tokenObj}  />)} to='/requestInto/request-approved' type="button" className="btn btn-success">Đơn đã duyệt</a>
                <a to='/requestInto/request-return' type="button" className="btn btn-success">Đơn từ chối</a>
                <a to='/requestInto/request-all' type="button" className="btn btn-success">Tất cả đơn</a> */}
            </div>
        )
    }
}

export default RequestInto;