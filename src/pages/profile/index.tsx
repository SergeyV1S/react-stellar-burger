import { useForm } from "@hooks/useForm";
import { useAppDispatch, useAppSelector } from "@services/store";
import { getUserStore, updateUserAction } from "@services/user";
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";

import { defaultProfileFormState } from "./constants/defaultProfileFormState.constant";
import profilePageStyles from "./profile.module.css";
import type { IProfileForm } from "./types/profileForm";

export const ProfilePage = () => {
  const { user, isLoading } = useAppSelector(getUserStore);
  const dispatch = useAppDispatch();

  const { handleChange, formState, setFormState } = useForm<IProfileForm>(defaultProfileFormState);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateUserAction(formState));
  };

  const resetForm = () => setFormState((prev) => ({ ...prev, email: prev.defaultMail, name: prev.defaultName }));

  useEffect(() => {
    if (user) {
      setFormState({
        email: user.email || "",
        name: user.name || "",
        password: "",
        defaultName: user.name || "",
        defaultMail: user.email || "",
        defaultPassword: ""
      });
    }
  }, [user]);

  return (
    <form onSubmit={submitHandler} className={profilePageStyles.container}>
      <h1 className={profilePageStyles.heading + " mb-6 text text_type_main-large"}>Профиль</h1>
      <Input
        name='name'
        placeholder='Имя'
        value={formState.name}
        onChange={handleChange}
        icon='EditIcon'
        extraClass={"input" + " mt-6 mb-6"}
        errorText='Пользователь с таким именем уже существует'
        size='default'
      />
      <EmailInput
        placeholder='Логин'
        onChange={handleChange}
        value={formState.email}
        isIcon
        name='email'
        extraClass={"input" + " mb-6"}
      />
      <PasswordInput
        placeholder='Пароль'
        onChange={handleChange}
        value={formState.password}
        extraClass={"input" + " mb-6"}
        name='password'
      />
      <div className={profilePageStyles.button_container}>
        <Button
          onClick={resetForm}
          disabled={
            (formState.email === formState.defaultMail &&
              formState.name === formState.defaultName &&
              formState.password === formState.defaultPassword) ||
            isLoading
          }
          htmlType='reset'
          type='secondary'
          extraClass={profilePageStyles.button}
        >
          Отмена
        </Button>
        <Button
          htmlType='submit'
          disabled={
            (formState.email === formState.defaultMail &&
              formState.name === formState.defaultName &&
              formState.password === formState.defaultPassword) ||
            isLoading
          }
          extraClass={profilePageStyles.button}
        >
          Сохранить
        </Button>
      </div>
    </form>
  );
};
