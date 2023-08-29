import { Reducer } from 'redux';
import { TUser } from '../../types';

import {
  GET_USER_DATA,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGOUT_START,
  REGISTER_SUCCESS,
  REGISTER_START,
  LOGIN_START,
  REGISTER_FAILED,
  LOGIN_FAILED,
  FORGOT_PASSWORD_START,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  RESET_PASSWORD_START,
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_SUCCESS,
  TAuthActions,
} from '../../actions/auth';

export type AuthState = {
  user: TUser | null;
  isAuthenticated: boolean;
  authProcess: boolean;
  error: string | unknown;
  loginError: string | unknown;
  forgotPasswordError: string | unknown;
  resetPasswordError: string | unknown;
};

export const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  authProcess: false,
  error: '',
  loginError: '',
  forgotPasswordError: '',
  resetPasswordError: '',
};

export const authReducer = function (state = initialState, action:TAuthActions): AuthState {
  switch (action.type) {
    case RESET_PASSWORD_START:
    case FORGOT_PASSWORD_START:
    case REGISTER_START:
    case LOGIN_START:
    case LOGOUT_START:
      return {
        ...state,
        authProcess: true,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        authProcess: false
         };

    case REGISTER_SUCCESS:
      return {
        ...state,
        authProcess: false      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        authProcess: false      };

    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        authProcess: false      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        authProcess: false,
      };

    case GET_USER_DATA:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };

    case FORGOT_PASSWORD_FAILED:
      return {
        ...state,
        authProcess: false,
        forgotPasswordError: action.payload,
      };

    case RESET_PASSWORD_FAILED:
      return {
        ...state,
        authProcess: false,
        resetPasswordError: action.payload,
      };

    case LOGIN_FAILED:
      return {
        ...state,
        authProcess: false,
        loginError: action.payload,
      };
    case REGISTER_FAILED:
      return {
        ...state,
        authProcess: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
