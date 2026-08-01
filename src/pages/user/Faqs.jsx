import { Link } from "react-router-dom";
import AccordionFaqs from "../../components/AccordionFaqs";
import { faqData } from "../../data/faqData";

const Faqs = () => (
  <>
    <section className="bg-gradient-to-r mt-16 md:mt-0 from-white to-birumuda px-14 py-32 flex flex-col items-center justify-center">
      <h1 className="text-2xl md:text-4xl font-bold">Pusat Bantuan</h1>
      <p className="font-medium text-center mt-2 text-5xl md:text-6xl">
        Layanan <span className="font-extrabold">Pelanggan</span>
      </p>
      <p className="mt-2 text-center font-semibold">
        Ada pertanyaan? Kami siap membantu Anda
      </p>
    </section>

    <section className="mx-7 md:mx-14 mt-20 flex-col flex items-center justify-center">
      <h1 className="md:text-4xl text-xl font-semibold">
        Frequently Asked <span className="font-extrabold">Questions</span>
      </h1>
      <div className="mt-10 space-y-3">
        {faqData.map((faq, index) => (
          <AccordionFaqs
            key={index}
            title={faq.title}
            content={faq.content}
            defaultExpanded={false}
          />
        ))}
      </div>
    </section>

    <section className="mx-7 md:mx-14 md:pb-20 mt-10 md:mt-32 flex items-center flex-col justify-center">
      <h1 className="font-semibold text-center text-xl md:text-4xl">
        Masih belum menemukan jawaban?
      </h1>
      <p className="md:text-4xl text-3xl text-center mt-3 font-extrabold">
        Hubungi tim kami
      </p>
      <p className="text-sm font-medium text-center max-w-xl mt-2 text-gray-700">
        Tidak menemukan jawaban yang Anda cari di halaman ini? Klik tombol di
        bawah untuk menghubungi tim kami secara langsung melalui halaman Kontak.
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

export default Faqs;