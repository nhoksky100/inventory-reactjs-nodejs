import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './StoreRcd';
// import { BrowserRouter } from "react-router-dom";



ReactDOM.render(
  // <React.StrictMode>
  // <App />
  // </React.StrictMode>,

  <Provider store={store} >
      {/* <I18nextProvider i18n={i18next}> */}


          {/* <CookiesProvider> */}
              <App />
          {/* </CookiesProvider> */}

      {/* </I18nextProvider> */}
  </Provider>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
