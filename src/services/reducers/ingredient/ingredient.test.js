import { ingredientReducer, initialState } from './ingredient';
import * as types from '../../actions/ingredient';
import { data, error, ingredient, order, orderAnswer } from '../../../utils/dataTest';

describe('Ingredient reducer', () => {
  test('изначальное состояние', () => {
    expect(ingredientReducer(undefined, {})).toEqual(initialState);
  });

  test('Очистка конструктора', () => {
    const action = { type: types.CLEAR_CONSTRUCTOR };
    const nextState = ingredientReducer(initialState, action);
    expect(nextState).toEqual({
      ...nextState,
      constructorItems: [],
      items: nextState.items.map((item) => {
        return { ...item, __v: 0 };
      }),
    });
  });

  test('Запрос на получение ингредиентов ', () => {
    const action = { type: types.FETCH_INGREDIENTS_REQUEST };
    const nextState = ingredientReducer(initialState, action);
    expect(nextState).toEqual({
      ...nextState,
      isLoading: true,
      error: null,
    });
  });

  test('Успешное получение ингредиентов ', () => {
    const action = { type: types.FETCH_INGREDIENTS_SUCCESS, payload: data };
    const nextState = ingredientReducer(initialState, action);
    expect(nextState).toEqual({
      ...nextState,
      items: action.payload,
      isLoading: false,
      error: null,
    });
  });

  test('Ошибка получения ингредиентов ', () => {
    const action = { type: types.FETCH_INGREDIENTS_FAILURE, payload: error };
    const nextState = ingredientReducer(initialState, action);
    expect(nextState).toEqual({
      ...nextState,
      isLoading: false,
      error: action.payload,
    });
  });

  test('Выбор текущего игредиента', () => {
    const action = { type: types.SET_CURRENT_INGREDIENT, payload: ingredient };
    const nextState = ingredientReducer(initialState, action);
    expect(nextState.currentIngredient).toBe(action.payload);
  });

  test('Успешная отправка заказа', () => {
    const action = { type: types.SEND_ORDER_SUCCESS, payload: orderAnswer };
    const nextState = ingredientReducer(initialState, action);
    expect(nextState).toEqual({
      ...nextState,
      createdOrder: action.payload,
      orderNumber: action.payload.order.number,
      orderStatus: true,
    });
  });

  test('Ошибка отправки заказа', () => {
    const action = { type: types.SEND_ORDER_FAILURE };
    const nextState = ingredientReducer(initialState, action);
    expect(nextState).toEqual({
      ...nextState,
      createdOrder: null,
      orderNumber: null,
      orderStatus: false,
    });
  });

  test('Выбор текущего заказа', () => {
    const action = { type: types.SET_CURRENT_ORDER, payload: order };
    const nextState = ingredientReducer(initialState, action);
    expect(nextState.currentOrder).toBe(action.payload);
  });

  test('Очистка созданного заказа', () => {
    const action = { type: types.CLEAR_CREATED_ORDER };
    const nextState = ingredientReducer(initialState, action);
    expect(nextState).toEqual({
      ...nextState,
      createdOrder: null,
      orderNumber: null,
    });
  });
});
