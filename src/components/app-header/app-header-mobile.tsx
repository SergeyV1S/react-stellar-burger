import { CloseIcon, ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { Link } from "react-router-dom";

import appHeader from "./app-header.module.css";

export const AppHeaderMobile = () => {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);

  return (
    <div className={appHeader.mobile_header_wrapper}>
      <div className={appHeader.mobile_header_container}>
        <img src='/logo.png' alt='logo' />
        <button onClick={() => setIsNavigationOpen(true)} className={appHeader.mobile_nav_close}>
          <ListIcon type='primary' />
        </button>
      </div>

      {isNavigationOpen && (
        <div className={appHeader.mobile_nav_wrapper}>
          <div className={appHeader.mobile_nav}>
            <div className={appHeader.mobile_nav_heading}>
              <h2>Меню</h2>
              <button className={appHeader.mobile_nav_close} onClick={() => setIsNavigationOpen(false)}>
                <CloseIcon type='secondary' />
              </button>
            </div>

            <nav className={appHeader.mobile_menu_content}>
              <Link to='/' className={appHeader.mobile_menu_link}>
                Главная
              </Link>
              <Link to='/about' className={appHeader.mobile_menu_link}>
                О нас
              </Link>
              <Link to='/contact' className={appHeader.mobile_menu_link}>
                Контакты
              </Link>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};
