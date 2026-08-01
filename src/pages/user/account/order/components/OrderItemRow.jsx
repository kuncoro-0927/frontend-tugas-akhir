import { Link } from "react-router-dom";
import CardImage from "../../../../../components/Card/CardImage";

const OrderItemRow = ({ ticket }) => {
  const sizeLabel = ticket.is_custom
    ? `${ticket.custom_width} x ${ticket.custom_height}`
    : `${ticket.width} x ${ticket.height}`;

  return (
    <div className="lg:flex border-b p-5 last:border-none">
      <div className="flex items-center justify-start w-full">
        <div className="lg:h-[150px] hidden p-2 md:w-[120px] h-[120px] lg:w-[150px] overflow-hidden md:flex items-center justify-center">
          <CardImage
            image={`${import.meta.env.VITE_BACKEND_URL}${ticket.image_url}`}
            isCustom={ticket.is_custom}
          />
        </div>

        <div className="flex md:hidden items-center gap-x-4">
          <div className="h-[120px] w-[120px]">
            <CardImage
              image={`${import.meta.env.VITE_BACKEND_URL}${ticket.image_url}`}
              isCustom={ticket.is_custom}
            />
          </div>
          <div>
            <h1 className="font-bold text-xs text-black/60">
              {ticket.category_name}
            </h1>
            <h1 className="font-bold w-fit max-w-[100px] text-sm">
              {ticket.quantity} x {ticket.product_name}
            </h1>
            <p className="text-xs flex items-center">
              <span className="mr-1">{sizeLabel}</span>
            </p>
            <div className="mt-2">
              <Link
                to={`/product/detail/${ticket.product_id}`}
                className="bg-black rounded-md text-white px-3 py-1.5 text-xs hover:bg-gray-800"
              >
                Pesan Lagi
              </Link>
            </div>
          </div>
        </div>

        <div className="pl-4 max-w-[350px] hidden md:flex flex-col">
          <span className="font-bold text-black/60 text-xs">
            {ticket.category_name}
          </span>
          <h1 className="font-bold text-base md:max-w-[170px] lg:max-w-max lg:text-lg">
            {ticket.product_name}
          </h1>
          <p className="text-sm mt-4 flex items-center">
            <span className="mr-1">{sizeLabel}</span>
          </p>
          <p className="text-sm mt-1 flex items-center">
            <span className="mr-1">Jumlah item:</span>{" "}
            <span>{ticket.quantity}</span>
          </p>
        </div>

        <div className="ml-auto hidden md:flex md:flex-col md:gap-y-10 justify-between items-end h-full">
          <div className="text-base font-bold">
            IDR {Number(ticket.price).toLocaleString("id-ID")}
          </div>
          <Link
            to={`/product/detail/${ticket.product_id}`}
            className="bg-black rounded-md text-white px-3 py-1.5 text-sm hover:bg-gray-800"
          >
            Pesan Lagi
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderItemRow;
