// Main file #1
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; //next step #2
import reportWebVitals from './reportWebVitals'; //ignore for now

const root = ReactDOM.createRoot(document.getElementById('root')); //root rendered in HTML
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
