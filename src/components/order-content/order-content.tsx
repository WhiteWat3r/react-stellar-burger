import { FC, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';

import style from './order-content.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredient, TOrder } from '../../services/types';
import { formatDate } from '../../utils/formatDate';
import { wsConnectionClosed, wsConnectionStart, wsUserConnectionClosed, wsUserConnectionStart } from '../../services/actions/web-socket';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import Loader from '../loader/loader';
import { getOrderInfo } from '../../utils/api';
import { getCookie } from '../../utils/cookie';

type TOrderStatusProps = {
  isPage?: boolean;
};

const OrderContent: FC<TOrderStatusProps> = ({ isPage }) => {
  const dispatch = useAppDispatch();
  const currentUrl = window.location.href;

  const location = useLocation();

  useEffect(() => {
    if (currentUrl.includes('profile/orders')) {
      dispatch(wsUserConnectionStart(`?token=${getCookie('accessToken')}`));
    } else {
      dispatch(wsConnectionStart(''));
    }

    return () => {


      if (currentUrl.includes('profile/orders')) {
        dispatch(wsUserConnectionClosed());
      } else {
        dispatch(wsConnectionClosed());
      }




    };
  }, [dispatch]);

  const { id } = useParams();

  
  const feedOrders = useAppSelector((store) => store.ws.feed.orders);
  const feedUserOrders = useAppSelector((store) => store.ws.feedUser.orders);
  const orders = currentUrl.includes('profile/orders') ? feedUserOrders : feedOrders;




  useEffect(() => {
    let orderNumber;

    if (location.state) {
      orderNumber = location.state.orderNumber;
    }
    if (orderNumber) {
      dispatch(getOrderInfo(orderNumber));
    }
  }, []);

  let orderPrice = 0;
  let order = null;
  let updatedIngredients: any[] = [];
  order = useAppSelector((store) => store.ingredient.currentOrder);

  if (!order && orders) {
    order = orders.find((order: TOrder) => order._id === id);
  } else if (!order && !orders) {
    console.log('sad');
  }

  const ingredients = useAppSelector((store) => store.ingredient.items);

  if (order) {
    const orderIngredients = order.ingredients
      .map((id: string) => ingredients.find((ingr) => ingr._id === id))
      .filter((ingr: TIngredient) => ingr !== undefined) as TIngredient[];

    orderPrice = orderIngredients.reduce((acc, ingr) => {
      if (ingr) {
        return acc + ingr.price;
      }
      return acc;
    }, 0);

    const uniqueIngredients = Array.from(new Set(orderIngredients.map((ingr) => ingr.name)));

    updatedIngredients = uniqueIngredients.map((name) => {
      const count = orderIngredients.filter((ingr) => ingr.name === name).length;
      const ingr = orderIngredients.find((ingr) => ingr.name === name);
      if (count > 1 && ingr) {
        return {
          ...ingr,
          multiplier: count,
        };
      }
      return ingr;
    });
  }


  return (
    <div className={style.orderContent}>
      {order ? (
        <div className="pr-10 pl-10 pt-15 pb-10">
          <p
            className={
              isPage
                ? 'text text_type_digits-default mb-10 ' + style.number
                : 'text text_type_digits-default mb-10'
            }>
            #{order.number}
          </p>
          <h2 className={style.header + ' text text_type_main-medium mb-3 '}>{order.name}</h2>
          <p className={style.status + ' text text_type_main-default mb-15'}>
            {order?.status === 'done' ? 'Выполнен' : 'В работе'}
          </p>
          <p className="mb-6 text text_type_main-default">Состав:</p>
          <ul className={style.list + ' pr-6 custom-scroll'}>
            {updatedIngredients.map((ingr, index) => (
              <li className={style.ingredient} key={index}>
                <div className={style.image}>
                  <img className={style.ingredientImg} src={ingr.image} alt={ingr.name} />
                  <p className="text text_type_main-default ml-4">{ingr.name}</p>
                </div>

                <div className={style.basket}>
                  <p className="text text_type_digits-default mr-2">
                    {ingr.multiplier ? `${ingr.multiplier} x ${ingr.price}` : ingr.price}
                  </p>
                  <CurrencyIcon type="primary" />
                </div>
              </li>
            ))}
          </ul>
          <div className={style.footer + ' mt-10'}>
            <p className="text text_type_main-default">
              {order ? formatDate(order.createdAt) : null}
            </p>

            <div className={style.basket}>
              <p className="text text_type_digits-default mr-2">{orderPrice}</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default OrderContent;
