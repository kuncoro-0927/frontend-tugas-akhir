import React from "react";
import { IoIosTrendingDown, IoIosTrendingUp } from "react-icons/io";
import { formatNumber } from "../utils/formatNumber";

const BalanceCard = ({ totalAmount, percentageChange, changeLoading }) => {
  return (
    <div className="p-4 w-[400px] rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-lg relative overflow-hidden">
      <div className="absolute w-24 h-24 bg-white/10 rounded-full -top-6 -right-6"></div>

      <div className="flex items-center gap-3">
        <div>
          <div className="flex gap-3 mb-2 items-center">
            <p className="text-lg">Total Saldo</p>
          </div>
          <p className="text-4xl mb-1 font-bold">
            IDR {formatNumber(totalAmount)}
          </p>
          <p className="text-xs mt-1 flex items-center gap-1 text-white">
            {changeLoading ? (
              "Memuat perubahan..."
            ) : percentageChange === null ? (
              "Belum ada data bulan lalu"
            ) : (
              <>
                <div className="w-6 h-6 flex items-center justify-center rounded-md border border-white">
                  {percentageChange >= 0 ? (
                    <IoIosTrendingUp className="text-white w-4 h-4" />
                  ) : (
                    <IoIosTrendingDown className="text-white w-4 h-4" />
                  )}
                </div>
                {percentageChange >= 0 ? "+" : ""}
                {percentageChange.toFixed(2)}% dibanding bulan lalu
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
