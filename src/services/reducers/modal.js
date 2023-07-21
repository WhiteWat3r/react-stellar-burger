import IngredientDetails from '../../components/ingredientDetails/ingredientDetails';
import OrderDetails from '../../components/orderDetails/orderDetails';
import { CLOSE_MODAL, OPEN_MODAL, ModalTypes } from '../actions/modal';

const initialState = {
  isModalOpen: false,
  currentModal: null,
};

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        isModalOpen: true,
        currentModal: action.payload,
      };
    case CLOSE_MODAL:
      return {
        isModalOpen: false,
        currentModal: null,
      };
    default:
      return state;
  }
};

export const getModalComponent = (currentModal) => {
  switch (currentModal) {
    case ModalTypes.INGREDIENT_DETAILS:
      return IngredientDetails;
    case ModalTypes.ORDER_DETAILS:
      return OrderDetails;
    default:
      return null;
  }
};
