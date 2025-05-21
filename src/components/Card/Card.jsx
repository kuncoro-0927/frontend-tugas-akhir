import { Skeleton } from "@mui/material";
import { FaStar } from "react-icons/fa6";
import { LuArrowRight } from "react-icons/lu";
import { CiShoppingCart } from "react-icons/ci";
export default function Card({
  title,
  image,
  price,
  average_rating,
  isLoading,
  status,
  stock,
}) {
  return (
    <>
      <div className=" bg-abu p-5 rounded-lg h-[300px] w-[320px] md:w-auto lg:max-h-[250px] md:max-h-[200px] relative overflow-hidden group flex flex-col">
        <div className="relative justify-center items-center flex w-full   h-full overflow-hidden flex-shrink-0">
          {isLoading ? (
            <Skeleton variant="rectangular" width="100%" height={200} />
          ) : (
            <img
              className="w-full h-full object-contain rounded-t-lg transform transition-transform duration-300 group-hover:scale-105"
              src={image}
              alt="Image"
            />
          )}
        </div>
      </div>

      {/* Bagian Konten */}
      <div className="flex justify-between items-center py-2 md:py-2 flex-grow">
        {/* Judul dengan truncate agar tidak membuat baris baru */}
        {isLoading ? (
          <Skeleton width="80%" height={20} />
        ) : (
          <h1
            className="md:text-base text-lg font-bold text-hitam2 truncate max-w-[60%]"
            title={title}
          >
            {title}
          </h1>
        )}

        {/* Harga tetap di kanan */}
        {isLoading ? (
          <Skeleton width="30%" height={20} />
        ) : (
          <p className="md:text-sm text-base  font-extrabold text-right  ml-2 whitespace-nowrap">
            IDR {price}
          </p>
        )}
      </div>

      <div className="flex items-center mb-3 justify-between">
        <div className="backdrop-blur-lg justify-between  text-black rounded-tr-lg text-sm font-medium flex items-center">
          <span className="mr-1  flex items-center gap-1">
            <FaStar className="text-yellow-300" /> {average_rating || "5.0"} (0
            ulasan)
          </span>
        </div>
        <div className="text-xs md:flex">
          {status === "sold" ? (
            <p className="bg-red-100 rounded-full px-3 py-1 text-red-600">
              <span className="">Stok</span> <span>({stock})</span>
            </p>
          ) : (
            <p className="bg-green-100 rounded-full px-3 py-1 text-green-600">
              <span className="">Stok </span>({stock})
            </p>
          )}
        </div>
      </div>
    </>
  );
}
