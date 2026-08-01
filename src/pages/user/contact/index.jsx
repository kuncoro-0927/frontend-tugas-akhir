import ContactHero from "./components/ContactHero";
import ContactForm from "./components/ContactForm";
import HelpCenterInfo from "./components/HelpCenterInfo";
import { useContactForm } from "./hooks/useContactForm";

const Contact = () => {
  const { form, loading, feedbackMsg, handleChange, handleSubmit } = useContactForm();

  return (
    <>
      <ContactHero />

      <section className="lg:justify-center lg:mx-32 2xl:mx-52 mx-4 mt-10 lg:mt-28 flex flex-col-reverse md:grid md:grid-cols-2 gap-10">
        <ContactForm
          form={form}
          loading={loading}
          feedbackMsg={feedbackMsg}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
        <HelpCenterInfo />
      </section>
    </>
  );
};

export default Contact;