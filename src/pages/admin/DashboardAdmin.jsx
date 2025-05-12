/* eslint-disable no-unused-vars */
import AdminNavBar from "../../components/Admin/AdminNavBar";
import { useEffect } from "react";
import SidebarAdmin from "../../components/Admin/SidebarAdmin";
import TableOrderDashboard from "../../components/Admin/Table/TableOrderDashboard";
import ProgressBar from "../../components/Admin/Progress/OrdersOverview";
import { useState } from "react";

import TopUsers from "../../components/Admin/Table/TopUsers";
import { IoCartOutline, IoPricetagsOutline } from "react-icons/io5";
import { LuMountain } from "react-icons/lu";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import useSalesData from "./Sales";
import useTodaySalesData from "./TodaySales";
import { instanceAdmin } from "../../utils/axiosAdmin";
const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // Sidebar collapsed by default
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);

  // Toggle sidebar state
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed); // Toggle state
  };

  // Handle hover effect for sidebar
  const handleSidebarHover = (isHovered) => {
    setIsSidebarHovered(isHovered);
  };

  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalAgrotourism, setTotalAgrotourism] = useState(null);
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

  useEffect(() => {
    const fetchTotalAmount = async () => {
      try {
        const response = await instanceAdmin.get("/total/amount");

        setTotalAmount(response.data.totalAmount);
      } catch (err) {
        setError("Gagal memuat total amount");
      } finally {
        setLoading(false);
      }
    };

    fetchTotalAmount();
  }, []);
  const formatNumber = (number) => {
    return parseFloat(number).toLocaleString("id-ID"); // Format Indonesia
  };

  return (
    <>
      <section className="flex gap-10">
        <div
          className={`h-screen  fixed top-0 left-0 z-50 transition-all duration-300 ${
            isSidebarCollapsed ? "w-[100px]" : "w-[250px]"
          }`}
        >
          <SidebarAdmin
            onSidebarHover={handleSidebarHover} // Pass hover handler to SidebarAdmin
            isSidebarCollapsed={isSidebarCollapsed} // Pass collapsed state to SidebarAdmin
          />
        </div>
        <div
          className={`w-full transition-all duration-300 ${
            isSidebarCollapsed
              ? isSidebarHovered
                ? "ml-[250px]"
                : "ml-[100px]"
              : "ml-[250px]"
          }`}
        >
          <AdminNavBar onToggleSidebar={toggleSidebar} />

          <div className="mt-5 px-5 ">
            <div className="border shadow-sm  flex gap-10 items-center justify-between rounded-md py-8 px-5 mb-5">
              <div className="w-full ">
                <div className="flex mb-10 gap-5">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        label="Start Date"
                        value={startDate}
                        onChange={(newDate) => setStartDate(newDate)}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        label="End Date"
                        value={endDate}
                        onChange={(newDate) => setEndDate(newDate)}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
                <p className="font-extrabold text-4xl">
                  IDR {formatNumber(totalAmount)}
                </p>
                <p className="text-xl font-medium">Total saldo</p>
              </div>
              <div className="border border-gray-300 w-full rounded-xl  p-4">
                <h1 className="text-sm font-bold mb-3">Data Status Pesanan</h1>
                <div className="">
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
            </div>
            <div className="flex-col items-center  p-4 border  rounded-lg ">
              <div className="flex justify-between space-x-5 mt-5">
                <div className="border border-gray-300  hover:-translate-y-2 duration-300 w-60 h-36 rounded-2xl px-5 p-5">
                  <div className="text-sm flex items-center gap-4">
                    <div className="bg-orange-100 p-2 rounded-md text-orange-600 text-base font-extrabold">
                      {" "}
                      <IoPricetagsOutline />
                    </div>
                    <p className="font-semibold">Total Penjualan</p>
                  </div>
                  <p className="font-extrabold text-xl mt-3">
                    IDR {formatNumber(totalSales)}
                  </p>

                  <p className="text-xs font-bold mt-5 text-orange-600">
                    + IDR {formatNumber(totalTodaySales)} hari ini
                  </p>
                </div>
                <div className="border border-gray-300  hover:-translate-y-2 duration-300 w-60 h-36 rounded-2xl px-5 p-5">
                  <div className="text-sm flex items-center gap-4">
                    <div className="bg-green-100 p-2 rounded-md text-green-600 text-base font-extrabold">
                      {" "}
                      <IoCartOutline />
                    </div>
                    <p className="font-semibold">Total Pesanan</p>
                  </div>
                  <p className="font-extrabold text-xl mt-3">{totalOrders}</p>

                  <p className="text-xs font-bold mt-5 text-green-600">
                    +{totalTotalOrders} hari ini
                  </p>
                </div>

                <div className="border border-gray-300 hover:-translate-y-2 duration-300 w-60 h-36 rounded-2xl px-5 p-5">
                  <div className="text-sm flex items-center gap-4">
                    <div className="bg-blue-100 p-2 rounded-md text-blue-600 text-base font-extrabold">
                      {" "}
                      <LuMountain />
                    </div>
                    <p className="font-semibold">Total Wisata</p>
                  </div>
                  <p className="font-extrabold text-xl mt-3">
                    {totalAgrotourism}
                  </p>

                  <p className="text-xs font-bold mt-5 text-blue-600">
                    Terus tingkatkan!
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <TableOrderDashboard />
            </div>
          </div>

          <div className="mt-10 flex items-center justify-between gap-10 ">
            <div className="mb-5 w-full mt-5">{/* <TopUsers /> */}</div>
            <div className="w-full">
              <TopUsers />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
