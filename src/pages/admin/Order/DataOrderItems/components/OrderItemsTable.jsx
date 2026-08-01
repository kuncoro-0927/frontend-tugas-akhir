import RowActionsMenu from "./RowActionsMenu";

const TABLE_HEADERS = ["ID Pesanan", "Nama Produk", "Harga Produk", "Jumlah", "Total Harga", "Aksi"];

const formatIDR = (value) =>
  Number(value).toLocaleString("id-ID", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const OrderItemsTable = ({ orderItems, openDropdown, onOpenDropdown, dropdownRef, onEdit, onDetail, onDelete }) => (
  <table className="w-full min-w-max table-auto text-left">
    <thead>
      <tr>
        {TABLE_HEADERS.map((header) => (
          <th
            key={header}
            className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
          >
            <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
              {header}
            </p>
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {orderItems.map((order) => (
        <tr key={order.id}>
          <td className="p-4 border-b border-blue-gray-50">
            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
              {order.order_code}
            </p>
          </td>
          <td className="p-4 border-b border-blue-gray-50">
            <p className="text-sm text-blue-gray-900 font-normal">{order.product_name}</p>
          </td>
          <td className="p-4 border-b border-blue-gray-50">
            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
              IDR {formatIDR(order.price)}
            </p>
          </td>
          <td className="p-4 border-b border-blue-gray-50">
            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
              {order.quantity}
            </p>
          </td>
          <td className="p-4 border-b border-blue-gray-50">
            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
              IDR {formatIDR(order.total)}
            </p>
          </td>
          <td className="p-4 border-b border-blue-gray-50 relative">
            <RowActionsMenu
              order={order}
              isOpen={openDropdown === order.id}
              onOpen={onOpenDropdown}
              onEdit={onEdit}
              onDetail={onDetail}
              onDelete={onDelete}
              dropdownRef={dropdownRef}
            />
          </td>
        </tr>
      ))}
      {orderItems.length === 0 && (
        <tr>
          <td colSpan={TABLE_HEADERS.length} className="text-center py-5 text-gray-500">
            Tidak ada data item pesanan.
          </td>
        </tr>
      )}
    </tbody>
  </table>
);

export default OrderItemsTable;
