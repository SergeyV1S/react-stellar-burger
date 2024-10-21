import { useForm } from "@hooks/useForm";
import { useAppDispatch, useAppSelector } from "@services/store";
import { getUserStore, loginUserAction } from "@services/user";
import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { defaultFormValue } from "./constants/defultFormValue";
import loginPageStyles from "./login.module.css";
import type { ILoginForm } from "./types";

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { formState, handleChange } = useForm<ILoginForm>(defaultFormValue);
  const { error, user } = useAppSelector(getUserStore);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(loginUserAction(formState)).then(() => {
      if (user.name && !error) {
        navigate(state && state.from ? state.from.pathname : "/", {
          replace: true
        });
      }
    });
  };

  return (
    <form onSubmit={submitHandler} className={loginPageStyles.container}>
      <h1 className='text text_type_main-medium'>Вход</h1>
      <EmailInput
        placeholder='E-mail'
        onChange={handleChange}
        value={formState.email}
        name='email'
        extraClass='mt-6 mb-6'
      />
      <PasswordInput
        placeholder='Пароль'
        onChange={handleChange}
        value={formState.password}
        extraClass='mb-6'
        name='password'
      />
      <Button htmlType='submit' disabled={!formState.email || !formState.password} extraClass='mb-20'>
        Войти
      </Button>
      <div className={`${loginPageStyles.link_container} mb-4`}>
        <p className='text text_type_main-default text_color_inactive'>Вы - новый пользователь?</p>
        <Link to='/register' className='text text_type_main-default'>
          Зарегестрироваться
        </Link>
      </div>
      <div className={`${loginPageStyles.link_container}`}>
        <p className='text text_type_main-default text_color_inactive'>Забыли пароль?</p>
        <Link to='/forgot-password' className='text text_type_main-default'>
          Восстановить пароль
        </Link>
      </div>
    </form>
  );
};
