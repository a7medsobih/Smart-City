import { User, Trash2 } from "lucide-react";

const AdminNotificationRow = ({ notification, onDelete, formatDate }) => {
    return (
        <tr className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-primary" />
                    </div>
                    <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                            ID: {notification.citizenId}
                        </div>
                        <div className="text-sm text-gray-500">Citizen #{notification.citizenId}</div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 text-sm text-gray-900 max-w-md">{notification.message}</td>
            <td className="px-6 py-4 text-sm text-gray-500">{formatDate(notification.sentDate)}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                    onClick={() => onDelete(notification.id)}
                    className="text-red-600 hover:text-red-900 hover:bg-red-50 p-2 rounded transition-colors"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </td>
        </tr>
    );
};

export default AdminNotificationRow;
