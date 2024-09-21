import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";

import { defaultFormValue } from "./constants/defaultFormValue";
import profilePageStyles from "./profile.module.css";
import type { IProfileForm } from "./types/profileForm";

export const ProfilePage = () => {
  const [registerForm, setRegisterForm] = useState<IProfileForm>(defaultFormValue);
  const [password, setPassword] = useState("");

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(registerForm);
  };

  const inputOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (e.target.name === "email") setRegisterForm((prev) => ({ ...prev, email: inputValue }));

    if (e.target.name === "password") setPassword(e.target.value);
    if (e.target.name === "name") setRegisterForm((prev) => ({ ...prev, name: inputValue }));
  };

  const resetForm = () => setRegisterForm(defaultFormValue);

  return (
    <form onSubmit={submitHandler} className={profilePageStyles.container}>
      <Input
        name='name'
        placeholder='Имя'
        value={registerForm.name}
        onChange={inputOnChangeHandler}
        icon='EditIcon'
        extraClass='mt-6 mb-6'
        errorText='Пользователь с таким именем уже существует'
        size='default'
      />
      <EmailInput
        placeholder='Логин'
        onChange={inputOnChangeHandler}
        value={registerForm.email}
        isIcon
        name='email'
        extraClass='mb-6'
      />
      <PasswordInput
        placeholder='Пароль'
        onChange={inputOnChangeHandler}
        value={password}
        extraClass='mb-6'
        name='password'
      />
      <div className={profilePageStyles.button_container}>
        <Button onClick={resetForm} htmlType='reset' type='secondary' extraClass='mb-20'>
          Отмена
        </Button>
        <Button htmlType='submit' disabled={!registerForm.email || !registerForm.name} extraClass='mb-20'>
          Сохранить
        </Button>
      </div>
    </form>
  );
};
