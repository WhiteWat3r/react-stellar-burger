import React from 'react'
import PropTypes from 'prop-types'

import orderDetailsStyles from './orderDetails.module.css'
import doneImage from '../../images/done1.png'

function OrderDetails() {

return (
  <div className={orderDetailsStyles.modal}>

    <h2 className={orderDetailsStyles.title + ' text text_type_digits-large mb-8'}>034536</h2>
    <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
    <img src={doneImage} className='mb-15'/>
    <p className='mb-2 text_type_main-default'>Ваш заказ начали готовить</p>
    <p className='text text_type_main-default text_color_inactive'>Дождитесь готовности на орбитальной станции</p>
  </div>

)
}



OrderDetails.propTypes = {
  onClick: PropTypes.func
}



export default OrderDetails
