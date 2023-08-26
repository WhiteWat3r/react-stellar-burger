import { useEffect } from 'react';

import style from './profilePage.module.css';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { logout } from '../../utils/api';
import Loader from '../../components/loader/loader';
import ProfileOverview from '../profileOverview/profileOverview/profileOverniew';
import ProfileOrdersPage from '../profileOrdersPage/profileOrdersPage';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';

function ProfilePage() {
  const isAuthenticated = useAppSelector((store) => store.auth.isAuthenticated);

  const dispatch = useAppDispatch();
  const redirectPath = localStorage.getItem('redirectPath');

  const navigate = useNavigate();

  const authProcess = useAppSelector((store) => store.auth.authProcess);

  const handeExitClick = () => {
    localStorage.removeItem('redirectPath');

    dispatch(logout());
  };

  useEffect(() => {
    if (isAuthenticated && redirectPath) {
      localStorage.removeItem('redirectPath');
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, redirectPath]);

  const setNavClass = ({ isActive }: { isActive: boolean }) => {
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
              <Route path="/orders" element={<ProfileOrdersPage />} />
            </Routes>
          </div>
        </>
      )}
    </section>
  );
}

export default ProfilePage;
