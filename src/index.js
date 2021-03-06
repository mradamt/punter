import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import axios from 'axios';

import './index.css';

if (process.env.REACT_APP_API_BASE_URL) {
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
