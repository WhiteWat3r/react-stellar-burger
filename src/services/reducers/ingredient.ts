import { Reducer } from 'redux';
import { TIngredient, TCreatedOrder} from '../types';

import {
  ADD_CONSTRUCTOR_INGREDIENT,
  CLEAR_CONSTRUCTOR,
  REMOVE_CONSTRUCTOR_INGREDIENT,
  UPDATE_CONSTRUCTOR_INGREDIENTS,
  REPLACE_CONSTRUCTOR_BUN,
} from '../actions/burgerConstructor';
import {
  FETCH_INGREDIENTS_REQUEST,
  FETCH_INGREDIENTS_SUCCESS,
  FETCH_INGREDIENTS_FAILURE,
  SET_CURRENT_INGREDIENT,
  SEND_ORDER_SUCCESS,
  SEND_ORDER_FAILURE,
} from '../actions/ingredient';



type IngredientState  = {
  items: TIngredient[];
  isLoading: boolean;
  error: null | string;
  currentIngredient: TIngredient | null;
  createdOrder: TCreatedOrder | null;
  orderNumber: string | null;
  orderStatus: boolean;
  constructorItems: TIngredient[];
};





const initialState:IngredientState = {
  items: [],
  isLoading: false,
  error: null,
  currentIngredient: null,
  createdOrder: null,  
  orderNumber: null,
  orderStatus: false,
  constructorItems: [],
};

export const ingredientReducer: Reducer<IngredientState> = function(state = initialState, action) {
  switch (action.type) {
    case FETCH_INGREDIENTS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_INGREDIENTS_SUCCESS:
      return {
        ...state,
        items: action.payload,
        isLoading: false,
        error: null,
      };
    case FETCH_INGREDIENTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case SET_CURRENT_INGREDIENT:
      return {
        ...state,
        currentIngredient: action.payload,
      };
    case ADD_CONSTRUCTOR_INGREDIENT:
      return {
        ...state,
        constructorItems: [...state.constructorItems, action.payload],
        items: state.items.map((item) => {
          if (item._id === action.payload._id) {
            if (item.type === 'bun') {
              return { ...item, __v: item.__v + 2 };
            } else return { ...item, __v: item.__v + 1 };
          }
          return item;
        }),
      };
    case REMOVE_CONSTRUCTOR_INGREDIENT:
      return {
        ...state,
        constructorItems: state.constructorItems.filter((item) => {
          return item !== action.payload;
        }),
        items: state.items.map((item) => {
          if (item._id === action.payload._id) {
            return { ...item, __v: item.__v - 1 };
          }
          return item;
        }),
      };

    case REPLACE_CONSTRUCTOR_BUN:
      return {
        ...state,
        constructorItems: state.constructorItems.map((item, index) => {
          if (index === action.index) {
            return action.payload;
          }
          return item;
        }),
        items: state.items.map((item) => {
          if (item._id === action.payload._id) {
            return { ...item, __v: (item.__v = 2) };
          }
          if (item._id === state.constructorItems[action.index]._id) {
            return { ...item, __v: item.__v - 2 };
          }
          return item;
        }),
      };

    case UPDATE_CONSTRUCTOR_INGREDIENTS:
      return {
        ...state,
        constructorItems: action.payload,
      };

    case SEND_ORDER_SUCCESS:
      return {
        ...state,
        createdOrder: action.payload, 
        orderNumber: action.payload.order.number,
        orderStatus: true,
      };

    case SEND_ORDER_FAILURE:
      return {
        ...state,
        createdOrder: null,
        orderNumber: null,
        orderStatus: false,
      };

    case CLEAR_CONSTRUCTOR:
      return {
        ...state,
        constructorItems: [],
        items: state.items.map((item) => {
          return { ...item, __v: 0 };
        }),
      };
    default:
      return state;
  }
};
