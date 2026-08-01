import AccordionTransition from "../components/Accordion";

const WhyChooseUs = () => (
  <section className="lg:mt-32 md:mt-16 md:flex justify-center mx-7 lg:mx-14 md:mx-10 md:gap-10 lg:gap-32">
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