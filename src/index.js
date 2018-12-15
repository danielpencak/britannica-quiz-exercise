/* eslint-disable no-unused-vars, no-undef */
import './styles/css/index.css';
import * as serviceWorker from './util/serviceWorker';
import App from './components/App/App';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'));

serviceWorker.unregister();
