import React from 'react'

import { Typography } from '@ya.praktikum/react-developer-burger-ui-components'
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ListIcon  } from '@ya.praktikum/react-developer-burger-ui-components'
import { ProfileIcon   } from '@ya.praktikum/react-developer-burger-ui-components'

import headerStyles from './header.module.css'

function AppHeader() {
  return (
    <header className={headerStyles.header}>
      <nav className={headerStyles.nav}>
        <a href='#' className={`${headerStyles.link} pt-4 pb-4 pl-5 pr-5`} >
          <BurgerIcon  type="primary" />
          <p className={'text text_type_main-default ml-2'}>Конструктор</p>
        </a>
        
        <a href='#' className={`${headerStyles.link} pt-4 pb-4 pl-5 pr-5`} >
          <ListIcon type="secondary" />
          <p className={'text text_type_main-default ml-2 text_color_inactive'}>Лента заказов</p>
        </a>

        <div className={headerStyles.logoContainer}>
          <Logo />
        </div>

        <a href='#' className={headerStyles.linkAuthorization + ' pt-4 pb-4 pl-5 pr-5'} >
          <ProfileIcon type="secondary" />
          <p className={'text text_type_main-default ml-2 text_color_inactive'}>Личный кабинет</p>
        </a>
      </nav>
    </header>
  )
}

export default AppHeader
