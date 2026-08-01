import React from "react";
import ModalCreateProduct from "../../../../components/Admin/Modal/Products/CreateProduct";
import ModalEditProduct from "../../../../components/Admin/Modal/Products/UpdateProduct";
import ModalDeleteProduct from "../../../../components/Admin/Modal/Products/DeleteProduct";
import DetailProduct from "../../../../components/Admin/Modal/Products/DetailProduct";

import useProducts from "./hooks/useProducts";
import useProductModals from "./hooks/useProductModals";
import useClickOutside from "../../../../hooks/admin/useClickOutside";

import ProductsHeader from "./components/ProductsHeader";
import SearchInput from "./components/SearchInput";
import ProductsTable from "./components/ProductsTable";

const DataProducts = () => {
  const {
    filteredUsers,
    searchQuery,
    setSearchQuery,
    fetchProducts,
    handleToggle,
  } = useProducts();

  const { openDropdown, setOpenDropdown, dropdownRef } = useClickOutside();

  const {
    selectedProductId,
    createModal,
    editModal,
    deleteModal,
    drawerOpen,
    handleOpenDrawer,
    handleCloseDrawer,
    handleOpenCreateModal,
    handleCloseCreateModal,
    handleOpenEditModal,
    handleCloseEditModal,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleCreateSuccess,
    handleEditSuccess,
    handleDeleteSuccess,
  } = useProductModals(fetchProducts);

  return (
    <>
      <DetailProduct
        open={drawerOpen}
        onClose={handleCloseDrawer}
        productId={selectedProductId}
      />
      <ModalCreateProduct
        open={createModal}
        handleClose={handleCloseCreateModal}
        onUpdate={handleCreateSuccess}
      />
      <ModalEditProduct
        open={editModal}
        handleClose={handleCloseEditModal}
        productId={selectedProductId}
        onUpdate={handleEditSuccess}
      />
      <ModalDeleteProduct
        open={deleteModal}
        handleClose={handleCloseDeleteModal}
        productId={selectedProductId}
        onUpdate={handleDeleteSuccess}
      />

      <div className="mt-10 px-5 text-xl font-bold">
        <ProductsHeader onCreateClick={handleOpenCreateModal} />

        <div className="border p-5 mt-10">
          <div className="flex items-start justify-between">
            <p className="font-bold text-sm">Tabel Data Produk</p>
            <SearchInput
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="px-0">
            <ProductsTable
              products={filteredUsers}
              openDropdown={openDropdown}
              dropdownRef={dropdownRef}
              onToggleDropdown={setOpenDropdown}
              onToggleStatus={handleToggle}
              onOpenEditModal={handleOpenEditModal}
              onOpenDrawer={handleOpenDrawer}
              onOpenDeleteModal={handleOpenDeleteModal}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DataProducts;
