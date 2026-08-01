import { useState } from "react";
import { instance } from "../../../../utils/axios";

export default function useCitySearch(setFormData) {
  const [destinationResults, setDestinationResults] = useState([]);

  const searchCity = async (search) => {
    const keyword = search.trim();
    if (keyword.length < 3) return;

    try {
      const res = await instance.get("/cities", {
        params: { search: keyword },
      });
      setDestinationResults(res.data.data || []);
    } catch (error) {
      console.error("Error fetching cities:", error.message);
      setDestinationResults([]);
    }
  };

  const selectCity = (city) => {
    const formattedCity =
      city.city_name.charAt(0).toUpperCase() +
      city.city_name.slice(1).toLowerCase();

    setFormData((prev) => ({
      ...prev,
      city: formattedCity,
      city_id: city.id,
      province: city.province_name,
    }));
    setDestinationResults([]);
  };

  return { destinationResults, searchCity, selectCity };
}
