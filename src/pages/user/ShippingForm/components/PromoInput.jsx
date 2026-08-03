import React from "react";
import FormInput from "../../../../components/ui/TextField";

const PromoInput = ({ value, onChange, error, helperText, onApply, promoError }) => {
  return (
    <>
      <div className="flex w-full gap-5 items-center">
        <FormInput
          type="text"
          label="Kode Promo"
          name="promoCode"
          value={value || ""}
          onChange={onChange}
          error={error}
          helperText={helperText}
        />
        <button
          onClick={onApply}
          className="bg-black hover:bg-black/80 text-white py-3 px-4 rounded-md"
        >
          Klaim
        </button>
      </div>

      {promoError && <p className="text-red-500 text-sm mt-1">{promoError}</p>}
    </>
  );
};

export default PromoInput;
