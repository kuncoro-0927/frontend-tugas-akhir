import SearchInput from "./components/SearchInput";
import OrderItemsTable from "./components/OrderItemsTable";
import { useOrderItems } from "./hooks/useOrderItems";
import { useOrderItemsSearch } from "./hooks/useOrderItemsSearch";
import { useRowDropdown } from "./hooks/useRowDropdown";

const DataOrderItems = () => {
  const { orderItems } = useOrderItems();
  const { searchQuery, setSearchQuery, filteredOrderItems } = useOrderItemsSearch(orderItems);
  const { openDropdown, setOpenDropdown, dropdownRef } = useRowDropdown();

  // TODO: wire these to real edit/detail/delete endpoints once available.
  // The original buttons had no handlers at all — these are placeholders
  // so the UI is honest about what's implemented vs not yet.
  const handleEdit = (order) => console.log("Edit order item:", order.id);
  const handleDetail = (order) => console.log("Detail order item:", order.id);
  const handleDelete = (order) => console.log("Delete order item:", order.id);

  return (
    <div className="mt-10 px-5 text-xl font-bold">
      Data Item Pesanan
      <div className="border p-5 mt-10">
        <div className="flex items-start justify-between">
          <p className="font-semibold text-sm">Tabel Data Item Pesanan</p>
          <SearchInput value={searchQuery} onChange={setSearchQuery} />
        </div>

        <OrderItemsTable
          orderItems={filteredOrderItems}
          openDropdown={openDropdown}
          onOpenDropdown={setOpenDropdown}
          dropdownRef={dropdownRef}
          onEdit={handleEdit}
          onDetail={handleDetail}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default DataOrderItems;
