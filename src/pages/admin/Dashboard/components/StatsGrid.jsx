import React from "react";
import { IoCartOutline, IoPricetagsOutline } from "react-icons/io5";
import { LuMountain } from "react-icons/lu";
import StatCard from "./StatCard";
import { formatNumber } from "../utils/formatNumber";

const StatsGrid = ({
  totalSales,
  totalTodaySales,
  totalOrders,
  totalTotalOrders,
  totalProducts,
}) => {
  return (
    <div className="flex-col items-center p-4 border rounded-lg">
      <div className="flex justify-between space-x-5 mt-5">
        <StatCard
          icon={<IoPricetagsOutline />}
          iconBg="bg-orange-100"
          iconColor="text-orange-600"
          title="Total Penjualan"
          value={`IDR ${formatNumber(totalSales)}`}
          footer={`+ IDR ${formatNumber(totalTodaySales)} hari ini`}
          footerColor="text-orange-600"
        />
        <StatCard
          icon={<IoCartOutline />}
          iconBg="bg-green-100"
          iconColor="text-green-600"
          title="Total Pesanan"
          value={totalOrders}
          footer={`+${totalTotalOrders} hari ini`}
          footerColor="text-green-600"
        />
        <StatCard
          icon={<LuMountain />}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
          title="Total Produk"
          value={totalProducts}
          footer="Terus tingkatkan!"
          footerColor="text-blue-600"
        />
      </div>
    </div>
  );
};

export default StatsGrid;
