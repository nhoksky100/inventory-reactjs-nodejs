import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
// import InternetStatusChecker from '../Connect/InternetStatusChecker';
import FormViewCustomer from '../Component/Views/FormViewCustomer';
import LoginCustomer from '../Component/LoginSignUp/LoginCustomer';

import PasswordRetrieval from '../Component/LoginSignUp/PasswordRetrieval';
import FormChangePassword from '../Component/LoginSignUp/FormChangePassword';
import NotPage404 from '../Component/NotPage404';
import ScrollToTop from './ScrollToTop';

class RouterUrl extends Component {
    render() {
        // const {isOnline} =this.props;
            
        return (
            <Fragment>
                <ScrollToTop />
                {/* { */}
                {/* // isOnline && ( */}
                    <Switch>
                        <Route exact path="/" component={FormViewCustomer} />
                        {/* Định nghĩa route cho trang chính */}
                        <Route exact path="/warehouse" component={FormViewCustomer} />
                        <Route exact path="/create-warehouse" component={FormViewCustomer} />
                        <Route exact path="/warehouse-list" component={FormViewCustomer} />
                        <Route exact path="/into-warehouse-list" component={FormViewCustomer} />
                        <Route exact path="/transfer-warehouse-export" component={FormViewCustomer} />
                        {/* <Route exact path="/inventoryCheck" component={FormViewCustomer} /> */}
                        <Route exact path="/purchase" component={FormViewCustomer} />
                        <Route exact path="/purchase/document" component={FormViewCustomer} />
                        {/* <Route exact path="/partner" component={FormViewCustomer} /> */}
                        <Route exact path="/purchase/request-approved" component={FormViewCustomer} />
                        <Route exact path="/purchase/request-all" component={FormViewCustomer} />
                        <Route exact path="/purchase/into-warehouse" component={FormViewCustomer} />
                        <Route exact path="/purchase/add-document" component={FormViewCustomer} />
                        <Route exact path="/supplier" component={FormViewCustomer} />
                        <Route exact path="/add-supplier" component={FormViewCustomer} />
                        <Route exact path="/member" component={FormViewCustomer} />
                        <Route exact path="/add-member" component={FormViewCustomer} />
                        <Route exact path="/list-account" component={FormViewCustomer} />
                        <Route exact path="/add-account" component={FormViewCustomer} />
                        <Route exact path="/request" component={FormViewCustomer} />
                        <Route exact path="/itemlist" component={FormViewCustomer} />
                        <Route exact path="/add-itemlist" component={FormViewCustomer} />
                        <Route exact path="/profile-acctount" component={FormViewCustomer} />
                       
                      
                        {/* <Route exact path="/setting" component={FormViewCustomer} /> */}
                        <Route exact path="/login" component={LoginCustomer} />
                        <Route exact path="/login/password-retrieval" component={PasswordRetrieval} />
                        <Route exact path="/new-password" component={FormChangePassword} />
                       
                      
                        <Route component={NotPage404} />
                    </Switch>
                {/* // ) */}
                {/* // } */}
            </Fragment>
        );
    }
}

export default RouterUrl;
