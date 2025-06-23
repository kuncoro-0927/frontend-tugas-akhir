import { IoNotificationsOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
  clearNotification,
  setHasNewNotification,
} from "../../redux/notificationSlice";
import {
  BsBox,
  BsCart,
  BsCollection,
  BsPercent,
  BsPerson,
} from "react-icons/bs";
import { instanceAdmin } from "../../utils/axiosAdmin";
import socket from "../../utils/socket";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale"; // untuk bahasa Indonesia

const NotificationBell = () => {
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState([]);

  const hasNewNotification = useSelector(
    (state) => state.notification.hasNewNotification
  );
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    socket.emit("joinRoom", "admin");

    socket.on("newNotification", (data) => {
      console.log("Notif baru:", data);
      dispatch(setHasNewNotification(true));
    });

    return () => {
      socket.off("newNotification");
    };
  }, [dispatch]);

  const handleNotifClick = async () => {
    setShowDropdown((prev) => !prev);
    dispatch(clearNotification());

    if (!showDropdown) {
      try {
        const data = await instanceAdmin("/notification");
        console.log("data", data);
        setNotifications(data.data);
      } catch (error) {
        console.error("Gagal fetch notifikasi:", error);
      }
    }
  };

  const renderFormattedMessage = (message) => {
    const regex = /(#\d+)/g; // Menangkap order ID seperti #123456
    const parts = message.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? <strong key={index}>{part}</strong> : part
    );
  };

  return (
    <div className="relative">
      <button
        onClick={handleNotifClick}
        className="p-2.5 border mr-5 border-gray-300 rounded-md relative"
      >
        <IoNotificationsOutline className="text-xl" />
        {hasNewNotification && (
          <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full animate-ping" />
        )}
      </button>
      {showDropdown && (
        <div className="absolute right-0 p-4 mt-2 w-[400px] bg-white border rounded shadow max-h-96 overflow-y-auto z-50">
          <h1 className="mb-5 font-bold">Notifikasi</h1>
          {notifications.length > 0 ? (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className="flex pb-3 items-start gap-3 border-b"
              >
                <div className="p-2 rounded-full  border w-fit bg-primary">
                  <BsBox className="text-white" />
                </div>
                <div>
                  <div className="text-sm font-bold">{notif.title}</div>
                  <div className="text-xs text-gray-600">
                    {renderFormattedMessage(notif.message)}
                  </div>
                  <div className="text-xs flex items-center justify-between text-gray-400 mt-1">
                    <span className="text-xs">
                      Dari: {notif.firstname || notif.name || "Sistem"}
                    </span>
                    <small>
                      {formatDistanceToNow(new Date(notif.created_at), {
                        addSuffix: true,
                        locale: id,
                      })}
                    </small>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-3 text-sm text-gray-500">
              Tidak ada notifikasi
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
