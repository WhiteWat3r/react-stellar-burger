import { useState, useCallback } from "react";


export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentModal, setCurrentModal] = useState(null);

  const openModal = useCallback((modalType) => {
    setIsModalOpen(true);
    setCurrentModal(modalType);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setCurrentModal(null);
  }, []);

  return {
    isModalOpen,
    openModal,
    closeModal,
    currentModal
  };
};