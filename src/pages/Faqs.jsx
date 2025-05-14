import AccordionFaqs from "../components/AccordionFaqs";
import { Link } from "react-router-dom";
const Faqs = () => {
  return (
    <>
      <section className="bg-gradient-to-r from-white to-birumuda px-14  py-32 flex flex-col items-center justify-center">
        {" "}
        <h1 className="text-4xl font-bold">Pusat Bantuan</h1>
        <p className="font-medium mt-2 text-6xl">
          Layanan <span className="font-extrabold">Pelanggan</span>
        </p>
        <p className="mt-2 font-semibold">
          Ada pertanyaan? Kami siap membantu Anda
        </p>
      </section>

      <section className="mx-14 mt-20 flex-col flex items-center justify-center">
        <h1 className="text-4xl font-semibold">
          Frequently Asked <span className="font-extrabold">Questions</span>
        </h1>
        <div className="mt-10 space-y-3">
          <AccordionFaqs
            title="1. Apa itu Faza Frame Pacitan?"
            content="Faza Frame Pacitan adalah UMKM yang menjual berbagai jenis figura (bingkai foto/lukisan) berkualitas, cocok untuk dekorasi rumah, hadiah, atau kebutuhan profesional. Produk kami dibuat dengan material terbaik dan desain yang estetis, dan kami beroperasi dari Pacitan, Jawa Timur."
            defaultExpanded={false}
          />
          <AccordionFaqs
            title="2. Bagaimana cara memesan produk di website ini?"
            content={
              <>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>
                    Telusuri katalog dan pilih produk figura yang diinginkan.
                  </li>
                  <li>
                    Klik tombol <strong>“Tambah ke Keranjang”</strong>.
                  </li>
                  <li>
                    Buka halaman <strong>Keranjang</strong> dan klik{" "}
                    <strong>“Lanjutkan ke Checkout”</strong>.
                  </li>
                  <li>
                    Pilih metode pengiriman: <em>Antar ke Alamat</em> atau{" "}
                    <em>Ambil Langsung (Pick Up)</em>.
                  </li>
                  <li>
                    Isi data pengiriman secara lengkap dan pilih metode
                    pembayaran.
                  </li>
                  <li>
                    Setelah pembayaran berhasil, Anda akan menerima email
                    konfirmasi dan detail pesanan.
                  </li>
                </ol>
              </>
            }
            defaultExpanded={false}
          />

          <AccordionFaqs
            title="3. Apakah Faza Frame mengirim ke seluruh Indonesia?"
            content="Ya, kami mengirimkan produk ke seluruh wilayah Indonesia menggunakan kurir terpercaya seperti JNE. Biaya ongkir dihitung otomatis saat checkout berdasarkan alamat dan berat produk."
            defaultExpanded={false}
          />
          <AccordionFaqs
            title="4. Apakah bisa mengambil pesanan langsung (Pick Up)?"
            content="Tentu. Anda bisa memilih metode 'Pick Up' saat checkout. Setelah pesanan selesai dibuat, Anda akan menerima informasi lokasi toko dan waktu pengambilan. Tidak ada biaya tambahan untuk metode ini."
            defaultExpanded={false}
          />
          <AccordionFaqs
            title="5. Berapa lama waktu pengiriman biasanya?"
            content="Waktu pengiriman tergantung lokasi tujuan, dihitung sejak pesanan dikonfirmasi dan dikirim dari Pacitan, Jawa Timur.
            Estimasi bisa berubah berdasarkan layanan reguler JNE dan bisa berbeda tergantung kondisi cuaca, volume pengiriman, atau kebijakan ekspedisi."
            defaultExpanded={false}
          />

          <AccordionFaqs
            title="6. Bagaimana saya tahu status pesanan saya?"
            content="Setelah checkout, Anda akan menerima email konfirmasi pesanan, notifikasi saat pesanan sudah dikirim dan nomor resi untuk pelacakan. Anda juga bisa login ke akun dan cek halaman 'Pesanan Saya'."
            defaultExpanded={false}
          />
          <AccordionFaqs
            title="7. Apakah saya bisa membatalkan atau mengubah pesanan?"
            content="Pesanan bisa dibatalkan selama belum dibayar atau diproses. Untuk mengganti produk atau alamat, segera hubungi customer service. Jika pesanan sudah dikirim, maka tidak dapat dibatalkan."
            defaultExpanded={false}
          />
          <AccordionFaqs
            title="8. Bagaimana jika produk yang saya terima rusak?"
            content="Kami sangat berhati-hati dalam pengemasan. Jika produk rusak segera konfirmasi ke tim kami dalam 2x24 jam. Kirimkan ke customer service kami, kami bantu proses penggantian atau pengembalian dana sesuai kebijakan"
            defaultExpanded={false}
          />
          <AccordionFaqs
            title="9. Apakah saya bisa memesan figura dengan ukuran atau desain khusus?"
            content="Untuk saat ini, pemesanan figura custom belum tersedia. Namun kami sedang mengembangkan fitur tersebut. Silakan pantau website atau Instagram kami untuk update terbaru."
            defaultExpanded={false}
          />
          <AccordionFaqs
            title="10. Apa metode pembayaran yang tersedia?"
            content="Kami menggunakan sistem pembayaran dari Midtrans: Transfer Bank (Virtual Account), E-wallet (GoPay, OVO, Dana, ShopeePay), QRIS, Kartu Kredit/Debit, Minimarket (Alfamart, Indomaret), Pembayaran dikonfirmasi otomatis tanpa perlu upload bukti."
            defaultExpanded={false}
          />
          <AccordionFaqs
            title="11. Apakah saya perlu membuat akun untuk berbelanja?"
            content="Ya, Anda perlu membuat akun untuk dapat melakukan pembelian di website kami. Dengan akun, Anda bisa melacak status pesanan, menyimpan alamat pengiriman, melihat riwayat transaksi, dan mendapatkan penawaran eksklusif dari Faza Frame Pacitan."
            defaultExpanded={false}
          />
        </div>
      </section>

      <section className="mx-14 pb-20 mt-32 flex items-center flex-col justify-center">
        <h1 className="font-semibold text-4xl">
          Masih belum menemukan jawaban?
        </h1>
        <p className="text-4xl mt-3 font-extrabold">Hubungi tim kami</p>
        <p className="text-sm font-medium text-center max-w-xl mt-2 text-gray-700">
          Tidak menemukan jawaban yang Anda cari di halaman ini? Klik tombol di
          bawah untuk menghubungi tim kami secara langsung melalui halaman
          Kontak.
        </p>

        <Link
          to="/contact"
          className="bg-black px-4 mt-10 text-white rounded-md py-3 hover:bg-black/80 duration-300"
        >
          Hubungi Kami
        </Link>
      </section>
    </>
  );
};

export default Faqs;
