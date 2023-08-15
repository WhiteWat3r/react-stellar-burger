import React, { useEffect, useState } from 'react';

import style from './profilePage.module.css';
import { Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { logout } from '../../utils/api';
import Loader from '../../components/loader/loader';
import ProfileOverview from '../profileOverview/profileOverview';
import ProfileOrdersPage from '../profileOrdersPage/profileOrdersPage';

function ProfilePage() {
  const isAuthenticated = useSelector((store) => store.auth.isAuthenticated);

  const dispatch = useDispatch();
  const redirectPath = localStorage.getItem('redirectPath');

  const navigate = useNavigate();

  const authProcess = useSelector((store) => store.auth.authProcess);

  // if (!user) {
  //   return (
  //     <Navigate
  //       to={'/login'}
  //     />
  //   );
  // }
  const handeExitClick = () => {
    localStorage.removeItem('redirectPath');

    dispatch(logout());
  };

  useEffect(() => {
    if (isAuthenticated && redirectPath) {
      localStorage.removeItem('redirectPath');
      console.log(redirectPath);
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, redirectPath]);

  const setNavClass = ({ isActive }) => {
    return isActive
      ? `${style.link} text text_type_main-medium ${style.active}`
      : `${style.link} text text_type_main-medium text_color_inactive ${style.inactive}`;
  };

  return (
    <section className={style.profileSection}>
      {authProcess ? (
        <Loader />
      ) : (
        <>
          <nav className={style.navBlock}>
            <ul className={style.tab + ' mb-20'}>
              <li className={style.item}>
                <NavLink to="/profile" end className={setNavClass}>
                  Профиль
                </NavLink>
              </li>
              <li className={style.item}>
                <NavLink to="/profile/orders" className={setNavClass}>
                  История заказов
                </NavLink>
              </li>
              <li className={style.item}>
                <NavLink to="/login" className={setNavClass} onClick={handeExitClick}>
                  Выход
                </NavLink>
              </li>
            </ul>
            <p className="text text_type_main-default text_color_inactive">
              В этом разделе вы можете изменить свои персональные данные
            </p>
          </nav>

          <div className={style.container}>
            <Routes>
              <Route path="/" element={<ProfileOverview />} />
              <Route path="orders" element={<ProfileOrdersPage />} />
            </Routes>
          </div>
        </>
      )}
    </section>
  );
}

export default ProfilePage;
