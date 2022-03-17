import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
// import axios from 'axios';

import './index.css';

// axios.defaults.baseURL = "http://localhost:8001/"

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
