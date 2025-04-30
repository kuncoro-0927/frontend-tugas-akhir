/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";
import { instance } from "../utils/axios";

const SidebarProduct = ({ onFilterChange }) => {
  const [dropdownStates, setDropdownStates] = useState([true, false, false]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(null);

  const [selectedSize, setSelectedSize] = useState("");

  const prices = [
    { label: "IDR 0 - 300.000", min: 0, max: 300000 },
    { label: "IDR 300.000 - 500.000", min: 300000, max: 500000 },
    { label: "IDR 500.000 - 1.000.000", min: 500000, max: 1000000 },
  ];

  const sizes = ["20 x 30", "30 x 40", "40 x 60"];

  const toggleDropdown = (index) => {
    setDropdownStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await instance.get("/category");
        setCategories(response.data);
      } catch (error) {
        console.error("Gagal mengambil kategori:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    onFilterChange?.({
      category: selectedCategory,
      price: selectedPrice,
      size: selectedSize,
    });
  }, [selectedCategory, selectedPrice, selectedSize]);

  return (
    <div className="text-sm border rounded-lg w-44 md:w-60 lg:w-72 p-4 border-hitam">
      {/* Kategori */}
      <button
        onClick={() => toggleDropdown(0)}
        className={`flex items-center justify-between w-full px-4 py-2 rounded-md ${
          dropdownStates[0] ? "bg-gray-200/40" : "bg-white"
        }`}
      >
        Kategori
        {dropdownStates[0] ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
      </button>

      {dropdownStates[0] && (
        <div className="mt-2 ml-3">
          <ul className="space-y-1">
            {categories.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer"
                onClick={() =>
                  setSelectedCategory(
                    item.name === selectedCategory ? "" : item.name
                  )
                }
              >
                <input
                  type="checkbox"
                  checked={selectedCategory === item.name}
                  readOnly
                />
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="border-b my-2"></div>

      {/* Harga */}
      <button
        onClick={() => toggleDropdown(1)}
        className={`flex items-center justify-between w-full px-4 py-2 rounded-md ${
          dropdownStates[1] ? "bg-gray-300/15" : "bg-white"
        }`}
      >
        Harga
        {dropdownStates[1] ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
      </button>

      {dropdownStates[1] && (
        <div className="mt-2 ml-3">
          <ul className="space-y-1">
            {prices.map((item) => (
              <li
                key={item.label}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer"
                onClick={() =>
                  setSelectedPrice(
                    selectedPrice?.label === item.label ? null : item
                  )
                }
              >
                <input
                  type="checkbox"
                  checked={selectedPrice?.label === item.label}
                  readOnly
                />
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="border-b my-2"></div>

      {/* Ukuran */}
      <button
        onClick={() => toggleDropdown(2)}
        className={`flex items-center justify-between w-full px-4 py-2 rounded-md ${
          dropdownStates[2] ? "bg-blue-300/15" : "bg-white"
        }`}
      >
        Ukuran
        {dropdownStates[2] ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
      </button>

      {dropdownStates[2] && (
        <div className="mt-2 ml-3">
          <ul className="space-y-1">
            {sizes.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer"
                onClick={() =>
                  setSelectedSize(item === selectedSize ? "" : item)
                }
              >
                <input
                  type="checkbox"
                  checked={selectedSize === item}
                  readOnly
                  className="accent-black"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SidebarProduct;
