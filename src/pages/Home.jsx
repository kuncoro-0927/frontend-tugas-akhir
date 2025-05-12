import React from "react";
import { GoArrowUpRight } from "react-icons/go";

import Card from "../components/Card/Card";
import { DataFigura } from "../data/DataDummy";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { FaShippingFast } from "react-icons/fa";
import AccordionTransition from "../components/Accordion";
import SwiperCardReview from "../components/SwiperCardReview";

const Home = () => {
  return (
    <>
      <section className="mt-10 mx-14">
        <div className="flex justify-between gap-10">
          <div className=" w-full py-5 rounded-2xl">
            <h1 className="font-semibold text-6xl max-w-lg">
              <span className="font-semibold">
                Buat Setiap Sudut Ruang{" "}
                <span className="font-bold">Lebih Elegan</span>{" "}
              </span>{" "}
            </h1>
            <p className="mt-7 font-medium">
              Hadirkan kesan rapi dan berkelas di ruangan Anda dengan berbagai
              pilihan figura yang sesuai untuk beragam gaya penataan interior.
            </p>

            <div className="flex items-center  mt-7">
              <button className="bg-black rounded-full text-sm text-white text-center px-4 py-2.5">
                Beli Sekarang
              </button>
              <button className="bg-black rounded-full text-white p-2.5 flex items-center justify-center">
                <GoArrowUpRight className="text-lg" />
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-b from-coklat to-birulaut w-full flex justify-center p-7 rounded-2xl">
            <img src="/public/images/home.png" className="w-[350px]" alt="" />
          </div>
        </div>
      </section>

      <section className="mt-20">
        <h1 className="flex justify-center  text-3xl font-extrabold">
          Keuntungan Kami
        </h1>
        <div className="flex  justify-center space-x-5 flex-wrap mx-14 mt-20">
          <div className="text-center w-[270px]">
            <div className="bg-birumuda inline-block p-8 rounded-full">
              {" "}
              <img className="w-12 h-12" src="/images/shipping.svg" alt="" />
            </div>

            <h2 className="text-base font-bold">Pengiriman Fleksibel</h2>
            <p className="text-sm">
              Bebas pilih mau ambil di tempat <br /> atau antar aja
            </p>
          </div>
          <div className="text-center  w-[270px]">
            <div className="bg-birumuda inline-block p-8 rounded-full">
              <img className="w-12 h-12" src="/images/ongkir.svg" alt="" />
            </div>

            <h2 className="text-base font-bold">
              Free Ongkir Area Kota Pacitan
            </h2>
            <p className="text-sm">
              Tanpa biaya kirim untuk semua pesanan di area Kota Pacitan.
            </p>
          </div>
          <div className="text-center w-[270px]">
            <div className="bg-birumuda inline-block p-8 rounded-full">
              <img className="w-12 h-12" src="/images/payment.svg" alt="" />
            </div>

            <h2 className="text-base font-bold">Pembayaran Aman</h2>
            <p className="text-sm">Pembayaran mudah dan aman via Midtrans.</p>
          </div>
          <div className="text-center  w-[270px]">
            <div className="bg-birumuda inline-block p-8 rounded-full">
              {" "}
              <img className="w-12 h-12" src="/images/tracking.svg" alt="" />
            </div>

            <h2 className="text-base font-bold">Tracking Real-Time</h2>
            <p className="text-sm">
              Lacak status pesananmu dengan mudah, kapan saja.
            </p>
          </div>
        </div>
      </section>
      <section className="mt-28 mx-14 ">
        <div className="flex justify-between items-center">
          <div>
            <h1 className=" font-bold text-3xl">Figura Terbaru</h1>
            <p className="">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil,
              ratione!
            </p>
          </div>
          <button className="border border-gray-300 py-2 px-5 rounded-full text-sm hover:-translate-y-1 duration-300">
            Lihat semua
          </button>
        </div>
        <div className="hidden md:hidden mt-10 lg:grid lg:grid-cols-3  lg:justify-between lg:w-full lg:gap-y-28 lg:gap-x-10">
          {" "}
          {Array.isArray(DataFigura) &&
            DataFigura.slice(0, 6).map((agrotourismItem, index) => (
              <div key={agrotourismItem.id || index} className="relative ">
                {/* Link hanya membungkus card tanpa ikon wishlist */}
                <Link to={`/wisata/detail/${agrotourismItem.id}`}>
                  <Card
                    title={agrotourismItem.title}
                    image={agrotourismItem.image}
                    price={Number(agrotourismItem.price || 0).toLocaleString(
                      "id-ID"
                    )}
                    average_rating={
                      agrotourismItem.average_rating
                        ? parseFloat(agrotourismItem.average_rating).toFixed(1)
                        : "0.0"
                    }
                  />
                </Link>

                <div className="absolute top-2 right-2">
                  <IconButton className="p-2">
                    <FavoriteIcon className="" sx={{ width: 28, height: 28 }} />
                  </IconButton>
                </div>
              </div>
            ))}
        </div>
      </section>

      <section className="mt-52 flex justify-center mx-14 gap-32">
        <div>
          <img
            src="/public/images/bg-4.jpg"
            className="w-[550px] h-[350px] object-cover rounded-2xl"
            alt=""
          />
        </div>
        <div className="">
          <h1 className="text-3xl font-bold">Kenapa Faza Frame?</h1>
          <p className="border-b pb-4 mt-3">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam,
            nam?
          </p>
          <div className="w-[500px]">
            <AccordionTransition />
          </div>
        </div>
      </section>

      <section className="mx-7 md:mx-6 lg:mx-14 bg-cover 2xl:mx-32 mt-10 justify-center lg:mt-20">
        <h1 className="text-xl sm:text-3xl font-bold md:text-4xl mb-7 md:mb-10 lg:mb-20 text-hitam">
          Apa kata pelanggan
        </h1>

        <SwiperCardReview />
      </section>

      <section className="mt-20 mx-14">
        <div className="text-center font-medium text-3xl">
          Berlangganan untuk mendapatkan{" "}
          <span className="font-bold">berita</span> dan <br /> penawaran{" "}
          <span className="font-bold">eksklusif.</span>
        </div>
        <div className="flex justify-center mt-6 gap-5">
          <img className="w-10" src="/public/images/mail.png" alt="" />
          <input
            type="text"
            placeholder="Masukkan email Anda"
            className="py-2 px-4 border rounded-full border-gray-300 w-96"
            id=""
          />
          <button className="py-2 px-4 rounded-full bg-black text-white text-sm">
            Berlangganan
          </button>
        </div>
      </section>
    </>
  );
};

export default Home;
