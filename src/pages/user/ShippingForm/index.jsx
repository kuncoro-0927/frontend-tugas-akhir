import React from "react";
import { useParams, useLocation } from "react-router-dom";

import useOrderDetails from "./hooks/useOrderDetails";
import useCitySearch from "./hooks/useCitySearch";
import usePromo from "./hooks/usePromo";
import useShippingForm from "./hooks/useShippingForm";

import TopBar from "./components/TopBar";
import AddressForm from "./components/AddressForm";
import OrderSummary from "./components/OrderSummary";

const ShippingForm = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const passedOrderId = location.state?.orderId || orderId;

  const { orderDetails, orderItems, totalWeight } =
    useOrderDetails(passedOrderId);

  const { promo, promoError, applyPromo } = usePromo(orderDetails);

  const {
    formData,
    setFormData,
    formErrors,
    setFormErrors,
    loadingOngkir,
    handleChange,
    setPhone,
    handleSubmit,
  } = useShippingForm({
    orderId,
    orderDetails,
    orderItems,
    totalWeight,
    promo,
  });

  const { destinationResults, searchCity, selectCity } =
    useCitySearch(setFormData);

  const handleApplyPromo = async () => {
    if (!formData.promoCode) {
      setFormErrors((prev) => ({
        ...prev,
        promoCode: "Silakan masukkan kode promo",
      }));
      return;
    }
    await applyPromo(formData.promoCode);
    setFormErrors((prev) => ({ ...prev, promoCode: "" }));
  };

  return (
    <section className="h-screen">
      <TopBar />

      <div className="flex flex-col-reverse lg:flex-row mx-7 sm:mx-12 md:mx-24 lg:mx-14 2xl:mx-32 justify-between items-start gap-6">
        <AddressForm
          formData={formData}
          formErrors={formErrors}
          onChange={handleChange}
          onPhoneChange={setPhone}
          onSubmit={handleSubmit}
          loadingOngkir={loadingOngkir}
          destinationResults={destinationResults}
          onSearchCity={searchCity}
          onSelectCity={selectCity}
        />

        <div className="lg:border-r border-b my-5 md:my-0 border-gray-300 lg:h-screen lg:mx-4 block self-stretch"></div>

        <OrderSummary
          orderItems={orderItems}
          orderDetails={orderDetails}
          formData={formData}
          formErrors={formErrors}
          onChange={handleChange}
          onApplyPromo={handleApplyPromo}
          promo={promo}
          promoError={promoError}
        />
      </div>
    </section>
  );
};

export default ShippingForm;
