import React from "react";
import Rating from "@mui/material/Rating";
import CardImage from "../../../../components/Card/CardImage";
const ReviewRow = ({
  review,
  isDropdownOpen,
  dropdownRef,
  onToggleDropdown,
  onOpenDrawer,
  onOpenDeleteModal,
}) => {
  return (
    <tr>
      <td className="p-4 border-b border-blue-gray-50">
        <div className="flex items-center gap-3">
          <div className="">
            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
              {review.email}
            </p>
          </div>
        </div>
      </td>
      <td className="p-4 border-b border-blue-gray-50">
        <div className="flex items-center gap-3">
          <div className="">
            <CardImage
              image={`${import.meta.env.VITE_BACKEND_URL}${review.image_url}`}
              width="w-[70px]"
              height="h-[70px]"
            />
          </div>
          <div className="">
            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
              {review.product_name}
            </p>
          </div>
        </div>
      </td>

      <td className="p-4 border-b border-blue-gray-50">
        <div className="flex items-center gap-3">
          <div className="">
            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
              <Rating
                name="read-only"
                value={review.rating}
                size="small"
                precision={0.1}
                readOnly
              />
            </p>
          </div>
        </div>
      </td>
      <td className="p-4 border-b border-blue-gray-50">
        <div className="flex items-center gap-3">
          <div className="">
            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
              {review.comment}
            </p>
          </div>
        </div>
      </td>

      <td className="p-4 border-b border-blue-gray-50 relative">
        <div className="relative inline-block text-left" ref={dropdownRef}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleDropdown(review.id);
            }}
            type="button"
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200"
          >
            ⋮
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-36 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
              <div className="py-1">
                <button
                  onClick={() => onOpenDrawer(review.id)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Detail
                </button>
                <button
                  onClick={() => onOpenDeleteModal(review.id)}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Hapus
                </button>
              </div>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

export default ReviewRow;
