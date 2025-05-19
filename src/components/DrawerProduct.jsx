/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Drawer, Slider } from "@mui/material";
import { instance } from "../utils/axios";
import { IoCloseOutline } from "react-icons/io5";
const DrawerProduct = ({ open, onClose, onFilterChange }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPrice, setSelectedPrice] = useState([0, 1800000]);
  const [selectedSize, setSelectedSize] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const sizes = ["20 x 30", "30 x 40", "40 x 60"];

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
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div className="w-[350px] p-5" sx={{ width: 350, padding: 2 }}>
        <div className="flex  items-center justify-between">
          <h1 className="font-bold text-xl">Filter</h1>
          <button className="ml-auto" onClick={onClose}>
            <IoCloseOutline className="text-2xl" />
          </button>
        </div>

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

        <div className="mt-5">
          <h1 className="font-semibold">Kategori</h1>
          <div className="grid mt-4 grid-cols-2 p-2 gap-2 rounded-md border">
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
        </div>

        <div className="border-b border-gray-00 my-6"></div>

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

        <div className="mt-6">
          <h1 className="font-semibold">Ukuran</h1>
          <div className=" mt-4 flex flex-wrap gap-3 ">
            {sizes.map((item) => (
              <button
                key={item}
                onClick={() =>
                  setSelectedSize(item === selectedSize ? "" : item)
                }
                className={`w-fit text-left px-4 py-2 rounded-md transition 
          ${
            selectedSize === item
              ? "bg-primary text-white font-semibold"
              : "text-black border"
          }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default DrawerProduct;
