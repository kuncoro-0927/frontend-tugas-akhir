/* eslint-disable no-unused-vars */
const ContactInfoItem = ({ icon: Icon, label, value }) => (
  <>
    <div className="mt-10 flex items-center gap-5">
      <div className="bg-birumuda w-fit p-3 rounded-full">
        <Icon className="text-xl" />
      </div>
      <div className="space-y-1">
        <p className="font-bold">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
    <h1 className="border-b mt-5"></h1>
  </>
);

export default ContactInfoItem;