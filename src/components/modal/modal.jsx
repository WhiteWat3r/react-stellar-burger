import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import modalStyles from './modal.module.css';
import ModalOverlay from '../overlay/modal-overlay';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../services/actions/modal';

const modalRoot = document.querySelector('#react-modal');

function Modal({ handleCloseModal, children }) {
  useEffect(() => {
    const closeOnEsc = (evt) => {
      if (evt.code === 'Escape') {
        handleCloseModal();
      }
    };

    document.addEventListener('keydown', closeOnEsc);

    return () => document.removeEventListener('keydown', closeOnEsc);
  }, []);

  return ReactDOM.createPortal(
    <>
      <div className={modalStyles.modal}>
        <div className={modalStyles.closeButton}>
          <CloseIcon type="primary" onClick={handleCloseModal} />
        </div>
        {children}
      </div>
      <ModalOverlay closeModal={handleCloseModal} />
    </>,
    modalRoot,
  );
}

Modal.propTypes = {
  handleCloseModal: PropTypes.func,
};

export default Modal;
