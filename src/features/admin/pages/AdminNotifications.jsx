import { useState } from "react";
import GlobalPreloader from "../../../components/GlobalPreloader";
import Swal from "sweetalert2";
import AdminNotificationTable from "../components/adminNotifications/AdminNotificationTable";
import AdminNotificationModal from "../components/adminNotifications/AdminNotificationModal";
import AdminNotificationHeader from "../components/adminNotifications/AdminNotificationHeader";
import useAdminNotifications from "../hooks/useAdminNotifications";

const AdminNotifications = () => {
    const {
        notifications,
        loading,
        apiError,
        createNotification,
        deleteNotification,
        formatDate,
    } = useAdminNotifications();

    const [showModal, setShowModal] = useState(false);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteNotification(id);
                    Swal.fire('Deleted!', 'Notification has been deleted.', 'success');
                } catch {
                    Swal.fire('Error!', 'Failed to delete notification.', 'error');
                }
            }
        });
    };

    const handleCreate = async (payload) => {
        try {
            await createNotification(payload);
            setShowModal(false);
            Swal.fire('Success', 'Notification created successfully.', 'success');
        } catch {
            Swal.fire('Error', 'Failed to create notification.', 'error');
        }
    };

    return (
        <div className="p-6">
            <AdminNotificationHeader
                onCreateClick={() => setShowModal(true)}
            />

            {loading ? (
                <GlobalPreloader />
            ) : apiError ? (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">Failed to load notifications</div>
            ) : (
                <AdminNotificationTable
                    notifications={notifications}
                    onDelete={handleDelete}
                    formatDate={formatDate}
                />
            )}

            <AdminNotificationModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={handleCreate}
                loading={loading}
            />
        </div>
    );
};

export default AdminNotifications;
