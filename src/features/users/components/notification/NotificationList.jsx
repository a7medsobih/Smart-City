// components/NotificationList.jsx
import NotificationCard from "./NotificationCard";
import EmptyState from "./EmptyState";

const NotificationList = ({ notifications, activeTab }) => {
    const filteredNotifications =
        activeTab === "all"
            ? notifications
            : notifications.filter(n => !n.read);


    if (filteredNotifications.length === 0) {
        return <EmptyState activeTab={activeTab} />;
    }

    return (
        <div className="space-y-4 mb-6">
            {filteredNotifications.map(n => (
                <NotificationCard key={n.id} notification={n} />
            ))}
        </div>
    );
};

export default NotificationList;
