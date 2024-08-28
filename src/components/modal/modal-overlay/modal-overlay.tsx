import { useEffect } from "react";

import modalOverlay from "./modal-overlay.module.css";

interface IModalOverlayProps {
  closeModal: () => void;
}

export const ModalOverlay = ({ closeModal }: IModalOverlayProps) => {
  const checkEscapeButton = (e: KeyboardEvent) => {
    if (e.key == "Escape") {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", checkEscapeButton);

    return () => {
      document.removeEventListener("keydown", checkEscapeButton);
    };
  }, []);

  return <div className={modalOverlay.wrapper} onClick={closeModal} />;
};
