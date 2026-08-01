import { Link } from "react-router-dom";

const OrderEmptyState = () => (
  <div className="mt-10 w-full flex flex-col items-center">
    <p className="text-hitam text-xl lg:text-2xl font-extrabold">
      Anda belum memiliki pesanan
    </p>
    <img className="w-64 mt-7" src="/images/noproduct.svg" alt="Agenda" />
    <p className="text-center mt-5 font-medium">
      Yuk, mulai perjalanan belanjamu!
      <br /> Temukan produk menarik di toko kami
    </p>
    <Link
      to="/products/list"
      className="bg-black text-sm text-white px-6 mt-10 py-1.5 hover:bg-black/80 hover:-translate-y-1 duration-500 rounded-md"
    >
      Eksplor
    </Link>
  </div>
);

export default OrderEmptyState;