import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setCheckoutItems } from "../../../redux/checkoutSlice";

import PaymentHeader from "./components/PaymentHeader";
import ShippingCourierSection from "./components/ShippingCourierSection";
import ShippingServiceModal from "./components/ShippingServiceModal";
import PaymentMethodInfo from "./components/PaymentMethodInfo";
import OrderSummary from "./components/OrderSummary";
import { useCheckoutTotals } from "./hooks/useCheckoutTotals";
import { usePromoCode } from "./hooks/usePromoCode";
import { usePayment } from "./hooks/usePayment";
import { useDispatch } from "react-redux";

const Payment = () => {
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const [open, setOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const { items, admin_fee, promo, formData, shippingOptions, orderDetails } =
    useSelector((state) => state.checkout);

  const { subtotal, admin, shipping, finalTotal } = useCheckoutTotals({
    items,
    orderDetails,
    promo,
    promocode: null, // set below once promocode exists
    selectedService,
  });

  const {
    promocode,
    promoError,
    promoCodeInput,
    setPromoCodeInput,
    handleApplyPromo,
    handleCancelPromo,
  } = usePromoCode({ finalTotal });

  const { handlePayment } = usePayment({
    orderId,
    formData,
    admin,
    promo,
    promocode,
    finalTotal,
    items,
  });

  const handleServiceChange = (service) => {
    setSelectedService(service);
    dispatch(
      setCheckoutItems({
        items,
        orderDetails,
        formData,
        shippingOptions: shippingOptions.map((option) =>
          option.service === service.service
            ? { ...option, selected: true }
            : { ...option, selected: false },
        ),
        admin_fee,
        promo,
        selectedService: service,
      }),
    );
  };

  return (
    <section className="h-screen">
      <PaymentHeader />

      <div className="flex flex-col-reverse lg:flex-row lg:space-x-20 mx-7 md:mx-32 lg:mx-[75px] justify-between">
        <div className="max-w-[700px] mb-10 lg:mt-10 w-full">
          <ShippingCourierSection
            formData={formData}
            selectedService={selectedService}
            onOpenModal={() => setOpen(true)}
          />

          <PaymentMethodInfo />

          <ShippingServiceModal
            open={open}
            onClose={() => setOpen(false)}
            shippingOptions={shippingOptions}
            selectedService={selectedService}
            onSelectService={handleServiceChange}
          />

          <button
            className="py-3 w-full bg-black text-white mt-10 rounded-lg"
            onClick={() => handlePayment(selectedService)}
          >
            Bayar Sekarang
          </button>
        </div>

        <div className="lg:border-r border-b my-5 lg:my-0 border-gray-300 lg:h-[130vh] lg:mx-4 lg:self-stretch"></div>

        <OrderSummary
          items={items}
          subtotal={subtotal}
          admin={admin}
          shipping={shipping}
          selectedService={selectedService}
          promo={promo}
          promocode={promocode}
          promoError={promoError}
          promoCodeInput={promoCodeInput}
          onPromoInputChange={setPromoCodeInput}
          onPromoAction={promo || promocode ? handleCancelPromo : handleApplyPromo}
          finalTotal={finalTotal}
        />
      </div>
    </section>
  );
};

export default Payment;