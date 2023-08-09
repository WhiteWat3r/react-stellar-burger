import modalStyyles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

function ModalOverlay({ closeModal }) {
  const onClick = () => {
    closeModal();
  };

  return <div className={modalStyyles.overlay} onClick={onClick}></div>;
}

ModalOverlay.propTypes = {
  closeModal: PropTypes.func,
};

export default ModalOverlay;
