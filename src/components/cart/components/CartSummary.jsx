import CircularProgress from "@mui/material/CircularProgress";

const CartSummary = ({ subtotal, loadingCheckout, onCheckout }) => (
  <div className="border-t py-6 px-7 lg:px-0 md:mx-10">
    <div className="space-y-2">
      <div className="flex font-semibold justify-between">
        <p>Subtotal</p>
        <p>IDR {subtotal.toLocaleString("id-ID") || "0"}</p>
      </div>
      <p className="text-sm text-gray-500">
        Biaya pengiriman & admin dihitung di halaman pembayaran.
      </p>
      <button
        onClick={onCheckout}
        disabled={loadingCheckout}
        className={`w-full rounded-lg py-2 mt-4 transition ${
          loadingCheckout
            ? "bg-gray-300 text-gray-700 opacity-50 cursor-not-allowed"
            : "bg-black text-white"
        }`}
      >
        {loadingCheckout ? <CircularProgress size={17} color="inherit" /> : "Beli Sekarang"}
      </button>
    </div>
  </div>
);

export default CartSummary;