// components/NotificationTabs.jsx
import Tabs from "../../../../components/Tabs";

const NotificationTabs = ({ activeTab, setActiveTab, unreadCount }) => {

    const tabs = [
        { id: "all", label: "All Notifications" },
        { id: "unread", label: `Unread (${unreadCount})` },
    ];

    return (
        <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onChange={setActiveTab}
        />
    );
};

export default NotificationTabs;