import React, { Component } from 'react';
import RouterUrl from './UrlRouter/RouterUrl';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { InternetStatusChecker } from './Connect/InternetStatusChecker';


class App extends Component {
  render() {
   
    return (


      <Router>
        <InternetStatusChecker/>
      
      
        <RouterUrl />
       <ToastContainer/>
      </Router>

    );
  }
}
export default App;
