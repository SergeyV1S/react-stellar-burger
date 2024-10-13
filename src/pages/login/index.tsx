import { useAppDispatch } from "@services/store"
import { loginUserAction } from "@services/user"
import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components"
import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"

import { defaultFormValue } from "./constants/defultFormValue"
import loginPageStyles from "./login.module.css"
import type { ILoginForm } from "./types"

export const LoginPage = () => {
  const dispatch = useAppDispatch()
  const [loginForm, setLoginForm] = useState<ILoginForm>(defaultFormValue)
  const { state } = useLocation()
  const navigate = useNavigate()

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(loginUserAction(loginForm)).then(() =>
      navigate(state && state.from ? state.from.pathname : "/", {
        replace: true
      })
    )
  }

  const inputOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    if (e.target.name === "email") {
      setLoginForm((prev) => ({ ...prev, email: inputValue }))
    }
    if (e.target.name === "password") {
      setLoginForm((prev) => ({ ...prev, password: inputValue }))
    }
  }

  return (
    <form onSubmit={submitHandler} className={loginPageStyles.container}>
      <h1 className='text text_type_main-medium'>Вход</h1>
      <EmailInput
        placeholder='E-mail'
        onChange={inputOnChangeHandler}
        value={loginForm.email}
        name='email'
        extraClass='mt-6 mb-6'
      />
      <PasswordInput
        placeholder='Пароль'
        onChange={inputOnChangeHandler}
        value={loginForm.password}
        extraClass='mb-6'
        name='password'
      />
      <Button htmlType='submit' disabled={!loginForm.email || !loginForm.password} extraClass='mb-20'>
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
  )
}
