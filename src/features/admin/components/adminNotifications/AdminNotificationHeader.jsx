import { Bell, Plus } from "lucide-react";
import Button from "../../../../components/Button";

const AdminNotificationHeader = ({ onCreateClick }) => {
    return (
        <div className="flex justify-between items-center mb-6 md:flex-row flex-col gap-4 ">
            <div className="text-center md:text-start">
                <h2 className="text-2xl sm:text-4xl flex items-center gap-2">
                    <Bell className="w-8 h-8 text-primary" />
                    System Notifications
                </h2>
                <p className="text-gray-600 text-sm mt-2">
                    Manage and send notifications to citizens
                </p>
            </div>

            <Button
                onClick={onCreateClick}
                style="light"
                className="flex items-center gap-2  px-4 py-2.5 !shadow-sm"
            >
                <Plus className="w-4 h-4" />
                Create Notification
            </Button>
        </div>
    );
};

export default AdminNotificationHeader;
