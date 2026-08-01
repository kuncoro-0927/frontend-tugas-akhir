import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TfiClose } from "react-icons/tfi";
import { closeDrawer } from "../../redux/cartDrawer";
import CartItemRow from "./components/CartItemRow";
import CartEmptyState from "./components/CartEmptyState";
import CartSummary from "./components/CartSummary";
import { useCartItems } from "./hooks/useCartItems";
import { useCheckout } from "./hooks/useCheckout";

const Cart = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.cartDrawer.isDrawerOpen);
  const handleCloseDrawer = () => dispatch(closeDrawer());

  const { cartItems, updateQuantity, subtotal } = useCartItems(isOpen);
  const { loadingCheckout, handleCheckout } = useCheckout({
    cartItems,
    onSuccess: handleCloseDrawer,
  });

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={handleCloseDrawer}
      />

      <div
        className={`fixed top-0 right-0 z-[100] h-full w-full max-w-[500px] bg-white shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
      >
        <button className="flex justify-end items-center px-6 py-7" onClick={handleCloseDrawer}>
          <TfiClose className="text-lg" />
        </button>

        {cartItems.length > 0 ? (
          <>
            <div className="flex-1 overflow-y-auto pt-2 pb-5 px-7 md:px-10 space-y-4">
              {cartItems.map((item) => (
                <CartItemRow
                  key={item.id}
                  item={item}
                  onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                  onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
                />
              ))}
            </div>
            <CartSummary
              subtotal={subtotal}
              loadingCheckout={loadingCheckout}
              onCheckout={handleCheckout}
            />
          </>
        ) : (
          <CartEmptyState onLinkClick={handleCloseDrawer} />
        )}
      </div>
    </>
  );
};

export default Cart;