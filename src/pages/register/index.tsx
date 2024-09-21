import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { Link } from "react-router-dom";

import { defaultFormValue } from "./constants/defultFormValue";
import registerPageStyles from "./register.module.css";
import type { IRegisterForm } from "./types/registerForm";

export const RegisterPage = () => {
  const [registerForm, setRegisterForm] = useState<IRegisterForm>(defaultFormValue);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(registerForm);
  };

  const inputOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (e.target.name === "email") setRegisterForm((prev) => ({ ...prev, email: inputValue }));

    if (e.target.name === "password") setRegisterForm((prev) => ({ ...prev, password: inputValue }));
    if (e.target.name === "name") setRegisterForm((prev) => ({ ...prev, name: inputValue }));
  };

  return (
    <form onSubmit={submitHandler} className={registerPageStyles.container}>
      <h1 className='text text_type_main-medium'>Регистрация</h1>
      <Input
        name='name'
        placeholder='Имя'
        value={registerForm.name}
        onChange={inputOnChangeHandler}
        extraClass='mt-6 mb-6'
        errorText='Пользователь с таким именем уже существует'
        size='default'
      />
      <EmailInput
        placeholder='E-mail'
        onChange={inputOnChangeHandler}
        value={registerForm.email}
        name='email'
        extraClass='mb-6'
      />
      <PasswordInput
        placeholder='Пароль'
        onChange={inputOnChangeHandler}
        value={registerForm.password}
        extraClass='mb-6'
        name='password'
      />
      <Button
        htmlType='submit'
        disabled={!registerForm.email || !registerForm.password || !registerForm.name}
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
