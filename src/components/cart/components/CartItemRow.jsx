import CardImage from "../../Card/CardImage";
import QuantitySelector from "./QuantitySelector";

const CartItemRow = ({ item, onIncrease, onDecrease }) => (
  <div className="flex items-start gap-4 mb-10 rounded-lg transition">
    <div className="h-[90px] w-[90px] flex-shrink-0 relative">
      <CardImage
        image={`${import.meta.env.VITE_BACKEND_URL}${item.product_image}`}
        alt={item.name}
        isCustom={item.is_custom}
      />
    </div>
    <div className="flex flex-col justify-between w-full h-[110px]">
      <p className="font-bold max-w-[250px]">{item.product_name}</p>

      {item.is_custom === 1 ? (
        <div className="text-sm">
          <p>
            {item.custom_width} x {item.custom_height} (cm)
          </p>
          {item.custom_notes && (
            <p className="italic text-gray-500">"{item.custom_notes}"</p>
          )}
        </div>
      ) : (
        <p className="text-sm">
          {item.width} x {item.height} (cm)
        </p>
      )}

      <div className="flex justify-between items-end mt-auto">
        <div className="border-b-2 border-black px-2">
          <QuantitySelector
            quantity={item.quantity}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
          />
        </div>
        <p className="font-medium">
          IDR{" "}
          {Number(
            item.is_custom ? item.custom_price : item.price,
          ).toLocaleString("id-ID")}
        </p>
      </div>
    </div>
  </div>
);

export default CartItemRow;
