// components/NotificationActions.jsx
import { Check, Trash2 } from "lucide-react";
import Button from "../../../../components/Button";

const NotificationActions = ({ unreadCount, totalCount, onMarkAllRead, onClearAll }) => {
    const isMarkDisabled = unreadCount === 0;
    const isClearDisabled = totalCount === 0;

    return (
        <div className="flex gap-3">
            {/* Mark All Read */}
            <Button
                style="light"
                disabled={isMarkDisabled}
                onClick={onMarkAllRead}
                className={`flex items-center gap-2 !py-1 ${isMarkDisabled && "!opacity-40"}`}
            >
                <Check size={16} />
                Mark All Read
            </Button>

            {/* Clear All */}
            <Button
                style="light"
                disabled={isClearDisabled}
                onClick={onClearAll}
                className={`flex items-center gap-2 !py-1 !border-red-400 !text-red-600 hover:!bg-[#ef4444] hover:!text-white ${isClearDisabled && "!opacity-40"}`}
            >
                <Trash2 size={16} />
                Clear All
            </Button>
        </div>
    );
};

export default NotificationActions;
