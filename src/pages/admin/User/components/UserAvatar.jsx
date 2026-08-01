import React from "react";

const getInitials = (firstName, lastName) => {
  if (!firstName && !lastName) return "NN";
  const first = firstName?.[0] || "";
  const last = lastName?.[0] || "";
  return (first + last).toUpperCase();
};

const getColorFromString = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 70%, 60%)`;
};

const UserAvatar = ({ user }) => {
  return (
    <div
      className="rounded-full w-9 h-9 flex items-center justify-center text-white font-semibold text-sm"
      style={{
        backgroundColor: getColorFromString(user.email || user.name || "NN"),
      }}
    >
      {getInitials(user.firstname, user.lastname)}
    </div>
  );
};

export default UserAvatar;
