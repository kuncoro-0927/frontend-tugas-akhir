import React from "react";
import FormInput from "../../../../components/ui/TextField";

const CityAutocomplete = ({
  formData,
  formErrors,
  onChange,
  onSearchCity,
  destinationResults,
  onSelectCity,
}) => {
  const filteredCities = [
    ...new Map(
      destinationResults
        .filter((city) =>
          city.city_name.toLowerCase().startsWith(formData.city.toLowerCase())
        )
        .map((item) => [item.city_name, item])
    ).values(),
  ];

  return (
    <div>
      <FormInput
        type="text"
        name="city"
        value={formData.city || ""}
        onChange={onChange}
        onBlur={() => onSearchCity(formData.city)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearchCity(formData.city);
          }
        }}
        label="Kota/Kabupaten"
        error={!!formErrors.city}
        helperText={formErrors.city}
      />

      {filteredCities.map((city) => {
        const formattedCity =
          city.city_name.charAt(0).toUpperCase() +
          city.city_name.slice(1).toLowerCase();

        return (
          <p
            key={city.id}
            onClick={() => onSelectCity(city)}
            className="px-4 py-2 hover:bg-gray-200/40  cursor-pointer border border-gray-400 rounded-sm max-h-60 overflow-y-auto mt-1"
          >
            {formattedCity}
          </p>
        );
      })}
    </div>
  );
};

export default CityAutocomplete;
