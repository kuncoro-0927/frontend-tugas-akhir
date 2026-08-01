import React from "react";
import DetailReview from "../../../components/Admin/Modal/Reviews/DetailReview";
import ModalDeleteReview from "../../../components/Admin/Modal/Reviews/DeleteReviews";

import useReviews from "./hooks/useReviews";
import useReviewModals from "./hooks/useReviewModals";
import useClickOutside from "../../../hooks/admin/useClickOutside";

import SearchInput from "./components/SearchInput";
import ReviewsTable from "./components/ReviewsTable";

const DataReview = () => {
  const { filteredReviews, searchQuery, setSearchQuery, fetchPromos } =
    useReviews();

  const { openDropdown, setOpenDropdown, dropdownRef } = useClickOutside();

  const {
    selectedPromoId,
    deleteModal,
    drawerOpen,
    handleOpenDrawer,
    handleCloseDrawer,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteSuccess,
  } = useReviewModals(fetchPromos);

  return (
    <>
      <DetailReview
        open={drawerOpen}
        onClose={handleCloseDrawer}
        promoId={selectedPromoId}
      />

      <ModalDeleteReview
        open={deleteModal}
        handleClose={handleCloseDeleteModal}
        promoId={selectedPromoId}
        onUpdate={handleDeleteSuccess}
      />

      <div className="mt-10 px-5 text-xl font-bold">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-extrabold">Data Ulasan</h1>
        </div>
        <div className="border p-5 mt-10">
          <div className="flex items-start justify-between">
            <p className="font-semibold text-sm">Tabel Data Ulasan</p>
            <SearchInput
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="px-0">
            <ReviewsTable
              reviews={filteredReviews}
              openDropdown={openDropdown}
              dropdownRef={dropdownRef}
              onToggleDropdown={setOpenDropdown}
              onOpenDrawer={handleOpenDrawer}
              onOpenDeleteModal={handleOpenDeleteModal}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DataReview;
