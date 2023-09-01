import { CLOSE_MODAL, OPEN_MODAL, TModalActions } from '../../actions/modal';

export type ModalState = {
  isModalOpen: boolean;
};

export const initialState: ModalState = {
  isModalOpen: false,
};

export const modalReducer = function (state = initialState, action:TModalActions) {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        isModalOpen: true,
      };
    case CLOSE_MODAL:
      return {
        isModalOpen: false,
      };
    default:
      return state;
  }
};
