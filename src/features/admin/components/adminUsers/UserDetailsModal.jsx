import { X } from "lucide-react";
import { FaUser, FaCalendarAlt, FaCheck, FaTimes } from "react-icons/fa";

export default function UserDetailsModal({ open, onClose, user }) {
  if (!open || !user) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-999999999999999 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-[500px] max-h-[80vh] overflow-y-auto p-6 animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center mb-5 ">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaUser className="text-accent" /> User Details
          </h2>
          <button onClick={onClose}><X className="smooth-transition hover:scale-110 text-gray-400 hover:text-gray-600 text-2xl cursor-pointer" /></button>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <Info label="ID" value={user.id} />
          <Info label="Name" value={user.name} />
          <Info label="Email" value={user.email} />
          <Info label="Phone" value={user.phone} />
          <Info label="National ID" value={user.nationalId} />
          <Info label="Role" value={user.role} />
          <Info label="Address" value={user.address} />

          <div className="flex justify-between border-b pb-2 border-gray-300">
            <span className="font-semibold text-gray-600">Active</span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${user.isActive
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
                }`}
            >
              {user.isActive ? (
                <span className="flex items-center gap-1">
                  <FaCheck /> Active
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <FaTimes /> Inactive
                </span>
              )}
            </span>
          </div>

          <div className="flex justify-between border-b pb-2 border-gray-300">
            <span className="font-semibold text-gray-600">Created At</span>
            <span className="text-gray-800 flex items-center gap-1">
              <FaCalendarAlt className="text-blue-500" />
              {new Date(user.createdAt).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Cleaner Info Component
function Info({ label, value }) {
  return (
    <div className="flex justify-between border-b pb-2 border-gray-300">
      <span className="font-semibold text-gray-600">{label}</span>
      <span className="text-gray-800 break-all">{String(value)}</span>
    </div>
  );
}
