import React from "react";
import ProgressBar from "../../../../components/Admin/Progress/OrdersOverview";

const OrderStatusOverview = ({
  totalSuccess,
  totalPending,
  totalFailed,
  successPercentage,
  pendingPercentage,
  failedPercentage,
}) => {
  return (
    <div className="border border-gray-300 w-full rounded-xl p-4">
      <h1 className="text-sm font-bold mb-3">Data Status Pesanan</h1>
      <div>
        <div className="text-xs flex mb-1 justify-between">
          <span>Berhasil</span>
          <span className="font-bold">{totalSuccess}</span>
        </div>
        <ProgressBar percentage={successPercentage} />

        <div className="text-xs mt-3 mb-1 flex justify-between">
          <span>Pending</span>
          <span className="font-bold">{totalPending}</span>
        </div>
        <ProgressBar percentage={pendingPercentage} />

        <div className="text-xs mt-3 mb-1 flex justify-between">
          <span>Gagal</span>
          <span className="font-bold">{totalFailed}</span>
        </div>
        <ProgressBar percentage={failedPercentage} />
      </div>
    </div>
  );
};

export default OrderStatusOverview;
