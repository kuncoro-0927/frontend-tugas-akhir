
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const getInitials = (firstname, lastname) => {
  const firstInitial = firstname?.charAt(0).toUpperCase() || "N";
  const lastInitial = lastname?.charAt(0).toUpperCase() || "N";
  return `${firstInitial}${lastInitial}`;
};

const Avatar = () => {
  const { user } = useSelector((state) => state.user);

  const [initials, setInitials] = useState("NN");

  useEffect(() => {
    if (user) {
      const { firstname, lastname } = user;
      const initials = getInitials(firstname, lastname);
      setInitials(initials);
    }
  }, [user]);

  return (
    <div className="avatar w-8 h-8 bg-primary rounded-full flex items-center justify-center text-sm font-bold text-black">
      {initials}
    </div>
  );
};

export default Avatar;
