import {
  TIngredientsActions,
  clearCreatedOrder,
  fetchIngredientsFailure,
  fetchIngredientsRequest,
  fetchIngredientsSuccess,
  getOrderInfoSuccess,
  // getOrderInfoSuccess,
  sendOrderFailure,
  sendOrderSuccess,
  setCurrentOrder,
} from '../services/actions/ingredient';

import { authRequest, request } from './request';
import { config } from './constants';
import { clearConstructor } from '../services/actions/ingredient';
import { TModalActions, openModal } from '../services/actions/modal';
import { getCookie, setCookie } from './cookie';
import {
  TAuthActions,
  forgotPasswordFailed,
  forgotPasswordStart,
  forgotPasswordSuccess,
  getUserDataSuccess,
  loginFailed,
  loginStart,
  loginSuccess,
  logoutStart,
  logoutSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
  resetPasswordFailed,
  resetPasswordStart,
  resetPasswordSuccess,
} from '../services/actions/auth';
import { AppDispatch, RootState } from '../services/reducers';
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';




export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  TAuthActions | TIngredientsActions | TModalActions
>





export const getIngredients = () => {
  return (dispatch: AppDispatch) => {
    dispatch(fetchIngredientsRequest());
    request('/ingredients')
      .then((data) => {
        dispatch(fetchIngredientsSuccess(data.data));
      })
      .catch((error) => dispatch(fetchIngredientsFailure(error)));
  };
};




export const getOrderInfo = (number: number) => {
  return (dispatch: AppDispatch) => {
  authRequest(`/orders/${number}`)
      .then((data) => {
        console.log(data.orders[0]);
        
        dispatch(setCurrentOrder(data.orders[0]));
      })
      .catch((error) => dispatch(fetchIngredientsFailure(error)));
  };
};



export const sendOrder = (order: {
  ingredients: string[];
}): AppThunk => {
  return (dispatch) => {
    const ingredients = order.ingredients;
    dispatch(clearCreatedOrder());
    dispatch(openModal());

    authRequest('/orders', 'POST', { ingredients })
      .then((data) => {
        dispatch(sendOrderSuccess(data));
        dispatch(clearConstructor());
      })
      .catch((error) => dispatch(sendOrderFailure()));
  };
};

export const login = (
  email: string,
  password: string,
): AppThunk => {
  return async (dispatch) => {
    dispatch(loginStart());

    try {
      const response = await authRequest('/auth/login', 'POST', {
        email,
        password,
      });

      if (response.success) {
        const accessToken = response.accessToken.split('Bearer ')[1];
        setCookie('refreshToken', response.refreshToken);

        setCookie('accessToken', accessToken);

        dispatch(loginSuccess(response.user));
      }
    } catch (error) {
      console.error('Ошибка при авторизации:', error);
      dispatch(loginFailed(error));
    }
  };
};

export const logout = (): AppThunk=> {
  return async (dispatch) => {
    dispatch(logoutStart());
    try {
      const refreshToken = getCookie('refreshToken');
      const response = await authRequest('/auth/logout', 'POST', {
        token: refreshToken,
      });

      if (response.success) {
        setCookie('refreshToken', '');

        setCookie('accessToken', '');

        dispatch(logoutSuccess());
      }
    } catch (error) {
      console.error('Ошибка при выходе из аккаунта', error);
    }
  };
};

export const refreshToken = (): AppThunk => {
  return async () => {
    try {
      const refreshToken = getCookie('refreshToken');
      const response = await authRequest('/auth/token', 'POST', {
        token: refreshToken,
      });

      if (response.success) {
        const accessToken = response.accessToken.split('Bearer ')[1];
        setCookie('refreshToken', response.refreshToken);

        setCookie('accessToken', accessToken);
      }
    } catch (error) {
      console.error('Ошибка при обновлении токена:', error);
    }
  };
};

export const getUserData = (): AppThunk => {
  return async (dispatch) => {
    try {
      const response = await authRequest('/auth/user');

      if (response.success) {
        dispatch(getUserDataSuccess(response.user));
      }
    } catch (error) {
      if ((error = 'jwt expired')) {
        try {
          await dispatch(refreshToken());
          const updatedResponse = await authRequest('/auth/user');
          if (updatedResponse.success) {
            dispatch(getUserDataSuccess(updatedResponse.user));
          }
        } catch (refreshError) {
          console.error('Ошибка при обновлении токена:', refreshError);
        }
      }
    }
  };
};

export const setUserData = (
  name: string,
  email: string,
): AppThunk => {
  return async (dispatch) => {
    try {
      const response = await authRequest('/auth/user', 'PATCH', {
        email,
        name,
      });

      if (response.success) {
        dispatch(getUserDataSuccess(response.user));
      }
    } catch (error) {
      console.error('Ошибка при обновлении токена:', error);
    }
  };
};

export const register = (
  email: string,
  password: string,
  name: string,
): AppThunk<Promise<undefined>>  => {
  return async (dispatch) => {
    dispatch(registerStart());
    try {
      const response = await authRequest('/auth/register', 'POST', {
        email,
        password,
        name,
      });

      if (response.success) {
        dispatch(registerSuccess());
      }
      return undefined;

    } catch (error) {
      dispatch(registerFailed(error));
      throw error;
    }
  };
};

export const forgotPassword = (email: string): AppThunk => {
  return async (dispatch) => {
    dispatch(forgotPasswordStart());

    try {
      const response = await authRequest('/password-reset', 'POST', {
        email,
      });

      if (response.success) {
        dispatch(forgotPasswordSuccess());
      }
    } catch (error) {
      console.error('Ошибка при восстановлении пароля:', error);
      dispatch(forgotPasswordFailed(error));
    }
    return {};
  };
};

export const resetPassword = (
  password: string,
  token: string,
): AppThunk<Promise<undefined>> => {
  return async (dispatch) => {
    dispatch(resetPasswordStart());

    try {
      const response = await authRequest('/password-reset/reset', 'POST', {
        password,
        token,
      });

      if (response.success) {
        dispatch(resetPasswordSuccess());
      }
      return undefined;
    } catch (error) {
      dispatch(resetPasswordFailed(error));
      throw error;
    }
  };
};
