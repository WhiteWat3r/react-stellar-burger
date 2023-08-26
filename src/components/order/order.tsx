import { FC, useEffect } from 'react';
import styles from './order.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from '../../hooks/useAppSelector';
import { TIngredient, TOrder } from '../../services/types';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setCurrentOrder } from '../../services/actions/ingredient';
import { formatDate } from '../../utils/formatDate';

type TOrderProps = {
  order: TOrder;
  fromProfile?: boolean;
};

const Order: FC<TOrderProps> = ({ order, fromProfile }) => {
  const ingredients = useAppSelector((store) => store.ingredient.items);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const orderIngredients = order.ingredients.map((id) => {
    return ingredients.find((ingr) => {
      return ingr._id === id;
    });
  });

  const orderPrice = orderIngredients.reduce((acc, ingr) => {
    if (ingr) {
      return acc + ingr.price;
    }
    return acc;
  }, 0);

  const link = fromProfile ? `/profile/orders/${order._id}` : `/feed/${order._id}`;

  const onClick = () => {
    dispatch(setCurrentOrder(order));

    if (!fromProfile) {
      navigate(link, {
        state: { background: location },
      });
    } else {
      navigate(link, {
        state: { background: location, orderNumber: order.number },
      });
    }
  };

  let orderStatus;
  let colorOrderStatus;

  if (order.status === 'pending') {
    orderStatus = 'Готовится';
    colorOrderStatus = styles.default + ' text text_type_main-default mb-6';
  } else if (order.status === 'created') {
    orderStatus = 'Создан';
    colorOrderStatus = styles.default + ' text text_type_main-default mb-6';
  } else {
    orderStatus = 'Выполнен';
    colorOrderStatus = styles.blue + ' text text_type_main-default mb-6';
  }

  return (
    <>
      {orderIngredients.length > 0 && (
        <li
          className={styles.order + ' mb-4 pl-6 pr-6 pb-6 pt-6 mr-2'}
          onClick={onClick}
          key={order._id}>
          <div className={styles.header + ' '}>
            <p className={styles.orderNumber + ' text text_type_digits-default mb-6'}>
              #{order.number}
            </p>

            <p className="text text_type_main-default text_color_inactive">
              {formatDate(order.createdAt)}
            </p>
          </div>
          <p className="text text_type_main-medium mb-2">{order.name}</p>

          {fromProfile && <p className={colorOrderStatus}>{orderStatus}</p>}

          <div className={styles.orderData}>
            <ul className={styles.imageContainer}>
              {orderIngredients.slice(0, 5).map((ingr, index) => (
                <li key={index} className={styles.item}>
                  {ingr ? (
                    <img className={styles.ingredientImg} src={ingr.image} alt={ingr.name} />
                  ) : null}
                </li>
              ))}
              {orderIngredients[5] && (
                <li className={styles.item}>
                  <img
                    className={styles.ingredientImg}
                    src={orderIngredients[5].image}
                    alt={orderIngredients[5].name}
                  />
                  <div className={styles.overlay}></div>
                  <p className={styles.countIngredients + ' text text_type_digits-default'}>+3</p>
                </li>
              )}
            </ul>
            <div className={styles.cost}>
              <p className="text text_type_digits-default">{orderPrice}</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </li>
      )}
    </>
  );
};

export default Order;
