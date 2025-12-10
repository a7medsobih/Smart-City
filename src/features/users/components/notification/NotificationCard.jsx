// components/NotificationCard.jsx
import { Bell } from "lucide-react";

const NotificationCard = ({ notification }) => {
  return (
    <div
      className={`p-6 rounded-xl border border-color shadow-sm hover:shadow-md smooth-transition cursor-pointer 
      ${notification.read ? "bg-white" : "bg-yellow-50 border-yellow-300 shadow-md"}`}
    >
      <div className="flex items-start gap-4">

        {/* Icon */}
        <div className="p-2 bg-yellow-100 text-yellow-700 rounded-full">
          <Bell size={20} />
        </div>

        {/* Content */}
        <div className="flex-1">
          <p className="text-gray-700 text-sm mb-1">
            {notification.message}
          </p>

          <p className="text-xs text-gray-400">
            {notification.time}
          </p>
        </div>

        {/* Unread dot */}
        {!notification.read && (
          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
        )}
      </div>
    </div>
  );
};

export default NotificationCard;
