import modalStyyles from './overlay.module.css'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const modalRoot = document.querySelector('#react-modal')

function Overlay({setIsModalOpen}) {

  const onClick = () => {
    setIsModalOpen(false)
  }

  return ReactDOM.createPortal (
    (    
    <div className={modalStyyles.overlay} onClick={onClick}>
    </div>
    ), modalRoot
  )
}


Overlay.propTypes = {
  setIsModalOpen: PropTypes.func
}



export default Overlay 
