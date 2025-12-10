const EmptyState = ({ activeTab }) => (
    <div className="text-center py-12 opacity-70">
        <div className="text-7xl mb-4">📭</div>
        <p className="text-gray-500 text-lg font-medium">
            {activeTab === "all" ? "No notifications yet" : "No unread notifications"}
        </p>
        <p className="text-gray-400 text-sm mt-2">
            {activeTab === "all" ? "You're all caught up!" : "All notifications are read"}
        </p>
    </div>
);

export default EmptyState;
