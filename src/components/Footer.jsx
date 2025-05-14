import React from "react";
import { FaInstagram } from "react-icons/fa";
import { TiSocialFacebook } from "react-icons/ti";
const Footer = () => {
  return (
    <div>
      <footer className="mt-20 mx-14">
        <div className="flex gap-24 Justify-start items-start mx-[14px] text-sm">
          <div className="max-w-sm  w-fit ">
            <h1 className="font-bold text-lg mb-3">Bantuan</h1>
            <p className="font-semibold">Hubungi Kami</p>
            <p className="font-semibold">Faqs</p>
            <div className="mt-10">
              <h1 className="mb-3 text-sm text-gray-600">Ikuti Kami</h1>
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-black text-white text-2xl inline-block p-2">
                  <FaInstagram />
                </div>
                <div className="rounded-full bg-black text-white text-2xl inline-block p-2">
                  <TiSocialFacebook />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2 w-72">
            <p className="font-bold text-base mb-3">Customer Service</p>
            <p className="text-sm font-semibold text-gray-700">
              Jangan sungkan untuk hubungi tim kami di <br />
              Weekday: 08.00 WIB - 21.00 WIB <br />
              Weekend: 09.00 WIB - 20.00 WIB
            </p>
          </div>
          <div className="flex  ">
            <div className="space-y-2">
              <h1 className="font-bold text-base mb-3">Metode Pembayaran</h1>
              <div className="grid grid-cols-4 gap-3">
                {[
                  "bca.svg",
                  "bni.svg",
                  "bri.svg",
                  "mandiri.svg",
                  "permata.jpg",
                  "qris.svg",
                  "dana.svg",
                  "ovo.svg",
                  "gopay.svg",
                  "linkaja.jpg",
                ].map((img, index) => (
                  <div
                    key={index}
                    className="bg-white border w-20 h-12 flex items-center justify-center p-3"
                  >
                    <img
                      src={`/images/${img}`}
                      alt={img}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="border-t mt-10 pb-10"></div>
      </footer>
    </div>
  );
};

export default Footer;
