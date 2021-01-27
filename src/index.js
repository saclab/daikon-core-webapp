import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/layout/App';
import './index.css';
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";


import reportWebVitals from './reportWebVitals';


export const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
     <App />
  </Router>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
