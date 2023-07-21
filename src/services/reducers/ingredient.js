import { data } from '../../utils/data';
import {
  ADD_CONSTRUCTOR_INGREDIENT,
  REMOVE_CONSTRUCTOR_INGREDIENT,
  UPDATE_CONSTRUCTOR_INGREDIENTS,
} from '../actions/burgerConstructor';
import {
  FETCH_INGREDIENTS_REQUEST,
  FETCH_INGREDIENTS_SUCCESS,
  FETCH_INGREDIENTS_FAILURE,
  SET_CURRENT_INGREDIENT,
  REPLACE_CONSTRUCTOR_BUN,
  SEND_ORDER_SUCCESS,
  SEND_ORDER_FAILURE,
} from '../actions/ingredient';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
  currentIngredient: null,
  createdOrder: [],
  orderNumber: null,
  orderStatus: false,
  constructorItems: [],
};

export const ingredientReducer = (state = initialState, action) => {
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
      console.log('asdasdasd');
      return {
        ...state,
        createdOrder: action.payload, //
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

    default:
      return state;
  }
};

export const addConstructorIngredient = (ingredient) => ({
  type: ADD_CONSTRUCTOR_INGREDIENT,
  payload: ingredient,
});

export const removeConstructorIngredient = (ingredient) => ({
  type: REMOVE_CONSTRUCTOR_INGREDIENT,
  payload: ingredient,
});

export const replaceConstructorBun = (ingredient, index) => ({
  type: REPLACE_CONSTRUCTOR_BUN,
  payload: ingredient,
  index,
});

export const updateConstructorIngredients = (ingredients) => ({
  type: UPDATE_CONSTRUCTOR_INGREDIENTS,
  payload: ingredients,
});
