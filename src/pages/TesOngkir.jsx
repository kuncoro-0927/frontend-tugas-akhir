import { useState } from "react";
import { instance } from "../utils/axios";
import debounce from "lodash.debounce"; // Import debounce dari lodash

const OngkirChecker = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [weight, setWeight] = useState("");
  const [courier, setCourier] = useState("jne");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [originCityResults, setOriginCityResults] = useState([]);
  const [destinationCityResults, setDestinationCityResults] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  // Debounced function untuk mencari kota origin
  const debouncedSearchOrigin = debounce(async (cityName) => {
    try {
      const response = await instance.get(`/cities`, {
        params: { search: cityName },
      });
      setOriginCityResults(response.data.data || []);
    } catch (error) {
      console.error("Error fetching origin city:", error);
    }
  }, 500);

  // Debounced function untuk mencari kota destination
  const debouncedSearchDestination = debounce(async (cityName) => {
    try {
      const response = await instance.get(`/cities`, {
        params: { search: cityName, limit: 10 },
      });
      setDestinationCityResults(response.data.data || []);
    } catch (error) {
      console.error("Error fetching destination city:", error);
    }
  }, 500);

  // Handle pencarian origin city
  const handleOriginChange = (e) => {
    const cityName = e.target.value;
    setOrigin(cityName);
  };

  // Handle pencarian destination city
  const handleDestinationChange = (e) => {
    const cityName = e.target.value;
    setDestination(cityName);
  };

  const handleOriginSelect = (city) => {
    setOrigin(city.id); // Pastikan menyimpan ID kota
    setOriginCityResults([]); // Clear results setelah memilih kota
  };

  const handleDestinationSelect = (city) => {
    setDestination(city.id); // Pastikan menyimpan ID kota
    setDestinationCityResults([]); // Clear results setelah memilih kota
  };

  // Fungsi untuk memulai pencarian kota origin
  const handleSearchOrigin = () => {
    debouncedSearchOrigin(origin);
  };

  // Fungsi untuk memulai pencarian kota destination
  const handleSearchDestination = () => {
    debouncedSearchDestination(destination);
  };

  const handleCheck = async () => {
    if (!origin || !destination || !weight || !courier) {
      alert("Semua field harus diisi!");
      return;
    }

    setLoading(true);

    try {
      const response = await instance.post("/calculate-shipping", {
        origin: parseInt(origin),
        destination: parseInt(destination),
        weight: parseInt(weight),
        courier,
      });
      console.log("Respon dari server:", response.data);
      setResults(response.data.data);
    } catch (error) {
      console.error("Error calculating shipping:", error);
      alert("Gagal cek ongkir");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-40">
      <div
        className="pt-40"
        style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}
      >
        <h2>Cek Ongkir</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "flex", gap: "1rem" }}>
            <input
              type="text"
              placeholder="Origin City"
              value={origin}
              onChange={handleOriginChange}
            />
            <button onClick={handleSearchOrigin}>Search</button>
          </div>
          <ul>
            <ul>
              {Array.from(
                new Map(
                  originCityResults.map((city) => [
                    city.city_name + city.province_name, // key unik
                    city,
                  ])
                ).values()
              ).map((city) => (
                <button
                  key={city.city_name + city.province_name}
                  onClick={() => handleOriginSelect(city)}
                  style={{
                    display: "block",
                    margin: "4px 0",
                    cursor: "pointer",
                  }}
                >
                  <p>
                    {city.city_name} - {city.province_name}
                  </p>
                </button>
              ))}
            </ul>
          </ul>
          <div style={{ display: "flex", gap: "1rem" }}>
            <input
              type="text"
              placeholder="Destination City"
              value={destination}
              onChange={handleDestinationChange}
            />
            <button onClick={handleSearchDestination}>Search</button>
          </div>
          <ul>
            <ul>
              {destinationCityResults.map((city) => (
                <button
                  key={city.id}
                  onClick={() => handleDestinationSelect(city)}
                >
                  <p>{city.city_name}</p> - {city.province_name}{" "}
                </button>
              ))}
            </ul>
          </ul>
          <input
            type="number"
            placeholder="Weight (gram)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          <select value={courier} onChange={(e) => setCourier(e.target.value)}>
            <option value="jne">JNE</option>
            <option value="jnt">JNT</option>
            <option value="tiki">TIKI</option>
          </select>
          <button onClick={handleCheck} disabled={loading}>
            {loading ? "Loading..." : "Cek Ongkir"}
          </button>
        </div>

        <hr style={{ margin: "2rem 0" }} />

        <h3>Hasil:</h3>
        {results.length > 0 ? (
          <ul>
            {results.map((service, index) => (
              <li key={index}>
                <strong>{service.service}</strong> ({service.description})<br />
                Kurir: {service.name} <br />
                Biaya: Rp {service.cost.toLocaleString()} <br />
                Estimasi: {service.etd} <br />
                <button onClick={() => setSelectedService(service)}>
                  Pilih Layanan Ini
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Belum ada hasil.</p>
        )}

        {selectedService && (
          <div style={{ marginTop: "1rem" }}>
            <h3>Kurir yang Anda pilih:</h3>
            <p>
              <strong>{selectedService.service}</strong> -{" "}
              {selectedService.description}
              <br />
              Kurir: {selectedService.name}
              <br />
              Biaya: Rp {selectedService.cost.toLocaleString()}
              <br />
              Estimasi: {selectedService.etd}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default OngkirChecker;
