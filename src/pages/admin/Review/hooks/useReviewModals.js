import { useState } from "react";

const useReviewModals = (onDataChanged) => {
  const [selectedPromoId, setSelectedPromoId] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleOpenDrawer = (promoId) => {
    setSelectedPromoId(promoId);
    setDrawerOpen(true);
  };
  const handleCloseDrawer = () => setDrawerOpen(false);

  const handleOpenDeleteModal = (promoId) => {
    setSelectedPromoId(promoId);
    setDeleteModal(true);
  };
  const handleCloseDeleteModal = () => setDeleteModal(false);

  const handleDeleteSuccess = () => onDataChanged?.();

  return {
    selectedPromoId,
    deleteModal,
    drawerOpen,
    handleOpenDrawer,
    handleCloseDrawer,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteSuccess,
  };
};

export default useReviewModals;
