import { ingredientReducer } from './ingredient';
import { combineReducers } from 'redux';
import { modalReducer } from './modal';
import { authReducer } from './auth';
import { configureStore } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  ingredient: ingredientReducer,
  modal: modalReducer,
  auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
