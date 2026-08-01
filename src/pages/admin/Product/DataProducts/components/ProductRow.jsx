import React from "react";
import CardImage from "../../../../../components/Card/CardImage";
import { formatCurrency } from "../utils/formatters";
import StatusToggle from "./StatusToggle";

const ProductRow = ({
  product,
  isDropdownOpen,
  dropdownRef,
  onToggleDropdown,
  onToggleStatus,
  onOpenEditModal,
  onOpenDrawer,
  onOpenDeleteModal,
}) => {
  return (
    <tr>
      <td className="p-4 border-b border-blue-gray-50">
        <div className="flex items-center gap-3">
          <div className="">
            <CardImage
              image={`${import.meta.env.VITE_BACKEND_URL}${product.image_url}`}
              width="w-[70px]"
              height="h-[70px]"
            />
          </div>
          <div className="">
            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
              {product.name}
            </p>
          </div>
        </div>
      </td>
      <td className="p-4 border-b border-blue-gray-50">
        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
          {product.width}
        </p>
      </td>

      <td className="p-4 border-b border-blue-gray-50">
        <div className="">
          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
            {product.height}
          </p>
        </div>
      </td>
      <td className="p-4 border-b border-blue-gray-50">
        <div className="">
          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
            {product.category_name}
          </p>
        </div>
      </td>

      <td className="p-4 border-b border-blue-gray-50">
        <div className="">
          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
            {product.stock}
          </p>
        </div>
      </td>

      <td className="p-4 border-b border-blue-gray-50">
        <p className="block antialiased font-sans text-xs leading-normal text-blue-gray-900 font-normal">
          {formatCurrency(product.price)}
        </p>
      </td>
      <td className="p-4 border-b border-blue-gray-50">
        <StatusToggle
          status={product.status}
          onToggle={() => onToggleStatus(product.id)}
        />
      </td>
      <td className="p-4 border-b border-blue-gray-50 relative">
        <div className="relative inline-block text-left" ref={dropdownRef}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleDropdown(product.id);
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
                  onClick={() => onOpenEditModal(product.id)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Edit
                </button>
                <button
                  onClick={() => onOpenDrawer(product.id)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Detail
                </button>
                <button
                  onClick={() => onOpenDeleteModal(product.id)}
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

export default ProductRow;
