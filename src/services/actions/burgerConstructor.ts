import { v4 as uuidv4 } from 'uuid';
import { Action } from 'redux';
import { TIngredient } from '../types';

export const ADD_CONSTRUCTOR_INGREDIENT = 'ADD_INGRIEDIENT';
export const REMOVE_CONSTRUCTOR_INGREDIENT = 'REMOVE_INGRIEDIENT';
export const UPDATE_CONSTRUCTOR_INGREDIENTS = 'UPDATE_CONSTRUCTOR_INGREDIENTS';
export const REPLACE_CONSTRUCTOR_BUN = 'REPLACE_CONSTRUCTOR_BUN';
export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR';

type AddConstructorIngredientAction = Action<typeof ADD_CONSTRUCTOR_INGREDIENT> & {
  payload: TIngredient & { uniqueId: string };
};

type RemoveConstructorIngredientAction = Action<typeof REMOVE_CONSTRUCTOR_INGREDIENT> & {
  payload: TIngredient;
};

type ReplaceConstructorBunAction = Action<typeof REPLACE_CONSTRUCTOR_BUN> & {
  payload: TIngredient;
  index: number;
};

type UpdateConstructorIngredientsAction = Action<typeof UPDATE_CONSTRUCTOR_INGREDIENTS> & {
  payload: TIngredient[];
};

type ClearConstructorAction = Action<typeof CLEAR_CONSTRUCTOR>;

export type ConstructorActionTypes =
  | AddConstructorIngredientAction
  | RemoveConstructorIngredientAction
  | ReplaceConstructorBunAction
  | UpdateConstructorIngredientsAction
  | ClearConstructorAction;

export const addConstructorIngredient = (
  ingredient: TIngredient,
): AddConstructorIngredientAction => ({
  type: ADD_CONSTRUCTOR_INGREDIENT,
  payload: {
    ...ingredient,
    uniqueId: uuidv4(),
  },
});

export const removeConstructorIngredient = (
  ingredient: TIngredient,
): RemoveConstructorIngredientAction => ({
  type: REMOVE_CONSTRUCTOR_INGREDIENT,
  payload: ingredient,
});

export const replaceConstructorBun = (
  ingredient: TIngredient,
  index: number,
): ReplaceConstructorBunAction => ({
  type: REPLACE_CONSTRUCTOR_BUN,
  payload: ingredient,
  index,
});

export const updateConstructorIngredients = (
  ingredients: TIngredient[],
): UpdateConstructorIngredientsAction => ({
  type: UPDATE_CONSTRUCTOR_INGREDIENTS,
  payload: ingredients,
});

export const clearConstructor = (): ClearConstructorAction => ({
  type: CLEAR_CONSTRUCTOR,
});
