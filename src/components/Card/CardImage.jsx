import { Skeleton } from "@mui/material";

export default function CardImage({
  image,
  isLoading,
  width = "w-full",
  height = "h-full",
  quantity = null,
  isCustom,
}) {
  return (
    <div
      className={`relative bg-abu p-2.5 md:p-2 border border-gray-300 rounded-lg overflow-visible group flex flex-col ${width} ${height}`}
    >
      {/* Badge jumlah */}
      {quantity && (
        <div className="absolute top-0 right-0 z-50 translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-80 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md">
          {quantity}
        </div>
      )}

      {isCustom === 1 && (
        <div className="absolute -top-2 -left-2 z-50 bg-black px-2 py-0.5 text-white text-xs">
          Custom
        </div>
      )}

      {/* Kontainer gambar */}
      <div className="w-full h-full flex items-center justify-center overflow-visible">
        {isLoading ? (
          <Skeleton variant="rectangular" width="100%" height={200} />
        ) : (
          <img
            className="w-full h-full object-contain"
            src={image}
            alt="Image"
          />
        )}
      </div>
    </div>
  );
}
