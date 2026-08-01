import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { GoChevronRight } from "react-icons/go";
import { IoFilterOutline } from "react-icons/io5";

const ProductListHeader = ({ filterApplied, productCount, onOpenDrawer }) => (
  <>
    <Breadcrumbs aria-label="breadcrumb" separator={<GoChevronRight style={{ fontSize: "small" }} />}>
      <Link to="/">
        <span className="text-sm font-normal text-gray-600">Beranda</span>
      </Link>
      <div className="text-sm font-medium text-black">Produk</div>
    </Breadcrumbs>

    <h1 className="text-4xl font-extrabold mt-3 md:mt-10">List Produk</h1>

    <div className="md:flex items-center justify-between mt-2 md:mt-5 mb-5">
      <p>
        {filterApplied ? `Menampilkan ${productCount} produk sesuai filter` : "Menampilkan semua produk"}
      </p>

      <div className="flex md:hidden mt-3 items-center justify-between">
        <button
          onClick={onOpenDrawer}
          className="py-2 font-semibold gap-2 flex items-center justify-between border px-5 rounded-lg"
        >
          <span>Filter</span>
          <IoFilterOutline />
        </button>
      </div>
    </div>
  </>
);

export default ProductListHeader;