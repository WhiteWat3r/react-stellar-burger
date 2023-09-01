import React from 'react';

import { NavLink, useLocation } from 'react-router-dom';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import headerStyles from './app-header.module.css';

function AppHeader() {
  const location = useLocation();

  const setIconType = (url: string) => {
    return location.pathname === url ? 'primary' : 'secondary';
  };
  const setTextClass = (url: string) => {
    return location.pathname === url
      ? 'text text_type_main-default ml-2'
      : 'text text_type_main-default text_color_inactive ml-2';
  };

  return (
    <header className={headerStyles.header}>
      <nav className={headerStyles.nav}>
        <NavLink to="/" className={`${headerStyles.link} pt-4 pb-4 pl-5 pr-5`}>
          <BurgerIcon type={setIconType('/')} />
          <p className={setTextClass('/')}>Конструктор</p>
        </NavLink>

        <NavLink to="/feed" className={`${headerStyles.link} pt-4 pb-4 pl-5 pr-5`}>
          <ListIcon type={setIconType('/feed')} />
          <p className={setTextClass('/feed')}>Лента заказов</p>
        </NavLink>

        <div className={headerStyles.logoContainer}>
          <NavLink to="/">
            <Logo />
          </NavLink>
        </div>

        <NavLink to="/profile" className={`${headerStyles.linkAuthorization} pt-4 pb-4 pl-5 pr-5`}>
          <ProfileIcon type={setIconType('/profile')} />
          <p className={setTextClass('/profile')}>Личный кабинет</p>
        </NavLink>
      </nav>
    </header>
  );
}

export default AppHeader;
