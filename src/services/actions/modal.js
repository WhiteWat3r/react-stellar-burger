export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const ModalTypes = {
  ORDER_DETAILS: 'OrderDetails',
  INGREDIENT_DETAILS: 'IngredientDetails',
};

export const openModal = (modalType) => {
  return {
    type: OPEN_MODAL,
    payload: modalType,
  };
};

export const closeModal = () => {
  return {
    type: CLOSE_MODAL,
  };
};
