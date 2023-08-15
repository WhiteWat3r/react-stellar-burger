import { ingredientReducer } from './ingredient';
import { combineReducers } from 'redux';
import { modalReducer } from './modal';

export const rootReducer = combineReducers({
  ingredient: ingredientReducer,
  modal: modalReducer,
});
