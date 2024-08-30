import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { type ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

import { ModalOverlay } from "./modal-overlay";
import modal from "./modal.module.css";

const modalElement = document.getElementById("modal") as HTMLElement;

interface IModalProps {
  children: ReactNode;
  closeModal: () => void;
  title?: string;
}

export const Modal = ({ children, closeModal, title }: IModalProps) => {
  useEffect(() => {
    const checkEscapeButton = (e: KeyboardEvent) => {
      if (e.key == "Escape") {
        closeModal();
      }
    };
    document.addEventListener("keydown", checkEscapeButton);

    return () => {
      document.removeEventListener("keydown", checkEscapeButton);
    };
  }, []);

  return createPortal(
    <menu type='popup' className={modal.wrapper}>
      <ModalOverlay closeModal={closeModal} />
      <div className={modal.container}>
        <div className={modal.content}>
          <div className={title ? modal.header_with_title : modal.header_without_title}>
            {title && <h2 className='text text_type_main-large'>{title}</h2>}
            <span className={modal.close} onClick={closeModal}>
              <CloseIcon type='primary' />
            </span>
          </div>
          {children}
        </div>
      </div>
    </menu>,
    modalElement
  );
};
