import { useForm } from "@hooks/useForm";
import { useAppDispatch, useAppSelector } from "@services/store";
import { getUserStore, registerUserAction } from "@services/user";
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";

import { defaultFormValue } from "./constants/defultFormValue";
import registerPageStyles from "./register.module.css";
import type { IRegisterForm } from "./types/registerForm";

export const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error, user } = useAppSelector(getUserStore);
  const navigate = useNavigate();
  const { formState, handleChange } = useForm<IRegisterForm>(defaultFormValue);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(registerUserAction(formState)).then(() => {
      if (user.name && !error) {
        navigate("/profile");
      }
    });
  };

  return (
    <form onSubmit={submitHandler} className={registerPageStyles.container}>
      <h1 className='text text_type_main-medium'>Регистрация</h1>
      <Input
        name='name'
        placeholder='Имя'
        value={formState.name}
        onChange={handleChange}
        extraClass='mt-6 mb-6'
        errorText='Пользователь с таким именем уже существует'
        size='default'
      />
      <EmailInput placeholder='E-mail' onChange={handleChange} value={formState.email} name='email' extraClass='mb-6' />
      <PasswordInput
        placeholder='Пароль'
        onChange={handleChange}
        value={formState.password}
        extraClass='mb-6'
        name='password'
      />
      <Button
        htmlType='submit'
        disabled={!formState.email || !formState.password || !formState.name || isLoading}
        extraClass='mb-20'
      >
        Зарегистрироваться
      </Button>
      <div className={registerPageStyles.link_container}>
        <p className='text text_type_main-default text_color_inactive'>Уже зарегистрированы?</p>
        <Link to='/login' className='text text_type_main-default'>
          Войти
        </Link>
      </div>
    </form>
  );
};
