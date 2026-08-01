import OrderHeader from "./OrderHeader";
import OrderItemRow from "./OrderItemRow";

const OrderCard = ({
  order,
  isExpanded,
  onToggleExpand,
  onShowModal,
  isDownloading,
  onDownloadInvoice,
}) => (
  <div className="ticket-card max-w-[800px] mb-8 mt-10">
    <div className="border border-gray-200 w-full rounded-lg">
      <OrderHeader
        order={order}
        isExpanded={isExpanded}
        onToggleExpand={onToggleExpand}
        onShowModal={onShowModal}
        isDownloading={isDownloading}
        onDownloadInvoice={onDownloadInvoice}
      />
      {order.items.map((ticket, i) => (
        <OrderItemRow key={`${order.order_id}-${i}`} ticket={ticket} />
      ))}
    </div>
  </div>
);

export default OrderCard;