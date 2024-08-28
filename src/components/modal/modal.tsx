import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";

import { ModalOverlay } from "./modal-overlay";
import modal from "./modal.module.css";

const modalElement = document.getElementById("modal") as HTMLElement;

interface IModalProps {
  children: ReactNode;
  closeModal: () => void;
}

export const Modal = ({ children, closeModal }: IModalProps) =>
  createPortal(
    <div className={modal.wrapper}>
      <ModalOverlay closeModal={closeModal} />
      <div className={modal.container}>
        <div className={modal.content}>
          <span className={modal.close} onClick={closeModal}>
            <CloseIcon type='primary' />
          </span>
          {children}
        </div>
      </div>
    </div>,
    modalElement
  );
