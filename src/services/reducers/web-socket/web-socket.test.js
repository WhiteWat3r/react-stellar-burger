import { initialState, wsReducer } from './web-socket';
import * as types from '../../actions/web-socket';
import { error, order, webSocketAnswer } from '../../../utils/dataTest';

describe('wsReducer', () => {
  test('изначальное состояние', () => {
    expect(wsReducer(undefined, {})).toEqual(initialState);
  });

  test('Инициализация соединения ', () => {
    const action = { type: types.WS_CONNECTION_SUCCESS };
    const nextState = wsReducer(initialState, action);
    expect(nextState).toEqual({
      ...nextState,
      error: undefined,
      wsConnected: true,
    });
  });

  test('Инициализация соединения в профиле пользователя', () => {
    const action = { type: types.WS_USER_CONNECTION_SUCCESS };
    const nextState = wsReducer(initialState, action);
    expect(nextState).toEqual({
      ...nextState,
      errorUser: undefined,
      wsUserConnected: true,
    });
  });

  test('Ошибка соединения ', () => {
    const action = { type: types.WS_CONNECTION_ERROR, payload: error };
    const nextState = wsReducer(initialState, action);
    expect(nextState).toEqual({
      ...nextState,
      error: action.payload,
      wsConnected: false,
    });
  });

  test('Ошибка соединения в профиле пользователя', () => {
    const action = { type: types.WS_USER_CONNECTION_ERROR, payload: error };
    const nextState = wsReducer(initialState, action);
    expect(nextState).toEqual({
      ...nextState,
      errorUser: action.payload,
      wsUserConnected: false,
    });
  });

  test('Закрытие соединения', () => {
    const action = { type: types.WS_CONNECTION_CLOSED };
    const nextState = wsReducer(initialState, action);
    expect(nextState).toEqual({
      ...nextState,
      error: undefined,
      wsConnected: false,
    });
  });

  test('Закрытие соединения в профиле пользователя', () => {
    const action = { type: types.WS_USER_CONNECTION_CLOSED };
    const nextState = wsReducer(initialState, action);
    expect(nextState).toEqual({
      ...nextState,
      errorUser: undefined,
      wsUserConnected: false,
    });
  });

  test('Получение списка заказов', () => {
    const action = { type: types.WS_GET_FEED, payload: webSocketAnswer };
    const nextState = wsReducer(initialState, action);
    expect(nextState).toEqual({
      ...nextState,
      error: undefined,
      feed: action.payload,
    });
  });
  test('Получение списка заказов в профиле пользователя', () => {
    const action = { type: types.WS_USER_GET_FEED, payload: webSocketAnswer };
    const nextState = wsReducer(initialState, action);
    expect(nextState).toEqual({
      ...nextState,
      error: undefined,
      feedUser: action.payload,
    });
  });
});
