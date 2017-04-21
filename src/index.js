import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
const io = require('socket.io-client');

const socket = io('https://social-ping-server.now.sh');

ReactDOM.render(
  <App socketConnection={socket}/>,
  document.getElementById('root')
);
