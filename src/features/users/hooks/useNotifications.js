import { useState, useEffect } from "react";
import api from "../../../services/axiosInterceptors";
import { useAuth } from "../../../context/AuthContext";
import Swal from "sweetalert2";

const LAST_VISIT_KEY = "notifications_last_visit";

const useNotifications = () => {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState([]);
    const [activeTab, setActiveTab] = useState("all");
    const [loading, setLoading] = useState(true);

    // ---------- FETCH NOTIFICATIONS ----------
    const fetchNotifications = async () => {
        if (!user?.id) return;

        try {
            const { data } = await api.get(`/api/Notification/my/${user.id}`);

            // آخر زيارة محفوظة
            const lastVisit = localStorage.getItem(LAST_VISIT_KEY);
            const lastVisitTime = lastVisit ? new Date(lastVisit).getTime() : 0;

            const formatted = data.map((n) => {
                const sentTime = new Date(n.sentDate).getTime();
                return {
                    ...n,
                    read: sentTime <= lastVisitTime, // أقدم من آخر زيارة → Read
                    time: formatDate(n.sentDate),
                };
            });

            setNotifications(formatted);
        } catch (err) {
            console.error("Error loading notifications:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, [user]);

    // ---------- MARK ALL READ ----------
    const markAllRead = () => {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
        localStorage.setItem(LAST_VISIT_KEY, new Date().toISOString());
    };

    // ---------- HANDLE CLEAR ALL WITH CONFIRM ----------
    const handleClearAll = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "This will delete all your notifications!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444', // red
            cancelButtonColor: '#f59e0b',   // yellow
            confirmButtonText: 'Yes, delete all!',
            cancelButtonText: 'Cancel'
        });

        if (result.isConfirmed) {
            setNotifications([]);
            Swal.fire({
                title: 'Deleted!',
                text: 'All notifications have been cleared.',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
            });
        }
    };

    // ---------- UPDATE LAST VISIT ON PAGE UNMOUNT ----------
    useEffect(() => {
        return () => {
            localStorage.setItem(LAST_VISIT_KEY, new Date().toISOString());
        };
    }, []);

    const unreadCount = notifications.filter((n) => !n.read).length;

    return {
        notifications,
        unreadCount,
        loading,
        activeTab,
        setActiveTab,
        markAllRead,
        handleClearAll,
    };
};

export default useNotifications;

// ---------- FORMAT DATE ----------
const formatDate = (dateString) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};
