import AccordionTransition from "../components/Accordion";

const WhyChooseUs = () => (
  <section className="py-6 md:py-8 2xl:py-16 md:flex justify-start mx-7 sm:mx-12 lg:mx-14 2xl:mx-32 md:mx-24 md:gap-10 lg:gap-32">
    <div>
      <img
        src="/public/images/bg-4.jpg"
        className="w-[550px] h-[350px] object-cover rounded-2xl"
        alt=""
      />
    </div>
    <div className="mt-10 md:mt-0">
      <h1 className="text-2xl md:text-3xl font-extrabold">Kenapa Faza Frame?</h1>
      <p className="border-b pb-4 mt-3">
        Setiap foto, karya, dan momen punya cerita. Kami bantu kamu
        membingkainya jadi lebih berarti.
      </p>
      <div className="lg:w-[500px]">
        <AccordionTransition />
      </div>
    </div>
  </section>
);

export default WhyChooseUs;