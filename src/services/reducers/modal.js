import { CLOSE_MODAL, OPEN_MODAL } from '../actions/modal';

const initialState = {
  isModalOpen: false,
  currentModal: null,
};

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        isModalOpen: true,
        // currentModal: action.payload,
      };
    case CLOSE_MODAL:
      return {
        isModalOpen: false,
        // currentModal: null,
      };
    default:
      return state;
  }
};
