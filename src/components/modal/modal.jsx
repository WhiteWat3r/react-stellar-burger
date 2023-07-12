import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import IngredientDetails from '../ingredientDetails/ingredientDetails'
import OrderDetails from '../orderDetails/orderDetails'

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import modalStyles from './modal.module.css';
import ModalOverlay from '../overlay/modalOverlay'

const modalRoot = document.querySelector('#react-modal')

function Modal({children, closeModal}) {


  useEffect(() => {
    const closeOnEsc = (evt) => {
      if (evt.code === "Escape") {
        closeModal()
      }
    }

    document.addEventListener('keydown', closeOnEsc)

    return () => document.removeEventListener('keydown', closeOnEsc)
  }, [])
  
  return ReactDOM.createPortal (
    <>
      <div className={modalStyles.modal}>
        <div className={modalStyles.closeButton}>
          <CloseIcon type="primary" onClick={closeModal} />
        </div>
        {children}
      </div>
      <ModalOverlay closeModal={closeModal} />
    </>,
    modalRoot
  )
}




Modal.propTypes = {
  closeModal: PropTypes.func
}


export default Modal 




