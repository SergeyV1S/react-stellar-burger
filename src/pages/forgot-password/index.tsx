import { postForgotPasswordMutation } from "@api/postForgotPasswordMutation";
import type { IPostForgutPasswordMutationResponse } from "@api/postForgotPasswordMutation";
import { useForm } from "@hooks/useForm";
import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";

import { defaultForgorPasswordFormState } from "./constants/defaultForgorPasswordFormState.constant";
import forgotPasswordPageStyles from "./forgot-password.module.css";
import type { IForgotPasswordForm } from "./types/forgotPasswordForm";

export const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const { formState, handleChange } = useForm<IForgotPasswordForm>(defaultForgorPasswordFormState);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await postForgotPasswordMutation(formState).then((res: IPostForgutPasswordMutationResponse) => {
      if (res.success) {
        localStorage.setItem("forgor-password-visited", "true");
        navigate("/reset-password");
      }
    });
  };

  return (
    <form onSubmit={submitHandler} className={forgotPasswordPageStyles.container}>
      <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
      <EmailInput
        name='email'
        placeholder='Введите e-mail'
        value={formState.email}
        onChange={handleChange}
        extraClass='input mt-6 mb-6'
      />
      <Button htmlType='submit' disabled={!formState.email} extraClass='mb-20'>
        Восстановить
      </Button>
      <div className={forgotPasswordPageStyles.link_container}>
        <p className='text text_type_main-default text_color_inactive'>Вспомнили пароль?</p>
        <Link to='/login' className='text text_type_main-default'>
          Войти
        </Link>
      </div>
    </form>
  );
};
