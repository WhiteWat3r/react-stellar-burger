import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/app';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware, AnyAction, Store } from 'redux';
import { rootReducer } from './services/reducers';
import {RootState} from './services/reducers/index'




declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store: Store<RootState, AnyAction> = createStore(rootReducer, enhancer);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>, 
  document.getElementById('root'),
);