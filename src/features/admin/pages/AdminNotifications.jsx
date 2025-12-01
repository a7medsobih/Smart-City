// AdminNotifications.jsx
import { useEffect, useState } from "react";
import { Bell, Plus, Trash2, User, AlertCircle } from "lucide-react";
import GlobalPreloader from "../../../components/GlobalPreloader";
import api from "../../../services/axiosInterceptors";

const AdminNotifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newNotification, setNewNotification] = useState({ citizenId: "", message: "" });
    const [apiError, setApiError] = useState(false);

    // بيانات تجريبية ثابتة
    const demoNotifications = [
        {
            id: 1,
            citizenId: 5,
            citizenName: "Ahmed Mohamed",
            message: "Your electricity bill of EGP 450 is due on December 15, 2024",
            sentDate: "2024-12-01T10:00:00Z"
        },
        {
            id: 2,
            citizenId: 8,
            citizenName: "Sara Ali",
            message: "Your complaint CMP-2024-10249 is now in progress",
            sentDate: "2024-12-01T14:30:00Z"
        },
        {
            id: 3,
            citizenId: 12,
            citizenName: "Mohamed Hassan",
            message: "Water supply maintenance scheduled for your area on Dec 5",
            sentDate: "2024-11-30T09:15:00Z"
        },
        {
            id: 4,
            citizenId: 15,
            citizenName: "Fatma Mahmoud",
            message: "New public park opening ceremony this Friday",
            sentDate: "2024-11-28T16:20:00Z"
        },
        {
            id: 5,
            citizenId: 5,
            citizenName: "Ahmed Mohamed",
            message: "Payment successful for water bill #WB-78910",
            sentDate: "2024-11-27T11:45:00Z"
        }
    ];

    // جلب البيانات
    const fetchAllNotifications = async () => {
        setLoading(true);
        setApiError(false);
        try {

            const response = await api.get('/api/admin/notifications');
            setNotifications(response.data);
            console.log('✅ API response received');

        } catch (error) {
            console.error('❌ API Error:', error);
            setApiError(true);
            // استخدام البيانات التجريبية في حالة الخطأ
            setNotifications(demoNotifications);
        } finally {
            setLoading(false);
        }
    };

    // إنشاء إشعار جديد
    const createNotification = async () => {

        // إضافة notification جديدة (محلياً)
        const newNotif = {
            id: notifications.length > 0 ? Math.max(...notifications.map(n => n.id)) + 1 : 1,
            citizenId: parseInt(newNotification.citizenId) || 99,
            citizenName: `Citizen ${newNotification.citizenId}`,
            message: newNotification.message,
            sentDate: new Date().toISOString()
        };

        setNotifications([newNotif, ...notifications]);
        setShowCreateModal(false);
        setNewNotification({ citizenId: "", message: "" });

        try {
            await api.post('/api/admin/notifications', {
                citizenId: parseInt(newNotification.citizenId),
                message: newNotification.message
            });
            fetchAllNotifications(); // Refresh data
        } catch (error) {
            console.error('Error creating notification:', error);
        }

    };

    // حذف إشعار
    const deleteNotification = async (id) => {
        if (!window.confirm('Are you sure you want to delete this notification?')) {
            return;
        }

        // حذف محلي
        setNotifications(notifications.filter(n => n.id !== id));

        // TODO: Uncomment when API is fixed
        try {
            await api.delete(`/api/admin/notifications/${id}`);
        } catch (error) {
            console.error('Error deleting notification:', error);
            alert('Error deleting notification. Please try again.');
        }
    };


    useEffect(() => {
        fetchAllNotifications();
    }, []);

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Bell className="w-6 h-6 text-primary" />
                        System Notifications
                    </h2>
                    <p className="text-gray-600 text-sm mt-1">
                        Manage and send notifications to citizens
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    {apiError && (
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-100 text-yellow-800 text-sm rounded-lg border border-yellow-300">
                            <AlertCircle className="w-4 h-4" />
                            <span>Demo Mode - API Unavailable</span>
                        </div>
                    )}
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg hover:bg-primary-dark transition-all duration-200 hover:shadow-md"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Create Notification</span>
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <div className="text-sm text-gray-600">Total Notifications</div>
                    <div className="text-2xl font-bold text-gray-800">{notifications.length}</div>
                </div>
            </div>

            {/* Content */}
            {loading ? (
                <div className="flex justify-center items-center py-12">
                    <GlobalPreloader />
                </div>
            ) : (
                <>
                    {/* Instructions */}
                    {apiError && (
                        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <div className="flex items-start">
                                <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5 mr-2 shrink-0" />
                                <div>
                                    <h3 className="font-medium text-blue-800">Using Demo Data</h3>
                                    <p className="text-blue-700 text-sm mt-1">
                                        The notifications API is currently unavailable. You're viewing demo data.
                                        All actions (create, delete) will only affect the local demo data.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Table */}
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        {notifications.length === 0 ? (
                            <div className="text-center py-12">
                                <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900">No notifications yet</h3>
                                <p className="text-gray-500 mt-1">Create your first notification to get started</p>
                                <button
                                    onClick={() => setShowCreateModal(true)}
                                    className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                                >
                                    Create Notification
                                </button>
                            </div>
                        ) : (
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Citizen
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Message
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {notifications.map(notification => (
                                        <tr key={notification.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0">
                                                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                                                            <User className="w-4 h-4 text-primary" />
                                                        </div>
                                                    </div>
                                                    <div className="ml-3">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            ID: {notification.citizenId}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {notification.citizenName}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900 max-w-md">{notification.message}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <button
                                                    onClick={() => deleteNotification(notification.id)}
                                                    className="text-red-600 hover:text-red-900 hover:bg-red-50 p-2 rounded transition-colors"
                                                    title="Delete notification"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </>
            )}

            {/* Create Notification Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg w-full max-w-md">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-gray-900">Create New Notification</h3>
                                <button
                                    onClick={() => setShowCreateModal(false)}
                                    className="text-gray-400 hover:text-gray-600 text-2xl"
                                >
                                    &times;
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Citizen ID
                                    </label>
                                    <input
                                        type="number"
                                        value={newNotification.citizenId}
                                        onChange={(e) => setNewNotification({
                                            ...newNotification,
                                            citizenId: e.target.value
                                        })}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                                        placeholder="Enter Citizen ID (e.g., 123)"
                                        min="1"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        value={newNotification.message}
                                        onChange={(e) => setNewNotification({
                                            ...newNotification,
                                            message: e.target.value
                                        })}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all h-40 resize-none"
                                        placeholder="Type your notification message here..."
                                        required
                                    />
                                    <div className="text-xs text-gray-500 mt-2">
                                        {newNotification.message.length}/500 characters
                                    </div>
                                </div>

                                {apiError && (
                                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                        <div className="flex items-center">
                                            <AlertCircle className="w-4 h-4 text-yellow-600 mr-2" />
                                            <span className="text-sm text-yellow-700">
                                                Will be saved locally (API unavailable)
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-3 justify-end mt-8 pt-6 border-t border-gray-200">
                                <button
                                    onClick={() => setShowCreateModal(false)}
                                    className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors w-24"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={createNotification}
                                    className="px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors w-24"
                                    disabled={!newNotification.citizenId || !newNotification.message.trim()}
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminNotifications;