// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// const getInitials = (email, name) => {
//   if (!name) return "NN"; // Return default initials if name is undefined
//   const firstInitial = name.charAt(0).toUpperCase() || "N"; // Check if name is available
//   const lastInitial = name.charAt(1) ? name.charAt(1).toUpperCase() : "N"; // Check for second char for last initial
//   return `${firstInitial}${lastInitial}`;
// };

// const Avatar = () => {
//   const { user } = useSelector((state) => state.user);

//   const [initials, setInitials] = useState("K");

//   // Gunakan useEffect untuk mengupdate inisial ketika user berubah
//   useEffect(() => {
//     if (user) {
//       const { email, name } = user;
//       const initials = getInitials(email, name);
//       setInitials(initials);
//     }
//   }, [user]); // Akan memicu setiap kali `user` berubah (termasuk setelah login)

//   return (
//     <div className="avatar w-8 h-8 bg-primary rounded-full flex items-center justify-center text-sm font-bold text-black">
//       {initials}
//     </div>
//   );
// };

// export default Avatar;

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
