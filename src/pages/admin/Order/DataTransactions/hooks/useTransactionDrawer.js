import { useState } from "react";

const useTransactionDrawer = () => {
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleOpenDrawer = (id) => {
    setSelectedTransactionId(id);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => setDrawerOpen(false);

  return {
    selectedTransactionId,
    drawerOpen,
    handleOpenDrawer,
    handleCloseDrawer,
  };
};

export default useTransactionDrawer;
