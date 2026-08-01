import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { GoChevronRight } from "react-icons/go";
import { Link } from "react-router-dom";

const ProductBreadcrumb = ({ productName, from }) => {
  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      separator={<GoChevronRight style={{ fontSize: "small" }} />}
    >
      <Link to="/">
        <span className="text-sm font-normal text-gray-600">Beranda</span>
      </Link>

      {from === "produk" && (
        <Link to="/products/list">
          <span className="text-sm font-normal text-gray-600">Produk</span>
        </Link>
      )}

      <div className="text-sm font-medium text-black">{productName}</div>
    </Breadcrumbs>
  );
};

export default ProductBreadcrumb;
