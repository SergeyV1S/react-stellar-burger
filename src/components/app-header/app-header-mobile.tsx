import { cn } from "@src/utils";
import { BurgerIcon, CloseIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import { Accordion } from "../accordion";
import appHeaderStyles from "./app-header.module.css";

export const AppHeaderMobile = () => {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const location = useLocation();
  const isPersonalRoom = location.pathname === "/profile" || location.pathname === "/profile/orders";

  return (
    <div className={appHeaderStyles.mobile_header_wrapper}>
      <div className={appHeaderStyles.mobile_header_container}>
        <Link to='/'>
          <img src='/logo.png' alt='logo' />
        </Link>
        <button onClick={() => setIsNavigationOpen(true)} className={appHeaderStyles.mobile_nav_close}>
          <ListIcon type='primary' />
        </button>
      </div>

      <div
        className={cn(
          appHeaderStyles.mobile_nav_wrapper,
          isNavigationOpen && appHeaderStyles.mobile_nav_wrapper_active
        )}
      >
        <div className={appHeaderStyles.mobile_nav}>
          <div className={appHeaderStyles.mobile_nav_heading}>
            <h2 className='text text_type_main-large'>Меню</h2>
            <button className={appHeaderStyles.mobile_nav_close} onClick={() => setIsNavigationOpen(false)}>
              <CloseIcon type='secondary' />
            </button>
          </div>
          <nav className={appHeaderStyles.mobile_menu_content}>
            <Accordion
              heading={
                <>
                  <ProfileIcon type={isPersonalRoom ? "primary" : "secondary"} />
                  <span
                    className={cn(
                      "text text_type_main-default",
                      appHeaderStyles.mobile_accordion_header,
                      isPersonalRoom ? appHeaderStyles.mobile_menu_link_not_active : "text_color_inactive"
                    )}
                  >
                    Личный кабинет
                  </span>
                </>
              }
            >
              <NavLink
                to='/profile'
                end
                onClick={() => setIsNavigationOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "text text_type_main-small",
                    appHeaderStyles.mobile_menu_link,
                    isActive ? appHeaderStyles.mobile_menu_link_not_active : "text_color_inactive"
                  )
                }
              >
                <span>Профиль</span>
              </NavLink>
              <NavLink
                to='/profile/orders'
                onClick={() => setIsNavigationOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "text text_type_main-small",
                    appHeaderStyles.mobile_menu_link,
                    isActive ? appHeaderStyles.mobile_menu_link_not_active : "text_color_inactive"
                  )
                }
              >
                <span>История заказов</span>
              </NavLink>
              <Link
                to='#'
                onClick={() => setIsNavigationOpen(false)}
                className={cn("text text_type_main-small text_color_inactive", appHeaderStyles.mobile_menu_link)}
              >
                <span>Выход</span>
              </Link>
            </Accordion>
            <NavLink
              to='/'
              onClick={() => setIsNavigationOpen(false)}
              className={({ isActive }) =>
                cn(
                  "text text_type_main-small",
                  appHeaderStyles.mobile_menu_link,
                  isActive ? appHeaderStyles.mobile_menu_link_not_active : "text_color_inactive"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <BurgerIcon type={isActive ? "primary" : "secondary"} />
                  <span>Конструктор бургеров</span>
                </>
              )}
            </NavLink>
            <NavLink
              to='/order-feed'
              onClick={() => setIsNavigationOpen(false)}
              className={({ isActive }) =>
                cn(
                  "text text_type_main-small",
                  appHeaderStyles.mobile_menu_link,
                  isActive ? appHeaderStyles.mobile_menu_link_not_active : "text_color_inactive"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <ListIcon type={isActive ? "primary" : "secondary"} />
                  <span>Лента заказов</span>
                </>
              )}
            </NavLink>
          </nav>
        </div>
      </div>
    </div>
  );
};
