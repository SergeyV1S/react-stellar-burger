import { clearConstructor } from "@services/constructor"
import { closeIngredientModal } from "@services/ingredient"
import { toggleOrderModal } from "@services/order"
import { useAppDispatch } from "@services/store"
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { type ReactNode, useEffect } from "react"
import { createPortal } from "react-dom"
import { useLocation, useNavigate } from "react-router-dom"

import { ModalOverlay } from "./modal-overlay"
import modal from "./modal.module.css"

const modalElement = document.getElementById("modal") as HTMLElement

interface IModalProps {
  children: ReactNode
}

export const Modal = ({ children }: IModalProps) => {
  const dispatch = useAppDispatch()
  const { state } = useLocation()
  const navigate = useNavigate()

  const closeModal = () => {
    dispatch(toggleOrderModal({ isOpen: false }))
    dispatch(closeIngredientModal())
    if (state) {
      navigate(-1)
    } else {
      dispatch(clearConstructor())
    }
  }

  useEffect(() => {
    const checkEscapeButton = (e: KeyboardEvent) => {
      if (e.key == "Escape") {
        closeModal()
      }
    }
    document.addEventListener("keydown", checkEscapeButton)

    return () => {
      document.removeEventListener("keydown", checkEscapeButton)
    }
  }, [])

  return createPortal(
    <menu type='popup' className={modal.wrapper}>
      <ModalOverlay closeModal={closeModal} />
      <div className={modal.container}>
        <span className={modal.close} onClick={closeModal}>
          <CloseIcon type='primary' />
        </span>
        {children}
      </div>
    </menu>,
    modalElement
  )
}
