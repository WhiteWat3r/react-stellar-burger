import { TCreatedOrder, TIngredient } from '../types';
import { Action } from 'redux';
import {ActionWithPayload} from './auth'

export const FETCH_INGREDIENTS_REQUEST = 'FETCH_INGREDIENTS_REQUEST';
export const FETCH_INGREDIENTS_SUCCESS = 'FETCH_INGREDIENTS_SUCCESS';
export const FETCH_INGREDIENTS_FAILURE = 'FETCH_INGREDIENTS_FAILURE';

export const SEND_ORDER_REQUEST = 'SEND_ORDER_REQUEST';
export const SEND_ORDER_SUCCESS = 'SEND_ORDER_SUCCESS';
export const SEND_ORDER_FAILURE = 'SEND_ORDER_FAILURE';

export const SET_CURRENT_INGREDIENT = 'SET_CURRENT_INGREDIENT';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';

export const fetchIngredientsRequest = () => {
  return {
    type: FETCH_INGREDIENTS_REQUEST,
  };
};

export const fetchIngredientsSuccess = (data: TIngredient[]): ActionWithPayload<typeof FETCH_INGREDIENTS_SUCCESS, TIngredient[]>=> {
  return {
    type: FETCH_INGREDIENTS_SUCCESS,
    payload: data,
  };
};

export const fetchIngredientsFailure = (error: string): ActionWithPayload<typeof FETCH_INGREDIENTS_FAILURE, string> => {
  return {
    type: FETCH_INGREDIENTS_FAILURE,
    payload: error,
  };
};

export const setCurrentIngredient = (ingredient: TIngredient): ActionWithPayload<typeof SET_CURRENT_INGREDIENT, TIngredient> => ({
  type: SET_CURRENT_INGREDIENT,
  payload: ingredient,
});

export const sendOrderSuccess = (data: TCreatedOrder): ActionWithPayload<typeof SEND_ORDER_SUCCESS, TCreatedOrder> => {
  return {
    type: SEND_ORDER_SUCCESS,
    payload: data,
  };
};

export const sendOrderFailure = () => {
  return {
    type: SEND_ORDER_FAILURE,
  };
};
