import AdminNotificationRow from "./AdminNotificationRow";

const AdminNotificationTable = ({ notifications, formatDate }) => {
    if (!notifications.length) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">No notifications yet</p>
            </div>
        );
    }

    return (
        <div className="w-full overflow-x-auto shadow-xl rounded-lg">

            <table className="w-full divide-y divide-primary-light ">
                <thead className="bg-primary-light/40">
                    <tr>
                        <th className="p-4 rounded-tl-lg  text-center text-xs font-semibold text-gray-600 uppercase tracking-wider ">
                            Citizen
                        </th>
                        <th className="p-4  text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Message
                        </th>
                        <th className="p-4 rounded-tr-lg  text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Date Sent
                        </th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 bg-white/60">
                    {notifications.map((notification) => (
                        <AdminNotificationRow
                            key={notification.id}
                            notification={notification}
                            formatDate={formatDate}
                        />
                    ))}
                </tbody>
            </table>

        </div>

    );
};

export default AdminNotificationTable;
