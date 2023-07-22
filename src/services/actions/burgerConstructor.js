import { v4 as uuidv4 } from 'uuid';

export const ADD_CONSTRUCTOR_INGREDIENT = 'ADD_INGRIEDIENT';
export const REMOVE_CONSTRUCTOR_INGREDIENT = 'REMOVE_INGRIEDIENT';
export const UPDATE_CONSTRUCTOR_INGREDIENTS = 'UPDATE_CONSTRUCTOR_INGREDIENTS';
export const REPLACE_CONSTRUCTOR_BUN = 'REPLACE_CONSTRUCTOR_BUN';
export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR';

export const addConstructorIngredient = (ingredient) => ({
  type: ADD_CONSTRUCTOR_INGREDIENT,
  payload: {
    ...ingredient,
    uniqueId: uuidv4(),
  },
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

export const clearConstructor = () => ({
  type: CLEAR_CONSTRUCTOR,
});
