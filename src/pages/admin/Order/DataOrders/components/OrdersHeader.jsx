import React from "react";
import { BsCartPlus } from "react-icons/bs";
import { PiExport } from "react-icons/pi";
import ExportOrdersModal from "../../../../../components/ExportOrder";

const OrdersHeader = ({
  onExportClick,
  openExport,
  onCloseExport,
  onCreateByAdminClick,
  onCreateClick,
}) => {
  return (
    <div className="flex items-center justify-between">
      <h1>Data Pesanan</h1>
      <div className="flex items-center gap-5">
        <button
          className="text-base flex items-center gap-2 hover:border-blue-600/80 hover:text-blue-600/80 border border-blue-600 text-blue-600 rounded-md font-normal px-3 py-2 "
          onClick={onExportClick}
        >
          <PiExport className="text-lg" />
          Export
        </button>
        <button
          onClick={onCreateByAdminClick}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-600/80 duration-200 rounded-md text-white px-4 py-2 font-normal text-base"
        >
          <BsCartPlus className="text-lg" />
          Pesanan Offline
        </button>

        <button
          onClick={onCreateClick}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-600/80 duration-200 rounded-md text-white px-4 py-2 font-normal text-base"
        >
          <BsCartPlus className="text-lg" />
          Tambah
        </button>

        <ExportOrdersModal open={openExport} onClose={onCloseExport} />
      </div>
    </div>
  );
};

export default OrdersHeader;
