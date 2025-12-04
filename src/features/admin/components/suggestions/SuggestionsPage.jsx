// SuggestionsPage.jsx
import { useState } from "react";
import { Lightbulb } from "lucide-react";
import AdminPanel from "../shared/AdminPanel";
import SuggestionTable from "./SuggestionTable";
import SuggestionDetailsModal from "./SuggestionDetailsModal";
import useSuggestions from "../../hooks/useSuggestions";

const SuggestionsPage = ({ activeTab }) => {
    const { suggestions, loading, updateStatus, deleteSuggestion } = useSuggestions();
    const [selectedSuggestion, setSelectedSuggestion] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    // Filter Logic
    const filteredSuggestions = suggestions.filter((s) => {
        const matchesSearch =
            s.title?.toLowerCase().includes(searchText.toLowerCase()) ||
            s.description?.toLowerCase().includes(searchText.toLowerCase());

        const matchesStatus =
            statusFilter === "" || s.status === statusFilter;

        return matchesSearch && matchesStatus;
    });


    const openSuggestionDetails = (suggestion) => {
        setSelectedSuggestion(suggestion);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedSuggestion(null);
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
            type="suggestions"
            icon={<Lightbulb className="w-8 h-8 text-accent" />}
            count={suggestions.length}
            loading={loading}
            searchText={searchText}
            statusFilter={statusFilter}
            onSearchChange={setSearchText}
            onStatusChange={setStatusFilter}
            modal={
                <SuggestionDetailsModal
                    isOpen={isModalOpen}
                    suggestion={selectedSuggestion}
                    onClose={closeModal}
                    onUpdateStatus={updateStatus}
                    formatDate={formatDate}
                />
            }
        >
            <SuggestionTable
                suggestions={filteredSuggestions}
                onViewDetails={openSuggestionDetails}
                onDeleteSuggestion={deleteSuggestion}
                onUpdateStatus={updateStatus}
            />
        </AdminPanel>
    );
};

export default SuggestionsPage;
