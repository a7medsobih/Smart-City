// components/NotificationHeader.jsx
import { Bell } from "lucide-react";

const NotificationHeader = () => {
    return (
        <>
            <h1 className="text-4xl flex items-center gap-3 mb-2">
                <Bell className="h-8 w-8 sm:h-10 sm:w-10 text-yellow-600" />
                Notifications
            </h1>
            <p className="text-gray-600">Stay updated with your account activity</p>
        </>
    );
};

export default NotificationHeader;