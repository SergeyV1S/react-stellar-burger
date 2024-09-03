import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from "@ya.praktikum/react-developer-burger-ui-components";

import appHeader from "./app-header.module.css";

export const AppHeader = () => (
  <header className={appHeader.wrapper + " pt-4 pb-4"}>
    <div className={appHeader.container}>
      <nav className={appHeader.nav}>
        <a className={appHeader.link + " pl-5 pr-5 pb-4 pt-4"} href='/'>
          <BurgerIcon type='primary' />
          <p className={appHeader.active_link + " text text_type_main-default"}>Конструктор</p>
        </a>
        <a className={appHeader.link + " pl-5 pr-5 pb-4 pt-4"} href='/'>
          <ListIcon type='secondary' />
          <p className='text text_type_main-default'>Лента заказов</p>
        </a>
      </nav>
      <Logo />
      <a className={appHeader.link + " pl-5 pr-5 pb-4 pt-4"} href='/'>
        <ProfileIcon type='secondary' />
        <p className='text text_type_main-default'>Личный кабинет</p>
      </a>
    </div>
  </header>
);
