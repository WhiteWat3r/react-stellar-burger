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

export const login = (email, password) => {
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

        // localStorage.setItem('accessToken', response.accessToken);
        dispatch(loginSuccess(response.user));
      }
    } catch (error) {
      console.error('Ошибка при авторизации:', error);
      dispatch(loginFailed(error));
    }
  };
};

export const logout = () => {
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

        // localStorage.setItem('accessToken', response.accessToken);
      }
    } catch (error) {
      console.error('Ошибка при выходе из аккаунта', error);
    }
  };
};

export const refreshToken = () => {
  return async (dispatch) => {
    try {
      const refreshToken = getCookie('refreshToken');
      console.log(2);
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
  return async (dispatch) => {
    try {

      const response = await authRequest('/auth/user');

      if (response.success) {
        dispatch(getUserDataSuccess(response.user));
      }
    } catch (error) {
      console.log('3');
      console.log(error);
      // console.log(response);
      // if (error.message === 'jwt expired') {

      try {
        await dispatch(refreshToken());
        const updatedResponse = await authRequest('/auth/user');
        if (updatedResponse.success) {
          dispatch(getUserDataSuccess(updatedResponse.user));
        }
      } catch (refreshError) {
        console.error('Ошибка при обновлении токена:', refreshError);
      }
      // }
    }
  };
};

export const setUserData = (name, email) => {
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

export const register = (email, password, name) => {
  return async (dispatch) => {
    dispatch(registerStart());
    try {
      const response = await authRequest('/auth/register', 'POST', {
        email,
        password,
        name,
      });

      if (response.success) {
        // const accessToken = response.accessToken.split('Bearer ')[1];

        // setCookie('accessToken', accessToken);
        // setCookie('refreshToken', response.refreshToken);

        dispatch(registerSuccess());
        // console.log('успех');
        return { success: true };

        // console.log(response);
      }
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      dispatch(registerFailed(error));
      return { error: true };
    }
  };
};

export const forgotPassword = (email) => {
  return async (dispatch) => {
    dispatch(forgotPasswordStart());

    try {
      const response = await authRequest('/password-reset', 'POST', {
        email,
      });

      if (response.success) {
        dispatch(forgotPasswordSuccess());
        return { success: true };
      }
    } catch (error) {
      console.error('Ошибка при восстановлении пароля:', error);
      dispatch(forgotPasswordFailed(error));
      return { error: true };
    }
  };
};

export const resetPassword = (password, token) => {
  return async (dispatch) => {
    dispatch(resetPasswordStart());

    try {
      const response = await authRequest('/password-reset/reset', 'POST', {
        password,
        token,
      });

      if (response.success) {
        dispatch(resetPasswordSuccess());
        return { success: true };
      }
    } catch (error) {
      dispatch(resetPasswordFailed(error));


      console.error('Ошибка при восстановлении пароля:', error);
      return { error: true };
    }
  };
};
