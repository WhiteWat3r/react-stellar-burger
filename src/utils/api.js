import {
  fetchIngredientsFailure,
  fetchIngredientsRequest,
  fetchIngredientsSuccess,
  sendOrderFailure,
  sendOrderSuccess,
} from '../services/actions/ingredient';

import { request } from './request';
import { config } from './constants';
import { clearConstructor } from '../services/actions/burgerConstructor';
import { openModal } from '../services/actions/modal';

export const getIngredients = () => {
  return (dispatch) => {
    dispatch(fetchIngredientsRequest());
    request('/ingredients')
      .then((data) => dispatch(fetchIngredientsSuccess(data.data)))
      .catch((error) => dispatch(fetchIngredientsFailure(error)));
  };
};

export const sendOrder = (order) => {
  return (dispatch) => {
    request('/orders', {
      method: 'POST',
      body: JSON.stringify(order),
      headers: config.headers,
    })
      .then((data) => {
        dispatch(sendOrderSuccess(data));
        dispatch(openModal('OrderDetails'));
        dispatch(clearConstructor());
      })
      .catch((error) => dispatch(sendOrderFailure(error)));
  };
};
