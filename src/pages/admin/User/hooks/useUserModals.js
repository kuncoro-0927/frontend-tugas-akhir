import { useState } from "react";

const useUserModals = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [createModal, setCreateModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleOpenCreateModal = () => setCreateModal(true);
  const handleCloseCreateModal = () => setCreateModal(false);

  const handleOpenUpdateModal = (userId) => {
    setSelectedUserId(userId);
    setUpdateModal(true);
  };
  const handleCloseUpdateModal = () => setUpdateModal(false);

  const handleOpenDeleteModal = (userId) => {
    setSelectedUserId(userId);
    setDeleteModal(true);
  };
  const handleCloseDeleteModal = () => setDeleteModal(false);

  const handleOpenDrawer = (userId) => {
    setSelectedUserId(userId);
    setDrawerOpen(true);
  };
  const handleCloseDrawer = () => setDrawerOpen(false);

  return {
    selectedUserId,
    createModal,
    updateModal,
    deleteModal,
    drawerOpen,
    handleOpenCreateModal,
    handleCloseCreateModal,
    handleOpenUpdateModal,
    handleCloseUpdateModal,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleOpenDrawer,
    handleCloseDrawer,
  };
};

export default useUserModals;
