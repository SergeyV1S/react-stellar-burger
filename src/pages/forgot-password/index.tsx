import { postForgotPasswordMutation } from "@api/postForgotPasswordMutation"
import type { IPostForgutPasswordMutationResponse } from "@api/postForgotPasswordMutation"
import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import forgotPasswordPageStyles from "./forgot-password.module.css"

export const ForgotPasswordPage = () => {
  const [formData, setMail] = useState({
    email: ""
  })
  const navigate = useNavigate()

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await postForgotPasswordMutation(formData).then((res: IPostForgutPasswordMutationResponse) => {
      if (res.success) {
        localStorage.setItem("forgor-password-visited", "true")
        navigate("/reset-password")
      }
    })
  }

  const inputOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => setMail({ email: e.target.value })

  return (
    <form onSubmit={submitHandler} className={forgotPasswordPageStyles.container}>
      <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
      <EmailInput
        name='mail'
        placeholder='Введите e-mail'
        value={formData.email}
        onChange={inputOnChangeHandler}
        extraClass='mt-6 mb-6'
      />
      <Button htmlType='submit' disabled={!formData.email} extraClass='mb-20'>
        Восстановить
      </Button>
      <div className={forgotPasswordPageStyles.link_container}>
        <p className='text text_type_main-default text_color_inactive'>Вспомнили пароль?</p>
        <Link to='/login' className='text text_type_main-default'>
          Войти
        </Link>
      </div>
    </form>
  )
}
