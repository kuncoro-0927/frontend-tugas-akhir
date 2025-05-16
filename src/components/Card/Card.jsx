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
}) {
  return (
    <>
      <div className=" bg-abu  rounded-lg h-full max-h-[280px]  lg:max-h-[250px] md:max-h-[300px] relative overflow-hidden group flex flex-col">
        <div className="relative justify-center items-center flex w-full   h-full overflow-hidden flex-shrink-0">
          {isLoading ? (
            <Skeleton variant="rectangular" width="100%" height={200} />
          ) : (
            <img
              className=" w-40 items-center flex  justify-center object-cover rounded-t-lg transform transition-transform duration-300 group-hover:scale-105"
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
            className="text-sm md:text-base font-bold text-hitam2 truncate max-w-[60%]"
            title={title}
          >
            {title}
          </h1>
        )}

        {/* Harga tetap di kanan */}
        {isLoading ? (
          <Skeleton width="30%" height={20} />
        ) : (
          <p className="text-sm font-extrabold text-right  ml-2 whitespace-nowrap">
            IDR {price}
          </p>
        )}
      </div>

      {isLoading ? (
        <Skeleton
          variant="text"
          width="50%"
          height={30}
          className="backdrop-blur-lg text-black rounded-tr-lg text-sm font-medium flex items-center"
        />
      ) : (
        <div className="backdrop-blur-lg justify-between mb-3 text-black rounded-tr-lg text-sm font-medium flex items-center">
          <span className="mr-1 flex items-center gap-1">
            <FaStar className="text-yellow-300" /> {average_rating || "5.0"} (0
            ulasan)
          </span>
        </div>
      )}
    </>
  );
}
