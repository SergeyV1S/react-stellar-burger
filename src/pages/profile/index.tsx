import { useAppDispatch, useAppSelector } from "@services/store"
import { getUserStore, updateUserAction } from "@services/user"
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components"
import { useEffect, useState } from "react"

import profilePageStyles from "./profile.module.css"
import type { IProfileForm } from "./types/profileForm"

export const ProfilePage = () => {
  const { user, isLoading } = useAppSelector(getUserStore)
  const dispatch = useAppDispatch()

  const [profileForm, setProfileForm] = useState<IProfileForm>({
    email: "",
    name: "",
    password: "",
    defaultName: "",
    defaultMail: "",
    defaultPassword: ""
  })

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(updateUserAction(profileForm))
  }

  const inputOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const resetForm = () => setProfileForm((prev) => ({ ...prev, email: prev.defaultMail, name: prev.defaultName }))

  useEffect(() => {
    if (user) {
      setProfileForm({
        email: user.email || "",
        name: user.name || "",
        password: "",
        defaultName: user.name || "",
        defaultMail: user.email || "",
        defaultPassword: ""
      })
    }
  }, [user])

  return (
    <form onSubmit={submitHandler} className={profilePageStyles.container}>
      <Input
        name='name'
        placeholder='Имя'
        value={profileForm.name}
        onChange={inputOnChangeHandler}
        icon='EditIcon'
        extraClass='mt-6 mb-6'
        errorText='Пользователь с таким именем уже существует'
        size='default'
      />
      <EmailInput
        placeholder='Логин'
        onChange={inputOnChangeHandler}
        value={profileForm.email}
        isIcon
        name='email'
        extraClass='mb-6'
      />
      <PasswordInput
        placeholder='Пароль'
        onChange={inputOnChangeHandler}
        value={profileForm.password}
        extraClass='mb-6'
        name='password'
      />
      <div className={profilePageStyles.button_container}>
        <Button
          onClick={resetForm}
          disabled={
            (profileForm.email === profileForm.defaultMail &&
              profileForm.name === profileForm.defaultName &&
              profileForm.password === profileForm.defaultPassword) ||
            isLoading
          }
          htmlType='reset'
          type='secondary'
          extraClass='mb-20'
        >
          Отмена
        </Button>
        <Button
          htmlType='submit'
          disabled={
            (profileForm.email === profileForm.defaultMail &&
              profileForm.name === profileForm.defaultName &&
              profileForm.password === profileForm.defaultPassword) ||
            isLoading
          }
          extraClass='mb-20'
        >
          Сохранить
        </Button>
      </div>
    </form>
  )
}
