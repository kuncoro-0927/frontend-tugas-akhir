import SidebarAccount from "../../../../components/SidebarforAccount";
import ProfileFormFields from "./components/ProfileFormFields";
import { useProfileForm } from "./hooks/useProfileForm";

const Profile = () => {
  const { formData, error, isSubmitted, handleChange, handleSubmit } = useProfileForm();

  return (
    <section className="flex mt-16 md:mt-0 md:mb-0 mb-10 2xl:mx-32">
      <div className="hidden sm:block md:block lg:block">
        <SidebarAccount />
      </div>
      <div className="md:p-8 mt-5 mx-4">
        <span className="font-extrabold text-3xl">Informasi Akun</span>
        <p>Lengkapi data akun anda untuk pemesanan</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <ProfileFormFields
            formData={formData}
            error={error}
            isSubmitted={isSubmitted}
            onChange={handleChange}
          />

          <div className="flex items-center">
            <button
              type="submit"
              className="px-4 bg-black w-full md:w-fit text-white rounded-md mt-5 lg:mt-7 py-3 md:mr-5 lg:text-base lg:font-medium flex justify-center hover:-translate-y-1 duration-300"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Profile;
