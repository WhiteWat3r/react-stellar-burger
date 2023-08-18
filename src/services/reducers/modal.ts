import { Reducer } from 'redux';
import { CLOSE_MODAL, OPEN_MODAL } from '../actions/modal';

export type ModalState = {
  isModalOpen: boolean;
};

const initialState: ModalState = {
  isModalOpen: false,
};

export const modalReducer: Reducer<ModalState> = function (state = initialState, action) {
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
