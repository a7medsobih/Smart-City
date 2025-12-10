import AdminNotificationRow from "./AdminNotificationRow";

const AdminNotificationTable = ({ notifications, onDelete, formatDate }) => {
    if (!notifications.length) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">No notifications yet</p>
            </div>
        );
    }

    return (
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Citizen</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Sent</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {notifications.map(notification => (
                    <AdminNotificationRow
                        key={notification.id}
                        notification={notification}
                        onDelete={onDelete}
                        formatDate={formatDate}
                    />
                ))}
            </tbody>
        </table>
    );
};

export default AdminNotificationTable;
