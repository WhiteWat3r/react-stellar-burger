import { ingredientReducer } from './ingredient';
import { combineReducers, applyMiddleware } from 'redux';
import { modalReducer } from './modal';
import { authReducer } from './auth';
import { configureStore } from '@reduxjs/toolkit';
import { socketMiddleware } from '../middleware/middleware';
import { wsReducer } from './web-socket';
import { config } from '../../utils/constants';
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_FEED,
  WS_USER_CONNECTION_CLOSED,
  WS_USER_CONNECTION_ERROR,
  WS_USER_CONNECTION_START,
  WS_USER_CONNECTION_SUCCESS,
  WS_USER_GET_FEED,
} from '../actions/web-socket';

const wsActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_FEED,
};

const wsUserActions = {
  wsInit: WS_USER_CONNECTION_START,
  onOpen: WS_USER_CONNECTION_SUCCESS,
  onClose: WS_USER_CONNECTION_ERROR,
  onError: WS_USER_CONNECTION_CLOSED,
  onMessage: WS_USER_GET_FEED,
};

export const rootReducer = combineReducers({
  ingredient: ingredientReducer,
  modal: modalReducer,
  auth: authReducer,
  ws: wsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(socketMiddleware(config.feedUrl, wsActions))
      .concat(socketMiddleware(config.feedAuthUrl, wsUserActions)),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
