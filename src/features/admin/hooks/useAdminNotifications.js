import { useState, useEffect } from "react";
import api from "../../../services/axiosInterceptors";

const useAdminNotifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [apiError, setApiError] = useState(false);

    const fetchAllNotifications = async () => {
        setLoading(true);
        setApiError(false);
        try {
            const response = await api.get('/api/admin/notifications');
            setNotifications(response.data);
        } catch (error) {
            console.error('❌ Error fetching admin notifications:', error);
            setApiError(true);
        } finally {
            setLoading(false);
        }
    };

    // إنشاء إشعار جديد
    const createNotification = async (payload) => {
        setLoading(true);
        try {
            const response = await api.post('/api/admin/notifications', payload);
            setNotifications(prev => [response.data, ...prev]);
            return response.data;
        } catch (error) {
            console.error('❌ Error creating notification:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // حذف إشعار
    const deleteNotification = async (id) => {
        setLoading(true);
        try {
            await api.delete(`/api/admin/notifications/${id}`);
            setNotifications(prev => prev.filter(n => n.id !== id));
        } catch (error) {
            console.error('❌ Error deleting notification:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllNotifications();
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return "—";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return {
        notifications,
        loading,
        apiError,
        fetchAllNotifications,
        createNotification,
        deleteNotification,
        formatDate,
    };
};

export default useAdminNotifications;
