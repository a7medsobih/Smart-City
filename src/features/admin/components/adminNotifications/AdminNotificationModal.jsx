import { X } from "lucide-react";
import { useState } from "react";
import Button from "../../../../components/Button";

const AdminNotificationModal = ({ show, onClose, onSubmit, loading }) => {
    const [citizenId, setCitizenId] = useState("");
    const [message, setMessage] = useState("");

    if (!show) return null;

    const handleSubmit = () => {
        if (!citizenId || !message.trim()) return;
        onSubmit({ citizenId: parseInt(citizenId), message: message.trim() });
        setCitizenId("");
        setMessage("");
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg w-full max-w-xl shadow-lg">
                <div className="p-4">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-semibold text-gray-900">Create New Notification</h3>
                        <button onClick={onClose}><X className="smooth-transition hover:scale-110 text-gray-400 hover:text-gray-600 text-2xl cursor-pointer" /></button>
                    </div>

                    <div className="space-y-2">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Citizen ID *</label>
                            <input
                                type="number"
                                value={citizenId}
                                onChange={(e) => setCitizenId(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                                placeholder="Enter Citizen ID"
                                min="1"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all h-40 resize-none"
                                placeholder="Type your notification message here..."
                                maxLength={500}
                            />
                            <div className="text-xs text-gray-500 ">{message.length}/500 characters</div>
                        </div>
                    </div>

                    <div className="flex gap-3 justify-end mt-4 pt-4 border-t border-gray-200">
                        <button onClick={onClose} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors w-24 cursor-pointer">Cancel</button>
                        <Button
                            style="gradient"
                            onClick={handleSubmit}
                            className="px-4 py-2 w-24 !m-0"
                            disabled={loading || !citizenId || !message.trim()}
                        >
                            {loading ? 'Sending...' : 'Send'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminNotificationModal;
