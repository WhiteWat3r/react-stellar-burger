import { authReducer, initialState } from './auth';
import * as types from '../../actions/auth';
import { error, user } from '../../../utils/dataTest';




describe('Auth reducer', () => {
  test('изначальное состояние', () => {
    expect(authReducer(undefined, {})).toEqual(initialState);
  });

  test('Запрос на авторизацию', () => {
    const action = { type: types.LOGIN_START };
    const nextState = authReducer(initialState, action);
    expect(nextState.authProcess).toBe(true);
  });

  test('Успешная авторизация', () => {
    const action = { type: types.LOGIN_SUCCESS, payload: user };
    const nextState = authReducer(initialState, action);
    expect(nextState).toEqual({
      ...nextState,
      user: action.payload,
      isAuthenticated: true,
      authProcess: false,
    });
  });

  test('Ошибка авторизации', () => {
    const action = { type: types.LOGIN_FAILED, payload: error };
    const nextState = authReducer(initialState, action);
    expect(nextState).toEqual({
      ...nextState,
      authProcess: false,
      loginError: action.payload,
    });
  });

  test('Запрос на регистрацию', () => {
    const action = { type: types.REGISTER_START };
    const nextState = authReducer(initialState, action);
    expect(nextState.authProcess).toBe(true);
  });

  test('Успешная регистрация', () => {
    const action = { type: types.REGISTER_SUCCESS };
    const nextState = authReducer(initialState, action);
    expect(nextState.authProcess).toBe(false);
  });

  test('Ошибка регистрации', () => {
    const action = { type: types.REGISTER_FAILED, payload: error };
    const nextState = authReducer(initialState, action);
    expect(nextState).toEqual({
      ...nextState,
      authProcess: false,
      error: action.payload,
    });
  });

  test('Запрос на деавторизацию', () => {
    const action = { type: types.LOGOUT_START };
    const nextState = authReducer(initialState, action);
    expect(nextState.authProcess).toBe(true);
  });

  test('Успешная деавторизация', () => {
    const action = { type: types.LOGOUT_SUCCESS };
    const nextState = authReducer(initialState, action);
    expect(nextState).toEqual({
      ...nextState,
      user: null,
      isAuthenticated: false,
      authProcess: false,
    });
  });

  test('Получение информации о пользователе', () => {
    const action = { type: types.GET_USER_DATA, payload: user };
    const nextState = authReducer(initialState, action);
    expect(nextState).toEqual({
      ...nextState,
      user: action.payload,
      isAuthenticated: true,
    });
  });

  test('Запрос на восстановление пароля', () => {
    const action = { type: types.RESET_PASSWORD_START };
    const nextState = authReducer(initialState, action);
    expect(nextState.authProcess).toBe(true);
  });

  test('Успешное восстановление пароля', () => {
    const action = { type: types.FORGOT_PASSWORD_SUCCESS };
    const nextState = authReducer(initialState, action);
    expect(nextState.authProcess).toBe(false);
  });

  test('Ошибка восстановление пароля', () => {
    const action = { type: types.FORGOT_PASSWORD_FAILED, payload: error };
    const nextState = authReducer(initialState, action);
    expect(nextState).toEqual({
      ...nextState,
      authProcess: false,
      forgotPasswordError: action.payload,
    });
  });

  test('Запрос на подтверждение нового пароля', () => {
    const action = { type: types.FORGOT_PASSWORD_START };
    const nextState = authReducer(initialState, action);
    expect(nextState.authProcess).toBe(true);
  });

  test('Успешное подтверждение восстановления пароля', () => {
    const action = { type: types.FORGOT_PASSWORD_SUCCESS };
    const nextState = authReducer(initialState, action);
    expect(nextState.authProcess).toBe(false);
  });

  test('Ошибка подтверждения восстановления пароля', () => {
    const action = { type: types.RESET_PASSWORD_FAILED, payload: error };
    const nextState = authReducer(initialState, action);
    expect(nextState).toEqual({
      ...nextState,
      authProcess: false,
      resetPasswordError: action.payload,
    });
  });
});
