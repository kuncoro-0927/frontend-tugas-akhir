import FormInput from "../../../../components/ui/TextField";
import CardImage from "../../../../components/Card/CardImage";

const formatIDR = (value) =>
  Number(value).toLocaleString("id-ID", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const OrderSummary = ({
  items,
  subtotal,
  admin,
  shipping,
  selectedService,
  promo,
  promocode,
  promoError,
  promoCodeInput,
  onPromoInputChange,
  onPromoAction,
  finalTotal,
}) => (
  <div className="space-y-3 lg:sticky mt-5 md:mt-10 lg:mt-0 lg:top-28 md:self-start lg:max-w-[380px] w-full">
    <h1 className="text-xl font-bold mb-5">Ringkasan Pesanan</h1>
    {items.map((item, index) => (
      <div
        className={`flex items-center gap-5 pb-3 ${
          index !== items.length - 1 ? "border-b" : ""
        }`}
        key={item.product_id}
      >
        <CardImage
          image={`${import.meta.env.VITE_BACKEND_URL}${item.image_url}`}
          width="w-[76px]"
          height="h-[64px]"
          quantity={item.quantity}
        />
        <div className="max-w-[380px] w-full">
          <div className="flex justify-between items-center">
            <p className="text-base max-w-[120px] md:max-w-[180px] font-bold">
              {item.product_name}
            </p>
            <p className="font-semibold text-sm">
              IDR {formatIDR(item.price)}
            </p>
          </div>
          <p className="text-xs">{item.size}</p>
        </div>
      </div>
    ))}

    <div className="flex w-full gap-5 items-center">
      <FormInput
        type="text"
        label="Kode Promo"
        name="promoCode"
        value={promo ? promo.code : promocode ? promocode.code : promoCodeInput}
        onChange={(e) => onPromoInputChange(e.target.value)}
        disabled={promo || promocode}
      />
      <button onClick={onPromoAction} className="bg-black text-white py-3 px-4 rounded-md">
        {promo || promocode ? "Batalkan" : "Klaim"}
      </button>
    </div>

    <div className="w-full pt-3 text-sm h-fit">
      <div className="flex justify-between">
        <p className="text-sm">Subtotal</p>
        <span>{subtotal != null ? `IDR ${formatIDR(subtotal)}` : "Loading..."}</span>
      </div>

      <div className="flex mt-2 justify-between">
        <p className="text-sm">Biaya admin</p>
        <span>{admin != null ? `IDR ${formatIDR(admin)}` : "Loading..."}</span>
      </div>

      <div className="flex mt-2 justify-between">
        <p className="text-sm">Biaya pengiriman</p>
        <span>{selectedService ? `IDR ${formatIDR(shipping)}` : "Belum dipilih"}</span>
      </div>

      {promoError && <p className="text-red-500 text-sm mt-1">{promoError}</p>}

      {promo && (
        <p className="text-green-600 flex items-center justify-between text-sm mt-1">
          <span>
            Promo <strong>{promo.code}</strong>
          </span>
          <strong>- IDR {formatIDR(promo.discount)}</strong>
        </p>
      )}
      {promocode && (
        <p className="text-green-600 flex items-center justify-between text-sm mt-1">
          <span>
            Promo <strong>{promocode.code}</strong>
          </span>
          <strong>- IDR {formatIDR(promocode.discount)}</strong>
        </p>
      )}

      <div className="border-b hidden md:block mt-5"></div>

      <div className="flex mt-5 justify-between font-semibold text-lg">
        <p>Total</p>
        <span>IDR {Number(finalTotal).toLocaleString("id-ID", { minimumFractionDigits: 2 })}</span>
      </div>
    </div>
  </div>
);

export default OrderSummary;