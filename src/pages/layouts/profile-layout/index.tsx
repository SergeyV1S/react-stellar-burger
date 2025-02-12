import { useAppDispatch } from "@services/store";
import { logoutUserAction } from "@services/user";
import { cn } from "@src/utils";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, Outlet, useMatch, useNavigate } from "react-router-dom";

import profileLayout from "./profile-layout.module.css";

export const ProfileLayout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const match = useMatch("/profile/orders");

  const logout = () => dispatch(logoutUserAction()).then(() => navigate("/login"));

  return (
    <div className={profileLayout.wrapper}>
      <div className={profileLayout.container}>
        <nav className={profileLayout.nav}>
          <NavLink
            to='/profile'
            end
            className={({ isActive }) =>
              cn(isActive && profileLayout.active_link, profileLayout.link, "text text_type_main-medium")
            }
          >
            Профиль
          </NavLink>
          <NavLink
            to='/profile/orders'
            className={({ isActive }) =>
              cn(isActive && profileLayout.active_link, profileLayout.link, "text text_type_main-medium")
            }
          >
            История заказов
          </NavLink>
          <Button
            htmlType='button'
            onClick={logout}
            className={cn(profileLayout.link_button, "text text_type_main-medium")}
          >
            Выйти
          </Button>
          <p className='text text_type_main-default text_color_inactive mt-20'>
            {!match
              ? "В этом разделе вы можете изменить свои персональные данные"
              : "В этом разделе вы можете просмотреть свою историю заказов"}
          </p>
        </nav>
        <Outlet />
      </div>
    </div>
  );
};
