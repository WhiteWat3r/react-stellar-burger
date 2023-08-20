import { FC } from 'react';
import modalStyyles from './modal-overlay.module.css';

type TModalOverlayProps = {
  closeModal: () => void;
};

const ModalOverlay: FC<TModalOverlayProps> = ({ closeModal }) => {
  const onClick = () => {
    closeModal();
  };

  return <div className={modalStyyles.overlay} onClick={onClick}></div>;
};

export default ModalOverlay;
