/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";
import { instance } from "../utils/axios";
import {
  Drawer,
  IconButton,
  Box,
  Typography,
  List,
  ListItem,
  Checkbox,
  Slider,
} from "@mui/material";
import { IoFilterOutline } from "react-icons/io5";
const SidebarProduct = ({ onFilterChange }) => {
  const [dropdownStates, setDropdownStates] = useState([true, false, false]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPrice, setSelectedPrice] = useState([0, 1800000]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

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
      keyword: searchTerm, // <- ini tambahan penting
    });
  }, [selectedCategory, selectedPrice, selectedSize, searchTerm]);

  const formatRupiah = (value) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      currencyDisplay: "code", // Ini penting
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <div className="text-sm border rounded-lg w-44 md:w-60 lg:w-72 p-4 border-hitam">
      <h1 className="text-base flex items-center justify-between gap-2 font-bold">
        Filter <IoFilterOutline className="font-bold text-xl" />
      </h1>
      <div className="relative mt-5 flex items-center border border-gray-400 w-full h-10 rounded-lg focus-within:border-gray-700 bg-white overflow-hidden">
        <div className="grid place-items-center h-full w-12 text-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          className="peer h-full w-full outline-none text-sm text-gray-500 pr-2"
          type="text"
          id="search"
          placeholder="Cari nama produk"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {/* Kategori */}
      <h1 className="font-semibold mt-4">Kategori</h1>
      <div className="grid mt-2 grid-cols-2 p-2 gap-2 rounded-md border">
        {categories.map((item) => (
          <button
            key={item.id}
            onClick={() =>
              setSelectedCategory(
                item.name === selectedCategory ? "" : item.name
              )
            }
            className={`w-full text-left px-4 py-2 rounded-md transition 
        ${
          selectedCategory === item.name
            ? "bg-primary text-white font-semibold"
            : " text-black"
        }`}
          >
            {item.name}
          </button>
        ))}
      </div>
      <div className="border-b my-6"></div>

      {/* Filter Harga */}
      <div>
        <h1 className="font-semibold">Harga</h1>
        <Slider
          value={selectedPrice}
          onChange={(e, newValue) => setSelectedPrice(newValue)}
          valueLabelDisplay="off"
          min={0}
          className="px-3"
          max={1000000}
          step={10000}
          sx={{ color: "#FFD858" }}
        />
        <div className="flex justify-between text-sm text-gray-700 mt-1">
          <span>{formatRupiah(selectedPrice[0])}</span>
          <span>{formatRupiah(selectedPrice[1])}</span>
        </div>
      </div>

      {/* Harga
      <button
        onClick={() => toggleDropdown(1)}
        className={`flex items-center justify-between w-full px-4 py-2 rounded-md ${
          dropdownStates[1] ? "bg-blue-300/15" : "bg-white"
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
                  className="accent-black"
                />
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )} */}

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
