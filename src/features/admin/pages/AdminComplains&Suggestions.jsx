// AdminComplainsAndSuggestions.jsx
import { useState } from "react";
import { MessageSquareWarning, Lightbulb } from "lucide-react";

// Import components
import ComplaintsPage from "../components/complaints/ComplaintsPage";
import SuggestionsPage from "../components/suggestions/SuggestionsPage";
import Tabs from "../../../components/Tabs";

const AdminComplainsAndSuggestions = () => {
    const [activeTab, setActiveTab] = useState("complaints");

    const comAndSugg = [
        { id: "complaints", label: "Complaints" },
        { id: "suggestions", label: "Suggestions" },
    ];
    const activeLabel = comAndSugg.find(t => t.id === activeTab)?.label;

    return (
        <>
            <div>
                {/* Page Title */}
                <h1 className="text-4xl mb-6 flex items-center gap-3">
                    {activeTab === "complaints" ? (
                        <>
                            <MessageSquareWarning className="w-8 h-8 text-yellow-500" />
                            Complaints
                        </>
                    ) : (
                        <>
                            <Lightbulb className="w-8 h-8 text-accent" />
                            Suggestions
                        </>
                    )}
                </h1>

                {/* Tabs */}
                <Tabs
                    tabs={comAndSugg}
                    activeTab={activeTab}
                    onChange={setActiveTab}
                />

                {/* Tab Content */}
                <div>
                    {activeTab === "complaints" && <ComplaintsPage activeTab={activeLabel} />}
                    {activeTab === "suggestions" && <SuggestionsPage activeTab={activeLabel} />}
                </div>
            </div>


        </>

    );
};

export default AdminComplainsAndSuggestions;
