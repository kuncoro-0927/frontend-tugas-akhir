import { Link } from "react-router-dom";

const WishlistEmptyState = () => (
  <div className="mt-10 w-full flex flex-col items-center">
    <p className="text-xl lg:text-2xl font-semibold">
      Anda belum menyukai figura apa pun
    </p>
    <img className="w-64 mt-7" src="/images/nolike.svg" alt="Agenda" />
    <p className="text-center mt-5 font-medium">
      Temukan figura favorit Anda dan tekan ikon hati untuk <br />
      menambahkannya ke daftar favorit!
    </p>
    <Link
      to="/products/list"
      className="bg-black text-sm text-white px-6 mt-10 py-1.5 hover:bg-black/80 hover:-translate-y-1 duration-500 rounded-md"
    >
      Eksplor
    </Link>
  </div>
);

export default WishlistEmptyState;
