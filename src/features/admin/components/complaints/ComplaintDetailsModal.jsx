// ComplaintDetailsModal.jsx
import { X } from "lucide-react";
import StatusSelect from "../shared/StatusDropdown";

const ComplaintDetailsModal = ({ isOpen, complaint, onClose, onUpdateStatus, formatDate }) => {
    if (!isOpen || !complaint) return null;

    return (
        <div className="fixed inset-0  bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-5xl w-full overflow-y-auto  shadow-lg">
                <div className="p-4">
                    <ModalHeader title={complaint.title} onClose={onClose} />
                    <ModalContent complaint={complaint} onUpdateStatus={onUpdateStatus} formatDate={formatDate} />
                    <ModalActions
                        onClose={onClose}
                        onResolve={() => onUpdateStatus(complaint, "Resolved")} // complaint موجودة من props
                    />
                </div>
            </div>
        </div>
    );
};

const ModalHeader = ({ title, onClose }) => (
    <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <button onClick={onClose}><X className="smooth-transition hover:scale-110 text-gray-400 hover:text-gray-600 text-2xl cursor-pointer" /></button>
    </div>
);

const ModalContent = ({ complaint, onUpdateStatus, formatDate }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
            <Section title="Description" content={complaint.description} />
            <Section title="Location" content={complaint.location} />
            <div className="mb-4">
                <h4 className="text-sm font-semibold  text-gray-700 mb-2">Status:</h4>
                <StatusSelect item={complaint} onUpdateStatus={onUpdateStatus} />

                <h4 className=" text-sm font-semibold text-gray-700  my-4">Citizen ID:
                    <span className="text-gray-600"> {complaint.citizenId}</span>
                </h4>

                <h4 className="text-sm font-semibold text-gray-700 mb-2 mt-2">Date Submitted:
                    <span className="text-gray-600"> {formatDate(complaint.dateSubmitted) || "—"}</span>
                </h4>
            </div>
        </div>
        <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Image:</h4>
            <div className="bg-gray-100 rounded-lg overflow-hidden">
                <img src={complaint.imageUrl} alt={complaint.title} className="w-full h-64 object-cover" />
            </div>
        </div>
    </div>
);

const Section = ({ title, content }) => (
    <div className="mb-4">
        <h4 className="font-semibold text-sm text-gray-700 mb-2">{title}:</h4>
        <p className="text-gray-600 bg-gray-50 p-2 rounded-lg">{content}</p>
    </div>
);

const ModalActions = ({ onClose, onResolve }) => (
    <div className="mt-6 flex justify-end space-x-3">
        <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-light transition-colors">Close</button>
        <button onClick={onResolve} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">Mark as Resolved</button>
    </div>
);

export default ComplaintDetailsModal;
