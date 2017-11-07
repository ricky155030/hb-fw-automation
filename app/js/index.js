import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import RootReducer from 'core/reducers'
import '../css/style.css'
import App from 'core/components/App';
import 'antd/dist/antd.css'
import '../css/antd.css'

const logger = createLogger()
const createStoreMiddleware = applyMiddleware(
  thunkMiddleware,
  logger
)(createStore)

const store = createStoreMiddleware(RootReducer)

ReactDOM.render(
  <App store={store} />,
  document.getElementById('react-content')
)
