import React from "react";
import { Link } from "react-router-dom";
const Notfound = () => {
  return (
    <div className="flex flex-col gap-10 md:flex-row justify-center items-center min-h-screen">
      <img
        className="w-80 mb-4 md:mb-0 md:mr-6"
        src="/404.svg"
        alt="404 Not Found"
      />

      <div>
        <h1 className="text-xl border-b-2 border-black w-fit font-normal mb-2">
          Error 404
        </h1>
        <p className="text-4xl font-bold">
          Sepertinya Kamu <br /> berpetualang terlalu jauh.
        </p>
        <p className="text-lg mt-2 mb-10">Ayo balik sebelum makin jauh!</p>
        <Link
          className="bg-black py-3  px-4 text-sm md:text-base rounded-lg text-white hover:bg-black/80 hover:-translate-y-1 duration-200"
          to="/"
        >
          Kembali ke beranda
        </Link>
      </div>
    </div>
  );
};

export default Notfound;
