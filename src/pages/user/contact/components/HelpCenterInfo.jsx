import { IoLocationOutline, IoCallOutline, IoMailOutline } from "react-icons/io5";
import ContactInfoItem from "./ContactInfoItem";

const CONTACT_INFO = [
  {
    icon: IoLocationOutline,
    label: "Alamat",
    value: "Cuwik Ngampel Ploso Pacitan, Pacitan, Jawa Timur, Indonesia 63515",
  },
  { icon: IoCallOutline, label: "Nomor Telepon", value: "+62 819-3859-4567" },
  { icon: IoMailOutline, label: "Email", value: "fazaframe271@gmail.com" },
];

const HelpCenterInfo = () => (
  <div className="p-4 h-fit w-full">
    <h1 className="text-xl font-semibold">Pusat Bantuan</h1>
    <p className="text-sm mt-2 text-gray-700">
      Kami senang dapat mendengar Anda, Jangan ragu untuk menghubungi kami
      melalui cara berikut.
    </p>

    {CONTACT_INFO.map((item) => (
      <ContactInfoItem key={item.label} {...item} />
    ))}
  </div>
);

export default HelpCenterInfo;