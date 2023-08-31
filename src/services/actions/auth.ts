import { Action } from 'redux';
import { TUser } from '../types';

export type ActionWithPayload<T extends string, P> = Action<T> & {
  payload: P;
};

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT';
export const GET_USER_DATA = 'GET_USER_DATA';
export const LOGOUT_START = 'LOGOUT_START';
export const LOGIN_START = 'LOGIN_START';
export const REGISTER_START = 'REGISTER_START';
export const REGISTER_FAILED = 'REGISTER_FAILED';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const FORGOT_PASSWORD_START = 'FORGOT_PASSWORD_START';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';
export const RESET_PASSWORD_START = 'RESET_PASSWORD_START';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';
export const CLEAR_EROR_FIELDS = 'CLEAR_EROR_FIELDS';
export const SET_LOADING_DATA_START = 'SET_LOADING_DATA_START'
export const SET_LOADING_DATA_FINISH = 'SET_LOADING_DATA_FINISH'


export type TLoginStartAction = {
  readonly type: typeof LOGIN_START;
};
export type TLoadingDataFinish= {
  readonly type: typeof SET_LOADING_DATA_FINISH;
};

export type TLoadingDataStart = {
  readonly type: typeof SET_LOADING_DATA_START;
};
export type TLoginSuccessAction = {
  readonly type: typeof LOGIN_SUCCESS;
  readonly payload: TUser;
};

export type TLoginFailedAction = {
  readonly type: typeof LOGIN_FAILED;
  readonly payload: string | unknown;
};

export type TRegisterStartAction = {
  readonly type: typeof REGISTER_START;
};

export type TRegisterFailedAction = {
  readonly type: typeof REGISTER_FAILED;
  readonly payload: string | unknown;
};

export type TRegisterSuccessAction = {
  readonly type: typeof REGISTER_SUCCESS;
};

export type TLogoutStartAction = {
  readonly type: typeof LOGOUT_START;
};

export type TLogoutSuccessAction = {
  readonly type: typeof LOGOUT_SUCCESS;
};

export type TGetUserDataSuccessAction = {
  readonly type: typeof GET_USER_DATA;
  readonly payload: TUser;
};

export type TForgotPasswordStartAction = {
  readonly type: typeof FORGOT_PASSWORD_START;
};

export type TForgotPasswordSuccessAction = {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
};

export type TForgotPasswordFailedAction = {
  readonly type: typeof FORGOT_PASSWORD_FAILED;
  readonly payload: string | unknown
};

export type TClearErrorFieldsAction = {
  readonly type: typeof CLEAR_EROR_FIELDS;
  
};

export type TResetPasswordStartAction = {
  readonly type: typeof RESET_PASSWORD_START;
};

export type TResetPasswordSuccessAction = {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
};

export type TResetPasswordFailedAction = {
  readonly type: typeof RESET_PASSWORD_FAILED;
  readonly payload: string | unknown;
};

export type TAuthActions =
  | TLoginStartAction
  | TLoginSuccessAction
  | TLoginFailedAction
  | TRegisterStartAction
  | TRegisterFailedAction
  | TRegisterSuccessAction
  | TLogoutStartAction
  | TLogoutSuccessAction
  | TGetUserDataSuccessAction
  | TForgotPasswordStartAction
  | TForgotPasswordSuccessAction
  | TForgotPasswordFailedAction
  | TClearErrorFieldsAction
  | TResetPasswordStartAction
  | TResetPasswordSuccessAction
  | TResetPasswordFailedAction
  | TLoadingDataStart
  | TLoadingDataFinish

export const loginStart = (): TLoginStartAction => {
  return {
    type: LOGIN_START,
  };
};

export const loginSuccess = (userData: TUser): TLoginSuccessAction => {
  return {
    type: LOGIN_SUCCESS,
    payload: userData,
  };
};

export const loginFailed = (error: string | unknown): TLoginFailedAction => {
  return {
    type: LOGIN_FAILED,
    payload: error,
  };
};

export const registerStart = (): TRegisterStartAction => {
  return {
    type: REGISTER_START,
  };
};

export const registerFailed = (error: string | unknown): TRegisterFailedAction => {
  return {
    type: REGISTER_FAILED,
    payload: error,
  };
};

export const registerSuccess = (): TRegisterSuccessAction => {
  return {
    type: REGISTER_SUCCESS,
  };
};

export const logoutStart = (): TLogoutStartAction => {
  return {
    type: LOGOUT_START,
  };
};

export const logoutSuccess = (): TLogoutSuccessAction => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

export const getUserDataSuccess = (userData: TUser): TGetUserDataSuccessAction => {
  return {
    type: GET_USER_DATA,
    payload: userData,
  };
};

export const forgotPasswordStart = (): TForgotPasswordStartAction => {
  return {
    type: FORGOT_PASSWORD_START,
  };
};

export const forgotPasswordSuccess = (): TForgotPasswordSuccessAction => {
  return {
    type: FORGOT_PASSWORD_SUCCESS,
  };
};

export const forgotPasswordFailed = (error: string | unknown): TForgotPasswordFailedAction => {
  return {
    type: FORGOT_PASSWORD_FAILED,
    payload: error
  };
};


export const resetPasswordStart = (): TResetPasswordStartAction => {
  return {
    type: RESET_PASSWORD_START,
  };
};

export const resetPasswordSuccess = (): TResetPasswordSuccessAction => {
  return {
    type: RESET_PASSWORD_SUCCESS,
  };
};

export const resetPasswordFailed = (error: string | unknown): TResetPasswordFailedAction => {
  return {
    type: RESET_PASSWORD_FAILED,
    payload: error,
  };
};





export const setLoadinDataStart = (): TLoadingDataStart => {
  return {
    type: SET_LOADING_DATA_START,
  };
};



export const setLoadinDataFinish = (): TLoadingDataFinish => {
  return {
    type: SET_LOADING_DATA_FINISH,
  };
};