import modalOverlay from "./modal-overlay.module.css"

interface IModalOverlayProps {
  closeModal: () => void
}

export const ModalOverlay = ({ closeModal }: IModalOverlayProps) => (
  <div className={modalOverlay.wrapper} onClick={closeModal} />
)
