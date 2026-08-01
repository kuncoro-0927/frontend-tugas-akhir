import { useState } from "react";

export function useExpandedOrder() {
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const toggleExpand = (orderId) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  return { expandedOrderId, toggleExpand };
}
