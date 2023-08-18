import { ingredientReducer } from './ingredient';
import { combineReducers } from 'redux';
import { modalReducer } from './modal';
import { authReducer } from './auth';



export const rootReducer = combineReducers({
  ingredient: ingredientReducer,
  modal: modalReducer,
  auth: authReducer
});

export type RootState = ReturnType<typeof rootReducer>;
