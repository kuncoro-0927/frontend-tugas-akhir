import { GoArrowUpRight } from "react-icons/go";
import { PiAngleBold } from "react-icons/pi";
import { FaShippingFast } from "react-icons/fa";
import { FaLocationDot, FaCircleCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Hero = () => (
  <section className="mt-12 md:mt-8 py-6 md:py-8 2xl:py-16 mx-7 sm:mx-12 md:mx-24 lg:mx-14 2xl:mx-32">
    <div className="lg:flex md:justify-between md:gap-8 lg:gap-20">
      <div className="w-full py-5 rounded-2xl">
        <h1 className="font-bold text-5xl md:text-5xl lg:text-6xl max-w-lg">
          <span>
            Buat Sudut Rumah <PiAngleBold className="inline text-6xl" /> Anda
            Lebih elegan
          </span>
        </h1>

        <p className="lg:mt-7 md:mt-5 text-base md:text-sm lg:text-base font-medium">
          Hadirkan kesan rapi dan berkelas di ruangan Anda dengan berbagai
          pilihan figura yang sesuai untuk beragam gaya penataan interior.
        </p>

        <div className="flex items-center mt-7">
          <Link
            to="/products/list"
            className="bg-black rounded-full text-sm text-white text-center px-4 py-2.5"
          >
            Beli Sekarang
          </Link>
          <button className="bg-black rounded-full text-white p-2.5 flex items-center justify-center">
            <GoArrowUpRight className="text-lg" />
          </button>
        </div>

        <div className="flex mt-5 lg:mt-20 items-start md:items-center justify-between w-full bg-white rounded-md text-sm py-3">
          <div className="pr-2 md:pr-4">
            <p className="font-semibold text-base md:text-sm lg:text-base">Pengiriman</p>
            <p className="flex text-sm md:text-xs items-center gap-2">
              <FaShippingFast className="text-primary text-base" /> Cepat
            </p>
          </div>
          <div className="w-[0.5px] h-10 bg-gray-300"></div>
          <div className="px-2 md:px-4">
            <p className="font-semibold text-base md:text-sm lg:text-base">Status</p>
            <p className="flex text-sm md:text-xs items-center gap-2">
              <FaLocationDot className="text-primary text-base" /> Real-time
            </p>
          </div>
          <div className="w-[0.5px] h-10 bg-gray-300"></div>
          <div className="pl-2 md:pl-4">
            <p className="font-semibold text-base md:text-sm lg:text-base">Pembayaran</p>
            <p className="flex text-sm md:text-xs items-center gap-2">
              <FaCircleCheck className="text-primary text-base" /> Aman
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-b from-coklat to-birulaut w-full flex justify-center p-14 md:p-14 lg:p-20 rounded-2xl">
        <img src="/kuda.png" className="md:w-[250px] sm:w-[200px] lg:w-[280px] object-contain" alt="" />
      </div>
    </div>
  </section>
);

export default Hero;