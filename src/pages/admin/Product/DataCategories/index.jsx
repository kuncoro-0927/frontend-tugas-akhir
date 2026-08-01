import React from "react";
import ModalCreateCategory from "../../../../components/Admin/Modal/Categories/CreateCategory";
import ModalUpdateCategory from "../../../../components/Admin/Modal/Categories/UpdateCategory";
import ModalDeleteCategory from "../../../../components/Admin/Modal/Categories/DeleteCategory";

import useCategories from "./hooks/useCategories";
import useCategoryModals from "./hooks/useCategoryModals";
import useClickOutside from "../../../../hooks/admin/useClickOutside";

import CategoriesHeader from "./components/CategoriesHeader";
import SearchInput from "./components/SearchInput";
import CategoriesTable from "./components/CategoriesTable";

const DataCategories = () => {
  const {
    filteredCategoriesItems,
    searchQuery,
    setSearchQuery,
    fetchCategories,
  } = useCategories();

  const { openDropdown, setOpenDropdown, dropdownRef } = useClickOutside();

  const {
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
  } = useCategoryModals(fetchCategories);

  return (
    <>
      <ModalCreateCategory
        open={createModal}
        handleClose={handleCloseCreateModal}
        onUpdate={handleCreateSuccess}
      />
      <ModalUpdateCategory
        open={editModal}
        handleClose={handleCloseEditModal}
        categoryId={selectedCategoryId}
        onUpdate={handleEditSuccess}
      />
      <ModalDeleteCategory
        open={deleteModal}
        handleClose={handleCloseDeleteModal}
        categoryId={selectedCategoryId}
        onUpdate={handleDeleteSuccess}
      />

      <div className="mt-10 px-5 text-xl font-bold">
        <CategoriesHeader onCreateClick={handleOpenCreateModal} />

        <div className="border p-5 mt-10">
          <div className="flex items-start justify-between">
            <p className="font-semibold text-sm">Tabel Data Kategori</p>
            <SearchInput
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="px-0">
            <CategoriesTable
              categories={filteredCategoriesItems}
              openDropdown={openDropdown}
              dropdownRef={dropdownRef}
              onToggleDropdown={setOpenDropdown}
              onOpenEditModal={handleOpenEditModal}
              onOpenDeleteModal={handleOpenDeleteModal}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DataCategories;
