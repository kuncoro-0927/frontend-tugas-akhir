import { useState } from "react";
import { instanceAdmin } from "../../../../../utils/axiosAdmin";
import { showSnackbar } from "../../../../../components/CustomSnackbar";

const useOrderModals = (onDataChanged) => {
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const [showResiModal, setShowResiModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [createModalByAdmin, setCreateModalByAdmin] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleOpenCreateModal = () => setCreateModal(true);
  const handleOpenCreateModalByAdmin = () => setCreateModalByAdmin(true);
  const handleCloseCreateModal = () => setCreateModal(false);
  const handleCloseCreateModalByAdmin = () => setCreateModalByAdmin(false);
  const handleCloseEditModal = () => setEditModal(false);
  const handleCloseDeleteModal = () => setDeleteModal(false);

  const handleOpenDrawer = (id) => {
    setSelectedOrderId(id);
    setDrawerOpen(true);
  };

  const handleOpenEditModal = (orderId) => {
    setSelectedOrderId(orderId);
    setEditModal(true);
  };

  const handleOpenDeleteModal = (orderId) => {
    setSelectedOrderId(orderId);
    setDeleteModal(true);
  };

  const handleOpenResiModal = (orderId) => {
    setSelectedOrderId(orderId);
    setShowResiModal(true);
  };

  const handleSubmitResi = async (orderId, trackingNumber) => {
    try {
      await instanceAdmin.post("/order/update-tracking", {
        orderId,
        trackingNumber,
      });
      showSnackbar("Nomor resi berhasil ditambahkan.", "success");
      onDataChanged?.();
    } catch (error) {
      console.error("Gagal menambahkan resi:", error);
      showSnackbar("Gagal menambahkan resi.", "error");
    }
  };

  const handleCreateSuccess = () => onDataChanged?.();
  const handleCreateByAdminSuccess = () => onDataChanged?.();
  const handleEditSuccess = () => onDataChanged?.();
  const handleDeleteSuccess = () => onDataChanged?.();

  return {
    selectedOrderId,
    setSelectedOrderId,

    showResiModal,
    setShowResiModal,
    createModal,
    createModalByAdmin,
    editModal,
    deleteModal,
    drawerOpen,
    setDrawerOpen,

    handleOpenCreateModal,
    handleOpenCreateModalByAdmin,
    handleCloseCreateModal,
    handleCloseCreateModalByAdmin,
    handleCloseEditModal,
    handleCloseDeleteModal,
    handleOpenDrawer,
    handleOpenEditModal,
    handleOpenDeleteModal,
    handleOpenResiModal,
    handleSubmitResi,

    handleCreateSuccess,
    handleCreateByAdminSuccess,
    handleEditSuccess,
    handleDeleteSuccess,
  };
};

export default useOrderModals;
