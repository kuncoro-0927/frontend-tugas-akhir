import { useState } from "react";

const useCategoryModals = (onDataChanged) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleOpenCreateModal = () => setCreateModal(true);
  const handleCloseCreateModal = () => setCreateModal(false);

  const handleOpenEditModal = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setEditModal(true);
  };
  const handleCloseEditModal = () => setEditModal(false);

  const handleOpenDeleteModal = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setDeleteModal(true);
  };
  const handleCloseDeleteModal = () => setDeleteModal(false);

  const handleCreateSuccess = () => onDataChanged?.();
  const handleEditSuccess = () => onDataChanged?.();
  const handleDeleteSuccess = () => onDataChanged?.();

  return {
    selectedCategoryId,
    createModal,
    editModal,
    deleteModal,
    handleOpenCreateModal,
    handleCloseCreateModal,
    handleOpenEditModal,
    handleCloseEditModal,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleCreateSuccess,
    handleEditSuccess,
    handleDeleteSuccess,
  };
};

export default useCategoryModals;
