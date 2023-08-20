import { useEffect, FC, ReactNode} from 'react';
import ReactDOM from 'react-dom';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import modalStyles from './modal.module.css';
import ModalOverlay from '../overlay/modal-overlay';

const modalRoot = document.querySelector('#react-modal') as HTMLElement;

type TModal = {
  handleCloseModal: () => void;
  children: ReactNode;
};

const Modal: FC<TModal> = ({ handleCloseModal, children }) => {
  useEffect(() => {
    const closeOnEsc = (evt: KeyboardEvent) => {
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
};

export default Modal;
