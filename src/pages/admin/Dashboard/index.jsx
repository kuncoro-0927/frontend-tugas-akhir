import TableOrderDashboard from "../../../components/Admin/Table/TableOrderDashboard";
import TopProduct from "../../../components/Admin/Table/TopProducts";
import TopUsers from "../../../components/Admin/Table/TopUsers";

import useSalesData from "../Sales";
import useTodaySalesData from "../TodaySales";
import useTotalAmount from "./hooks/useTotalAmount";
import useTotalProducts from "./hooks/useTotalProducts";

import BalanceCard from "./components/BalanceCard";
import DateRangeFilter from "./components/DateRangeFilter";
import OrderStatusOverview from "./components/OrderStatusOverview";
import StatsGrid from "./components/StatsGrid";

const Dashboard = () => {
  const { totalAmount, percentageChange, changeLoading } = useTotalAmount();
  const { totalProducts } = useTotalProducts();

  const {
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    totalSales,
    totalOrders,
    totalSuccess,
    totalPending,
    totalFailed,
    successPercentage,
    pendingPercentage,
    failedPercentage,
  } = useSalesData();

  const { totalTodaySales, totalTotalOrders } = useTodaySalesData();

  return (
    <>
      <div className="mt-5 px-5">
        <div className="border shadow-sm flex gap-10 items-start justify-between rounded-md py-8 px-5 mb-5">
          <div className="w-full">
            <BalanceCard
              totalAmount={totalAmount}
              percentageChange={percentageChange}
              changeLoading={changeLoading}
            />
            <DateRangeFilter
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
            />
          </div>

          <OrderStatusOverview
            totalSuccess={totalSuccess}
            totalPending={totalPending}
            totalFailed={totalFailed}
            successPercentage={successPercentage}
            pendingPercentage={pendingPercentage}
            failedPercentage={failedPercentage}
          />
        </div>

        <StatsGrid
          totalSales={totalSales}
          totalTodaySales={totalTodaySales}
          totalOrders={totalOrders}
          totalTotalOrders={totalTotalOrders}
          totalProducts={totalProducts}
        />

        <div className="mt-5">
          <TableOrderDashboard />
        </div>
      </div>

      <div className="mt-10 mx-5 flex items-start justify-between gap-10">
        <div className="w-full">
          <TopProduct />
        </div>
        <div className="w-full">
          <TopUsers />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
