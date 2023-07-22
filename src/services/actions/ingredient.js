
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

export const fetchIngredientsSuccess = (data) => {
  return {
    type: FETCH_INGREDIENTS_SUCCESS,
    payload: data,
  };
};

export const fetchIngredientsFailure = (error) => {
  return {
    type: FETCH_INGREDIENTS_FAILURE,
    payload: error,
  };
};

export const setCurrentIngredient = (ingredient) => ({
  type: SET_CURRENT_INGREDIENT,
  payload: ingredient,
});



export const sendOrderSuccess = (data) => {
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
