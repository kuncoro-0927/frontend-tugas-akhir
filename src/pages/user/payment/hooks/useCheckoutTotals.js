export function useCheckoutTotals({ items, orderDetails, promo, promocode, selectedService }) {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = promo?.discount || promocode?.discount || 0;
  const admin = Number(orderDetails.admin_fee) || 0;
  const shipping = selectedService ? parseInt(selectedService.cost) : 0;
  const finalTotal = subtotal - discount + admin + shipping;

  return { subtotal, discount, admin, shipping, finalTotal };
}