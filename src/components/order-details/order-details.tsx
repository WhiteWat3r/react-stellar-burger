import React from 'react';
import PropTypes from 'prop-types';

import orderDetailsStyles from './order-details.module.css';
import doneImage from '../../images/done1.png';
import Loader from '../loader/loader';
import { useAppSelector } from '../../hooks/useAppSelector';

function OrderDetails() {
  const orderNumber = useAppSelector((store) => store.ingredient.orderNumber);

  return (
    <div className={orderDetailsStyles.modal}>
      {orderNumber ? (
        <>
          <h2 className={orderDetailsStyles.title + ' text text_type_digits-large mb-8'}>
            {orderNumber}
          </h2>
          <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
          <img src={doneImage} className="mb-15" />
          <p className="mb-2 text_type_main-default">Ваш заказ начали готовить</p>
          <p className="text text_type_main-default text_color_inactive">
            Дождитесь готовности на орбитальной станции
          </p>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default OrderDetails;
