import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CiShoppingCart } from "react-icons/ci";
import { openDrawer } from "../../../../redux/cartDrawer";

const PaymentHeader = () => {
  const dispatch = useDispatch();
  return (
    <div className="border-b flex items-center justify-between px-7 md:px-32 lg:px-[75px] py-4">
      <Link to="/">
        <img className="w-10" src="/logoindex.svg" alt="" />
      </Link>
      <button
        onClick={() => dispatch(openDrawer())}
        className="relative rounded-full hover:bg-gray-200/15"
      >
        <CiShoppingCart className="text-3xl" />
      </button>
    </div>
  );
};

export default PaymentHeader;