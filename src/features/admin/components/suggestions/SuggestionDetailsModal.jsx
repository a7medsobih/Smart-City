// SuggestionDetailsModal.jsx
import { X } from "lucide-react";
import StatusDropdown from "../shared/StatusDropdown";

const SuggestionDetailsModal = ({ isOpen, suggestion, onClose, onUpdateStatus, formatDate }) => {
    if (!isOpen || !suggestion) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
                <div className="p-4">
                    <ModalHeader title={suggestion.title} onClose={onClose} />
                    <ModalContent suggestion={suggestion} onUpdateStatus={onUpdateStatus} formatDate={formatDate} />
                    <ModalActions onClose={onClose} onResolve={() => onUpdateStatus(suggestion, "Resolved")} />
                </div>
            </div>
        </div>
    );
};

const ModalHeader = ({ title, onClose }) => (
    <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <button onClick={onClose}>
            <X className="smooth-transition hover:scale-110 text-gray-400 hover:text-gray-600 text-2xl cursor-pointer" />
        </button>
    </div>
);


const ModalContent = ({ suggestion, onUpdateStatus, formatDate }) => (
    <div>
        <DescriptionSection description={suggestion.description} />
        <DetailsSection suggestion={suggestion} onUpdateStatus={onUpdateStatus} formatDate={formatDate} />
    </div>
);

const DescriptionSection = ({ description }) => (
    <div className="mb-4">
        <h4 className="font-semibold text-gray-700 mb-2">Description:</h4>
        <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{description}</p>
    </div>
);

const DetailsSection = ({ suggestion, onUpdateStatus, formatDate }) => (
    <div className="grid grid-cols-2 gap-4">
        <div>
            <h4 className="font-semibold text-gray-700 mb-2">Status:</h4>
            <StatusDropdown item={suggestion} onUpdateStatus={onUpdateStatus} />
        </div>
        <div>
            <h4 className="font-semibold text-gray-700 mb-2">Citizen ID:</h4>
            <p className="text-gray-600">{suggestion.citizenId || "N/A"}</p>
        </div>
        <div className="col-span-2">
            <h4 className="font-semibold text-gray-700 mb-2">Date Submitted:</h4>
            <p className="text-gray-600">{formatDate(suggestion.dateSubmitted) || "—"}</p>
        </div>
    </div>
);

// أزرار المودال
const ModalActions = ({ onClose, onResolve }) => (
    <div className="mt-6 flex justify-end space-x-3">
        <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-light transition-colors"
        >
            Close
        </button>
        <button
            onClick={onResolve}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
            Mark as Resolved
        </button>
    </div>
);

export default SuggestionDetailsModal;
