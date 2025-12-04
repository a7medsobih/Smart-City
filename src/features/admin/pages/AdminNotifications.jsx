// AdminNotifications.jsx
import { useEffect, useState } from "react";
import { Bell, Plus, Trash2, User, AlertCircle } from "lucide-react";
import GlobalPreloader from "../../../components/GlobalPreloader";
import api from "../../../services/axiosInterceptors";

const AdminNotifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newNotification, setNewNotification] = useState({
        citizenId: "",
        message: ""
    });
    const [apiError, setApiError] = useState(false);

    // جلب جميع الإشعارات
    const fetchAllNotifications = async () => {
        setLoading(true);
        setApiError(false);
        try {
            const response = await api.get('/api/admin/notifications');
            setNotifications(response.data);
            console.log('✅ Notifications loaded:', response.data);
        } catch (error) {
            console.error('❌ API Error fetching notifications:', error);
            setApiError(true);
        } finally {
            setLoading(false);
        }
    };

    // إنشاء إشعار جديد
    const createNotification = async () => {
        // التحقق من البيانات
        if (!newNotification.citizenId || !newNotification.message.trim()) {
            alert('Please enter Citizen ID and message');
            return;
        }

        setLoading(true);
        try {
            const payload = {
                citizenId: parseInt(newNotification.citizenId),
                message: newNotification.message.trim()
            };

            const response = await api.post('/api/admin/notifications', payload);

            // تحديث القائمة بإضافة الإشعار الجديد في الأعلى
            setNotifications(prev => [response.data, ...prev]);

            // إغلاق المودال وتهيئة الحقول
            setShowCreateModal(false);
            setNewNotification({ citizenId: "", message: "" });

            console.log('✅ Notification created:', response.data);

        } catch (error) {
            console.error('❌ Error creating notification:', error);
            alert('Failed to create notification. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // حذف إشعار
    const deleteNotification = async (id) => {
        if (!window.confirm('Are you sure you want to delete this notification?')) {
            return;
        }

        try {
            await api.delete(`/api/admin/notifications/${id}`);

            // تحديث القائمة محلياً بعد الحذف الناجح
            setNotifications(prev => prev.filter(n => n.id !== id));

            console.log('✅ Notification deleted:', id);

        } catch (error) {
            console.error('❌ Error deleting notification:', error);
            alert('Failed to delete notification. Please try again.');
        }
    };

    // جلب تفاصيل إشعار محدد (إذا احتجناها مستقبلاً)
    const fetchNotificationDetails = async (id) => {
        try {
            const response = await api.get(`/api/admin/notifications/${id}`);
            console.log('📋 Notification details:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching notification details:', error);
            return null;
        }
    };

    useEffect(() => {
        fetchAllNotifications();
    }, []);

    // دالة مساعدة لتنسيق التاريخ
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // دالة للحصول على اسم المواطن (افتراضي إذا لم يكن موجوداً في الـ API)
    const getCitizenName = (citizenId) => {
        // في التطبيق الحقيقي، هنا يمكن جلب اسم المواطن من API آخر
        return `Citizen #${citizenId}`;
    };

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
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg hover:bg-primary-dark transition-all duration-200 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                >
                    <Plus className="w-4 h-4" />
                    <span>{loading ? 'Loading...' : 'Create Notification'}</span>
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <div className="text-sm text-gray-600">Total Notifications</div>
                    <div className="text-2xl font-bold text-gray-800">{notifications.length}</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <div className="text-sm text-gray-600">Last Notification</div>
                    <div className="text-lg font-semibold text-gray-800">
                        {notifications.length > 0
                            ? formatDate(notifications[0].sentDate)
                            : 'No notifications'}
                    </div>
                </div>
            </div>

            {/* Content */}
            {loading ? (
                <div className="flex justify-center items-center py-12">
                    <GlobalPreloader />
                </div>
            ) : (
                <>
                    {/* Error Message */}
                    {apiError && (
                        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <div className="flex items-center">
                                <AlertCircle className="w-5 h-5 text-red-500 mr-2 shrink-0" />
                                <div>
                                    <h3 className="font-medium text-red-800">Connection Error</h3>
                                    <p className="text-red-700 text-sm mt-1">
                                        Unable to connect to the server. Please check your connection and try again.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Notifications List */}
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
                                            Date Sent
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
                                                            {getCitizenName(notification.citizenId)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900 max-w-md">
                                                    {notification.message}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">
                                                    {formatDate(notification.sentDate)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <button
                                                    onClick={() => deleteNotification(notification.id)}
                                                    className="text-red-600 hover:text-red-900 hover:bg-red-50 p-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                    title="Delete notification"
                                                    disabled={loading}
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
                                    onClick={() => !loading && setShowCreateModal(false)}
                                    className="text-gray-400 hover:text-gray-600 text-2xl disabled:opacity-50"
                                    disabled={loading}
                                >
                                    &times;
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Citizen ID *
                                    </label>
                                    <input
                                        type="number"
                                        value={newNotification.citizenId}
                                        onChange={(e) => setNewNotification({
                                            ...newNotification,
                                            citizenId: e.target.value
                                        })}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all disabled:opacity-50"
                                        placeholder="Enter Citizen ID"
                                        min="1"
                                        required
                                        disabled={loading}
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Enter the ID of the citizen to receive this notification
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        value={newNotification.message}
                                        onChange={(e) => setNewNotification({
                                            ...newNotification,
                                            message: e.target.value
                                        })}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all h-40 resize-none disabled:opacity-50"
                                        placeholder="Type your notification message here..."
                                        maxLength={500}
                                        required
                                        disabled={loading}
                                    />
                                    <div className="text-xs text-gray-500 mt-2">
                                        {newNotification.message.length}/500 characters
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 justify-end mt-8 pt-6 border-t border-gray-200">
                                <button
                                    onClick={() => !loading && setShowCreateModal(false)}
                                    className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors w-24 disabled:opacity-50"
                                    disabled={loading}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={createNotification}
                                    className="px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors w-24 disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={loading || !newNotification.citizenId || !newNotification.message.trim()}
                                >
                                    {loading ? 'Sending...' : 'Send'}
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