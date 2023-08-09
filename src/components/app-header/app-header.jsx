import React from 'react';

import { NavLink, useLocation } from 'react-router-dom';
import { Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import headerStyles from './app-header.module.css';

function AppHeader() {
  const location = useLocation();

  const setNavClass = ({ isActive }) => {
    return isActive
      ? `${headerStyles.link} pt-4 pb-4 pl-5 pr-5`
      : `${headerStyles.link} pt-4 pb-4 pl-5 pr-5`;
  };

  const setNavClassProfileLink = ({ isActive }) => {
    return isActive
      ? `${headerStyles.linkAuthorization} pt-4 pb-4 pl-5 pr-5`
      : `${headerStyles.linkAuthorization} pt-4 pb-4 pl-5 pr-5`;
  };

  const setIconType = (url) => {
    return location.pathname === url ? 'primary' : 'secondary';
  };
  const setTextClass = (url) => {
    return location.pathname === url
      ? 'text text_type_main-default ml-2'
      : 'text text_type_main-default text_color_inactive ml-2';
  };

  return (
    <header className={headerStyles.header}>
      <nav className={headerStyles.nav}>
        <NavLink to="/" className={setNavClass}>
          <BurgerIcon type={setIconType('/')} />
          <p className={setTextClass('/')}>Конструктор</p>
        </NavLink>

        <NavLink to="*" className={setNavClass}>
          <ListIcon type={setIconType('/*')} />
          <p className={setTextClass('/*')}>Лента заказов</p>
        </NavLink>

        <div className={headerStyles.logoContainer}>
          <Logo />
        </div>

        <NavLink to="/profile" className={setNavClassProfileLink}>
          <ProfileIcon type={setIconType('/profile')} />
          <p className={setTextClass('/profile')}>Личный кабинет</p>
        </NavLink>
      </nav>
    </header>
  );
}

export default AppHeader;
