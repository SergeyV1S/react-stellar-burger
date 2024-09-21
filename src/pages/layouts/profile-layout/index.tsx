import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, Outlet } from "react-router-dom";

import profileLayout from "./profile-layout.module.css";

export const ProfileLayout = () => (
  <div className={profileLayout.wrapper}>
    <div className={profileLayout.container}>
      <nav className={profileLayout.nav}>
        <NavLink
          to='/profile'
          className={({ isActive }) =>
            (isActive ? profileLayout.active_link : profileLayout.link) + " text text_type_main-medium"
          }
        >
          Профиль
        </NavLink>
        <NavLink
          to='/'
          className={({ isActive }) =>
            (isActive ? profileLayout.active_link : profileLayout.link) + " text text_type_main-medium"
          }
        >
          История заказов
        </NavLink>
        <Button htmlType='button' className={profileLayout.link_button + " text text_type_main-medium"}>
          Выйти
        </Button>
        <p className='text text_type_main-default text_color_inactive mt-20'>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>
      <main className={profileLayout.main}>
        <Outlet />
      </main>
    </div>
  </div>
);
