export const fetchUrl = 'https://norma.nomoreparties.space/api/ingredients';
export const postUrl = 'https://norma.nomoreparties.space/api/orders';

export const FETCH_INGREDIENTS_REQUEST = 'FETCH_INGREDIENTS_REQUEST';
export const FETCH_INGREDIENTS_SUCCESS = 'FETCH_INGREDIENTS_SUCCESS';
export const FETCH_INGREDIENTS_FAILURE = 'FETCH_INGREDIENTS_FAILURE';

export const SEND_ORDER_REQUEST = 'SEND_ORDER_REQUEST';
export const SEND_ORDER_SUCCESS = 'SEND_ORDER_SUCCESS';
export const SEND_ORDER_FAILURE = 'SEND_ORDER_FAILURE';

export const SET_CURRENT_INGREDIENT = 'SET_CURRENT_INGREDIENT';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';

export const fetchIngredients = () => {
  return (dispatch) => {
    dispatch(fetchIngredientsRequest());
    fetch(fetchUrl)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(`Ошибка: ${res.status}`);
      })
      .then((data) => dispatch(fetchIngredientsSuccess(data.data)))
      .catch((error) => dispatch(fetchIngredientsFailure(error)));
  };
};

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

export const sendOrder = (order) => {
  return (dispatch) => {
    fetch(postUrl, {
      method: 'POST',
      body: JSON.stringify(order),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(`Ошибка: ${res.status}`);
      })
      .then((data) => dispatch(sendOrderSuccess(data)))
      .catch((error) => dispatch(sendOrderFailure(error)));
  };
};

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
