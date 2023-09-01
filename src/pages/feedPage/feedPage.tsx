import { useEffect, useState } from 'react';
import styles from './feedPage.module.css';
import Order from '../../components/order/order';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { wsConnectionClosed, wsConnectionStart } from '../../services/actions/web-socket';
import { useAppSelector } from '../../hooks/useAppSelector';
import Loader from '../../components/loader/loader';
import { TOrder } from '../../services/types';

function FeedPage() {
  const dispatch = useAppDispatch();
  // console.log('refresh');

  const feed = useAppSelector((store) => store.ws.feed);

  const [readyOrderNumbers, setReadyOrderNumbers] = useState([]);

  const [onProgressOrderNumbers, setOnProgressOrderNumbers] = useState([]);

  useEffect(() => {
    if (feed.orders) {
      const readyOrders = feed.orders
        .filter((order: TOrder) => order.status === 'done')
        .slice(0, 10)
        .map((order: TOrder) => order.number);

      setReadyOrderNumbers(readyOrders);

      const onProgressOrders = feed.orders
        .filter((order: TOrder) => order.status === 'pending')
        .slice(0, 10)
        .map((order: TOrder) => order.number);

      setOnProgressOrderNumbers(onProgressOrders);
    }
  }, [feed]);

  useEffect(() => {
    dispatch(wsConnectionStart(''));
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [dispatch]);

  return (
    <section className={styles.section}>
      {feed.orders ? (
        <>
          <h1 className="text text_type_main-large mt-10 mb-4">Лента заказов</h1>

          <div className={styles.container}>
            <ul className={styles.ordersBlock + ' mr-15 custom-scroll'}>
              {feed.orders.map((order: TOrder) => (
                <Order order={order} key={order._id} />
              ))}
            </ul>

            <div className={styles.ordersNumbers}>
              <div className={styles.columns + ' mb-15'}>
                <div className={styles.column}>
                  <p className="text text_type_main-medium mb-6">Готовы:</p>
                  <ul className={styles.orderFinish}>
                    {readyOrderNumbers.map((number, index) => (
                      <li
                        className={styles.item + ' text text_type_digits-default mb-2'}
                        key={index}>
                        {number}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.column}>
                  <p className="text text_type_main-medium mb-6">В работе:</p>
                  <ul className={styles.orderFinish}>
                    {onProgressOrderNumbers.length ? (
                      onProgressOrderNumbers.map((number, index) => (
                        <li
                          className={styles.item + ' text text_type_digits-default mb-2'}
                          key={index}>
                          {number}
                        </li>
                      ))
                    ) : (
                      <p className="text text_type_main-default">Все заказы уже готовы!</p>
                    )}
                  </ul>
                </div>
              </div>
              <p className="text text_type_main-medium">Выполнено за все время:</p>
              <p className={styles.countOrders + ' text text_type_digits-large mb-15'}>
                {feed.total}
              </p>
              <p className="text text_type_main-medium"> Выполнено за сегодня:</p>
              <p className={styles.countOrders + ' text text_type_digits-large'}>
                {feed.totalToday}
              </p>
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </section>
  );
}

export default FeedPage;
