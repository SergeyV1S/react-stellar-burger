import { useCallback, useState } from "react";

export const useModal = () => {
  const [isModal, setIsModal] = useState(false);

  const openModal = useCallback(() => {
    setIsModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModal(false);
  }, []);

  return {
    isModal,
    openModal,
    closeModal
  };
};
