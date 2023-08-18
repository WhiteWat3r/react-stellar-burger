import { AnyAction, Dispatch } from 'redux';

import {
  fetchIngredientsFailure,
  fetchIngredientsRequest,
  fetchIngredientsSuccess,
  sendOrderFailure,
  sendOrderSuccess,
} from '../services/actions/ingredient';

import { authRequest, request } from './request';
import { config } from './constants';
import { clearConstructor } from '../services/actions/burgerConstructor';
import { openModal } from '../services/actions/modal';
import { getCookie, setCookie } from './cookie';
import {
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
import { RootState } from '../services/reducers';
import { ThunkDispatch } from 'redux-thunk';

export const getIngredients = () => {
  return (dispatch: Dispatch) => {
    dispatch(fetchIngredientsRequest());
    request('/ingredients')
      .then((data) => dispatch(fetchIngredientsSuccess(data.data)))
      .catch((error) => dispatch(fetchIngredientsFailure(error)));
  };
};

export const sendOrder = (order: { ingredients: string[] }) => {
  return (dispatch: Dispatch) => {
    request('/orders', {
      method: 'POST',
      body: JSON.stringify(order),
      headers: config.headers,
    })
      .then((data) => {
        dispatch(sendOrderSuccess(data));
        dispatch(openModal());
        dispatch(clearConstructor());
      })
      .catch((error) => dispatch(sendOrderFailure()));
  };
};

export const login = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {
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

export const logout = () => {
  return async (dispatch: Dispatch) => {
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

export const refreshToken = () => {
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

export const getUserData = () => {
  return async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => {
    try {
      const response = await authRequest('/auth/user');

      if (response.success) {
        dispatch(getUserDataSuccess(response.user));
      }

        
    } catch (error) {
      console.log('error', error);
      if (error = 'jwt expired') {

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

export const setUserData = (name: string, email: string) => {
  return async (dispatch: Dispatch) => {
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

export const register = (email: string, password: string, name: string) => {
  return async (dispatch: Dispatch) => {
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
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      dispatch(registerFailed(error));
      return { error };
    }
  };
};

export const forgotPassword = (email: string) => {
  return async (dispatch: Dispatch) => {
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
      dispatch(forgotPasswordFailed());
    }
    return {};
  };
};

export const resetPassword = (password: string, token: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(resetPasswordStart());

    try {
      const response = await authRequest('/password-reset/reset', 'POST', {
        password,
        token,
      });

      if (response.success) {
        dispatch(resetPasswordSuccess());
      }
    } catch (error) {
      dispatch(resetPasswordFailed(error));

      console.error('Ошибка при восстановлении пароля:', error);
      return { error };
    }
  };
};
