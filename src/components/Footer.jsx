import React from "react";
import { FaInstagram } from "react-icons/fa";
import { TiSocialFacebook } from "react-icons/ti";
const Footer = () => {
  return (
    <div>
      <footer className="mt-20">
        <div className="flex items-start mx-[75px] text-sm">
          <div className="max-w-sm ">
            <h1 className="font-bold text-lg mb-5">Faza Frame</h1>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Doloremque, saepe.
            </p>
          </div>
          <div className="flex ml-auto gap-32">
            <ul className="space-y-2">
              <li className="font-bold text-base">Menu</li>
              <li>Beranda</li>
              <li>Produk</li>
              <li>FAQ</li>
              <li>Kontak</li>
            </ul>
            <ul className="space-y-2">
              <li className="font-bold text-base">Support</li>
              <li>Bantuan & Dukungan</li>
              <li>Syarat & Ketentuan</li>
              <li>Cara Pembayaran</li>
              <li>Pengiriman & Ongkos Kirim</li>
            </ul>
          </div>
          <div className="mt-auto ml-auto">
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
        <div className="border-t mt-10 pb-10"></div>
      </footer>
    </div>
  );
};

export default Footer;
