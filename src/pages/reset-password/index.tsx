import { postResetPasswordMutation } from "@api/postResetPasswordMutation";
import type { IPostResetPasswordMutationResponse } from "@api/postResetPasswordMutation";
import { useForm } from "@hooks/useForm";
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { defaultFormValue } from "./constants/defaultFormValue";
import resetPasswordPageStyles from "./reset-password.module.css";
import type { IResetForm } from "./types";

export const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { formState, handleChange } = useForm<IResetForm>(defaultFormValue);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await postResetPasswordMutation(formState).then((res: IPostResetPasswordMutationResponse) => {
      if (res.success) {
        localStorage.removeItem("forgor-password-visited");
        navigate("/login", { replace: true });
      }
    });
  };

  if (!localStorage.getItem("forgor-password-visited")) return <Navigate to='/' />;

  return (
    <form onSubmit={submitHandler} className={resetPasswordPageStyles.container}>
      <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
      <PasswordInput
        name='password'
        placeholder='password'
        value={formState.password}
        onChange={handleChange}
        extraClass='input mt-6 mb-6'
        size='default'
      />
      <Input
        name='token'
        placeholder='Введите код из письма'
        value={formState.token}
        onChange={handleChange}
        extraClass='input mt-6 mb-6'
        errorText='Введите код из письма'
        size='default'
      />
      <Button htmlType='submit' disabled={!formState.password || !formState.token} extraClass='mb-20'>
        Восстановить
      </Button>
      <div className={resetPasswordPageStyles.link_container}>
        <p className='text text_type_main-default text_color_inactive'>Вспомнили пароль?</p>
        <Link to='/login' className='text text_type_main-default'>
          Войти
        </Link>
      </div>
    </form>
  );
};
