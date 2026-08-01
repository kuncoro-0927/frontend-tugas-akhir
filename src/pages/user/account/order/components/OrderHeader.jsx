import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { formatDate } from "../utils/formatDate";
import StatusBadge from "./StatusBadge";
import InvoiceButton from "./InvoiceButton";

const OrderHeader = ({
  order,
  isExpanded,
  onToggleExpand,
  onShowModal,
  isDownloading,
  onDownloadInvoice,
}) => (
  <div className="border-b p-4">
    <div className="flex justify-between items-start md:items-center">
      <div className="flex w-full lg:w-auto lg:gap-2 flex-col lg:flex-row md:items-center">
        <div
          className="text-sm hidden lg:flex lg:flex-col space-y-1 cursor-pointer"
          onClick={onToggleExpand}
        >
          <p className="font-semibold">ID Pesanan</p>
          <p className="text-gray-950/50 text-xs">{order.order_code}</p>
        </div>

        <div
          className="text-sm lg:hidden flex gap-2 items-center w-full justify-between space-y-1 cursor-pointer"
          onClick={onToggleExpand}
        >
          <div>
            <p className="font-semibold">ID Pesanan</p>
            <p className="text-gray-950/50 text-xs">{order.order_code}</p>
          </div>
          {isExpanded ? (
            <IoIosArrowUp className="text-base" />
          ) : (
            <IoIosArrowDown className="text-base" />
          )}
        </div>

        <div className="ml-4 hidden lg:block space-y-1">
          <p className="font-semibold text-sm">Tanggal Pesanan</p>
          <p className="text-gray-950/50 text-xs">{formatDate(order.created_at)}</p>
        </div>

        <div className="ml-4 hidden lg:block space-y-1">
          <p className="font-semibold text-sm">
            Total <span className="text-xs font-normal">(incl. biaya)</span>
          </p>
          <p className="text-gray-950/50 text-xs font-semibold">
            IDR {Number(order.total_amount).toLocaleString("id-ID")}
          </p>
        </div>

        <StatusBadge
          status={order.status}
          onClick={() => onShowModal(order)}
          className="ml-4 hidden lg:block"
        />
      </div>

      <InvoiceButton
        isLoading={isDownloading}
        onClick={() => onDownloadInvoice(order.order_id)}
        className="hidden lg:block"
      />
    </div>

    {isExpanded && (
      <div className="mt-4 space-y-3 lg:hidden text-sm border-t pt-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-semibold">Tanggal Pesanan</p>
            <p className="text-gray-950/50 text-xs">{formatDate(order.created_at)}</p>
          </div>
          <InvoiceButton isLoading={isDownloading} onClick={() => onDownloadInvoice(order.order_id)} />
        </div>
        <div>
          <p className="font-semibold">
            Total <span className="text-xs font-normal">(incl. biaya)</span>
          </p>
          <p className="text-gray-950/50 text-xs font-semibold">
            IDR {Number(order.total_amount).toLocaleString("id-ID")}
          </p>
        </div>
        <StatusBadge status={order.status} onClick={() => onShowModal(order)} className="lg:hidden" />
      </div>
    )}
  </div>
);

export default OrderHeader;