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
        <div className="relative justify-center items-center flex w-full h-full overflow-hidden flex-shrink-0">
          {isLoading ? (
            <Skeleton variant="rectangular" width="100%" height={200} />
          ) : (
            <img
              className=" w-40 items-center flex  justify-center object-cover rounded-t-lg transform transition-transform duration-300 group-hover:scale-105"
              src={image}
              alt="Image"
            />
          )}

          {/* Rating di pojok kiri bawah */}
        </div>
      </div>

      {/* Bagian Konten */}
      <div className="  py-2 md:py-2 flex-grow">
        {/* Skeleton untuk Judul */}
        {isLoading ? (
          <Skeleton
            width="80%"
            height={20}
            className=" font-bold text-hitam2"
          />
        ) : (
          <h1
            className="text-sm md:text-base font-bold text-hitam2"
            title={title} // Tooltip agar bisa melihat judul lengkap saat hover
          >
            {title}
          </h1>
        )}

        {/* Bagian Bawah: From dan Harga */}
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
            <FaStar className="text-yellow-500" /> {average_rating || "5.0"} (0
            ulasan)
          </span>
          <div className="flex items-center ">
            {/* Skeleton untuk Harga */}
            {isLoading ? (
              <div className="flex items-center ml-auto">
                <Skeleton width="50%" height={20} />
              </div>
            ) : (
              <div>
                <p className="text-base font-semibold">IDR {price}</p>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="flex justify-between gap-x-3">
        <button className="border border-gray-300 flex items-center justify-center gap-2 text-sm  px-2  py-2 rounded-full w-full">
          Tambah +
        </button>
        <button className="bg-black text-sm inline-block text-white  py-2 w-full rounded-full">
          Beli
        </button>
      </div>
    </>
  );
}
