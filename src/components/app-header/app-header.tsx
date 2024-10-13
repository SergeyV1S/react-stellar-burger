import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { NavLink } from "react-router-dom"

import appHeader from "./app-header.module.css"

export const AppHeader = () => (
  <header className={appHeader.wrapper + " pt-4 pb-4"}>
    <div className={appHeader.container}>
      <nav className={appHeader.nav}>
        <NavLink
          to='/'
          className={({ isActive }) => (isActive ? appHeader.active_link : appHeader.link) + " pl-5 pr-5 pb-4 pt-4"}
        >
          {({ isActive }) => (
            <>
              <BurgerIcon type={isActive ? "primary" : "secondary"} />
              <p className='text text_type_main-default'>Конструктор</p>
            </>
          )}
        </NavLink>
        <NavLink
          to='order-list'
          className={({ isActive }) => (isActive ? appHeader.active_link : appHeader.link) + " pl-5 pr-5 pb-4 pt-4"}
        >
          {({ isActive }) => (
            <>
              <ListIcon type={isActive ? "primary" : "secondary"} />
              <p className='text text_type_main-default'>Лента заказов</p>
            </>
          )}
        </NavLink>
      </nav>
      <div className={appHeader.logo}>
        <Logo />
      </div>
      <NavLink
        to='/profile'
        className={({ isActive }) => (isActive ? appHeader.active_link : appHeader.link) + " pl-5 pr-5 pb-4 pt-4"}
      >
        {({ isActive }) => (
          <>
            <ProfileIcon type={isActive ? "primary" : "secondary"} />
            <p className='text text_type_main-default'>Личный кабинет</p>
          </>
        )}
      </NavLink>
    </div>
  </header>
)
