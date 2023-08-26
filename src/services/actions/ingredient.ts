import { TCreatedOrder, TIngredient, TOrder } from '../types';
import { Action } from 'redux';
import { ActionWithPayload } from './auth';
import { v4 as uuidv4 } from 'uuid';

export const FETCH_INGREDIENTS_REQUEST = 'FETCH_INGREDIENTS_REQUEST';
export const FETCH_INGREDIENTS_SUCCESS = 'FETCH_INGREDIENTS_SUCCESS';
export const FETCH_INGREDIENTS_FAILURE = 'FETCH_INGREDIENTS_FAILURE';

export const SEND_ORDER_REQUEST = 'SEND_ORDER_REQUEST';
export const SEND_ORDER_SUCCESS = 'SEND_ORDER_SUCCESS';
export const SEND_ORDER_FAILURE = 'SEND_ORDER_FAILURE';

export const SET_CURRENT_INGREDIENT = 'SET_CURRENT_INGREDIENT';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';

export const CLEAR_CREATED_ORDER = 'CLEAR_CREATED_ORDER';
export const SET_CURRENT_ORDER = 'SET_CURRENT_ORDER';

export const GET_ORDER_INFO_SUCCESS = 'GET_ORDER_INFO_SUCCESS';

export const ADD_CONSTRUCTOR_INGREDIENT = 'ADD_INGRIEDIENT';
export const REMOVE_CONSTRUCTOR_INGREDIENT = 'REMOVE_INGRIEDIENT';
export const UPDATE_CONSTRUCTOR_INGREDIENTS = 'UPDATE_CONSTRUCTOR_INGREDIENTS';
export const REPLACE_CONSTRUCTOR_BUN = 'REPLACE_CONSTRUCTOR_BUN';
export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR';

export type TFetchIngredientsRequestAction = {
  readonly type: typeof FETCH_INGREDIENTS_REQUEST;
};

export type TFetchIngredientsSuccessAction = {
  readonly type: typeof FETCH_INGREDIENTS_SUCCESS;
  readonly payload: TIngredient[];
};

export type TFetchIngredientsFailureAction = {
  readonly type: typeof FETCH_INGREDIENTS_FAILURE;
  readonly payload: string;
};

export type TSetCurrentIngredientAction = {
  readonly type: typeof SET_CURRENT_INGREDIENT;
  readonly payload: TIngredient;
};

export type TSendOrderSuccessAction = {
  readonly type: typeof SEND_ORDER_SUCCESS;
  readonly payload: TCreatedOrder;
};

export type TSendOrderFailureAction = {
  readonly type: typeof SEND_ORDER_FAILURE;
};

export type TSetCurrentOrderAction = {
  readonly type: typeof SET_CURRENT_ORDER;
  readonly payload: TOrder;
};

export type TGetOrderInfoSuccessAction = {
  readonly type: typeof GET_ORDER_INFO_SUCCESS;
};

export type TClearCreatedOrderAction = {
  readonly type: typeof CLEAR_CREATED_ORDER;
};

export type TAddConstructorIngredientAction = {
  readonly type: typeof ADD_CONSTRUCTOR_INGREDIENT;
  readonly payload: TIngredient & { uniqueId: string };
};

export type TRemoveConstructorIngredientAction = {
  readonly type: typeof REMOVE_CONSTRUCTOR_INGREDIENT;

  readonly payload: TIngredient;
};

export type TReplaceConstructorBunAction = {
  readonly type: typeof REPLACE_CONSTRUCTOR_BUN;
  readonly payload: TIngredient;
  readonly index: number;
};

export type TUpdateConstructorIngredientsAction = {
  readonly type: typeof UPDATE_CONSTRUCTOR_INGREDIENTS;
  readonly payload: TIngredient[];
};

export type TClearConstructorAction = {
  readonly type: typeof CLEAR_CONSTRUCTOR;
};

export type TIngredientsActions =
  | TClearCreatedOrderAction
  | TGetOrderInfoSuccessAction
  | TSetCurrentOrderAction
  | TSendOrderFailureAction
  | TSendOrderSuccessAction
  | TFetchIngredientsRequestAction
  | TFetchIngredientsSuccessAction
  | TFetchIngredientsFailureAction
  | TSetCurrentIngredientAction
  | TAddConstructorIngredientAction
  | TRemoveConstructorIngredientAction
  | TReplaceConstructorBunAction
  | TUpdateConstructorIngredientsAction
  | TClearConstructorAction;

export const addConstructorIngredient = (
  ingredient: TIngredient,
): TAddConstructorIngredientAction => ({
  type: ADD_CONSTRUCTOR_INGREDIENT,
  payload: {
    ...ingredient,
    uniqueId: uuidv4(),
  },
});

export const removeConstructorIngredient = (
  ingredient: TIngredient,
): TRemoveConstructorIngredientAction => ({
  type: REMOVE_CONSTRUCTOR_INGREDIENT,
  payload: ingredient,
});

export const replaceConstructorBun = (
  ingredient: TIngredient,
  index: number,
): TReplaceConstructorBunAction => ({
  type: REPLACE_CONSTRUCTOR_BUN,
  payload: ingredient,
  index,
});

export const updateConstructorIngredients = (
  ingredients: TIngredient[],
): TUpdateConstructorIngredientsAction => ({
  type: UPDATE_CONSTRUCTOR_INGREDIENTS,
  payload: ingredients,
});

export const clearConstructor = (): TClearConstructorAction => ({
  type: CLEAR_CONSTRUCTOR,
});

export const fetchIngredientsRequest = (): TFetchIngredientsRequestAction => {
  return {
    type: FETCH_INGREDIENTS_REQUEST,
  };
};

export const fetchIngredientsSuccess = (data: TIngredient[]): TFetchIngredientsSuccessAction => {
  return {
    type: FETCH_INGREDIENTS_SUCCESS,
    payload: data,
  };
};

export const fetchIngredientsFailure = (error: string): TFetchIngredientsFailureAction => {
  return {
    type: FETCH_INGREDIENTS_FAILURE,
    payload: error,
  };
};

export const setCurrentIngredient = (ingredient: TIngredient): TSetCurrentIngredientAction => {
  return {
    type: SET_CURRENT_INGREDIENT,
    payload: ingredient,
  };
};

export const sendOrderSuccess = (data: TCreatedOrder): TSendOrderSuccessAction => {
  return {
    type: SEND_ORDER_SUCCESS,
    payload: data,
  };
};

export const sendOrderFailure = (): TSendOrderFailureAction => {
  return {
    type: SEND_ORDER_FAILURE,
  };
};

export const setCurrentOrder = (order: TOrder): TSetCurrentOrderAction => {
  return {
    type: SET_CURRENT_ORDER,
    payload: order,
  };
};

export const getOrderInfoSuccess = (): TGetOrderInfoSuccessAction => ({
  type: GET_ORDER_INFO_SUCCESS,
});

export const clearCreatedOrder = (): TClearCreatedOrderAction => ({
  type: CLEAR_CREATED_ORDER,
});
