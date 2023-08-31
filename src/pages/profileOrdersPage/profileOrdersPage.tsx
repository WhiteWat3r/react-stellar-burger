import React, { useEffect } from 'react';
import styles from './profileOrderPage.module.css';
import { useAppSelector } from '../../hooks/useAppSelector';
import Order from '../../components/order/order';
import { TOrder } from '../../services/types';
import Loader from '../../components/loader/loader';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { wsUserConnectionClosed, wsUserConnectionStart } from '../../services/actions/web-socket';
import { getCookie } from '../../utils/cookie';

function ProfileOrdersPage() {
  const dispatch = useAppDispatch();


  
  useEffect(() => {
    dispatch(wsUserConnectionStart(`?token=${getCookie('accessToken')}`));
    return () => {
      dispatch(wsUserConnectionClosed());
    };
  }, [dispatch]);





  const userFeed = useAppSelector((store) => store.ws.feedUser);

  return (
    <section className={styles.section}>
      {userFeed.orders ? (
        <ul className={styles.ordersBlock + ' mr-15 mt-10 custom-scroll'}>
          {userFeed.orders.map((order: TOrder) => (
            <Order order={order} key={order._id} fromProfile={true} />
          ))}
        </ul>
      ) : (
        <Loader />
      )}
    </section>
  );
}

export default ProfileOrdersPage;
