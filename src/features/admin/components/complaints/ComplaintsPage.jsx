// ComplaintsPage.jsx
import { useState } from "react";
import { MessageSquareWarning } from "lucide-react";
import ComplaintsTable from "./ComplaintTable";
import ComplaintDetailsModal from "./ComplaintDetailsModal";
import AdminPanel from "../shared/AdminPanel";
import useComplaints from "../../hooks/useComplaints";

const ComplaintsPage = ({ activeTab }) => {
  const { complaints, loading, updateStatus, deleteComplaint } = useComplaints();
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Filter Logic
  const filteredComplaints = complaints.filter((c) => {
    const matchesSearch =
      c.title?.toLowerCase().includes(searchText.toLowerCase()) ||
      c.description?.toLowerCase().includes(searchText.toLowerCase());

    const matchesStatus =
      statusFilter === "" || c.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const openComplaintDetails = (complaint) => {
    setSelectedComplaint(complaint);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedComplaint(null);
    setIsModalOpen(false);
  };

  const handleUpdateStatus = async (complaint, newStatus) => {
    await updateStatus(complaint, newStatus); // useComplaints hook
    // تحديث selectedComplaint لتحديث الـ select داخل المودال
    if (selectedComplaint?.id === complaint.id) {
      setSelectedComplaint({ ...selectedComplaint, status: newStatus });
    }
  };

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

  return (
    <AdminPanel
      title={`${activeTab} Management`}
      type="complaints"
      icon={<MessageSquareWarning className="w-8 h-8 text-yellow-600" />}
      count={complaints.length}
      loading={loading}
      searchText={searchText}
      statusFilter={statusFilter}
      onSearchChange={setSearchText}
      onStatusChange={setStatusFilter}
      modal={
        <ComplaintDetailsModal
          key={selectedComplaint?.id}
          formatDate={formatDate}
          isOpen={isModalOpen}
          complaint={selectedComplaint}
          onClose={closeModal}
          onUpdateStatus={handleUpdateStatus}
        />
      }
    >
      <ComplaintsTable
        formatDate={formatDate}
        complaints={filteredComplaints}
        onViewDetails={openComplaintDetails}
        onDeleteComplaint={deleteComplaint}
        onUpdateStatus={updateStatus}
      />
    </AdminPanel>
  );
};

export default ComplaintsPage;
