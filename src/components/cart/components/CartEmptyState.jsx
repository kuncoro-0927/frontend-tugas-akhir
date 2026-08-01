import { Link } from "react-router-dom";

const CartEmptyState = ({ onLinkClick }) => (
  <div className="flex flex-col items-center justify-center h-full p-10">
    <img src="/images/emptycart.svg" alt="Empty" className="w-64 mb-6" />
    <p className="text-center text-lg font-semibold">
      Oops, keranjang Anda masih kosong.
    </p>
    <Link
      to="/products/list"
      className="mt-6 bg-black text-white px-6 py-3 rounded-lg hover:bg-opacity-80 transition"
      onClick={onLinkClick}
    >
      Lanjut Belanja
    </Link>
  </div>
);

export default CartEmptyState;