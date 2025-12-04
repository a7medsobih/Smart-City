import TableLayout from "../shared/TableLayout";
import SuggestionRow from "./SuggestionRow";

export default function SuggestionTable({
    suggestions,
    onViewDetails,
    onDeleteSuggestion,
    onUpdateStatus,
}) {
    const columns = [
        { key: "owner", label: "Suggestion Owner" },
        { key: "title", label: "Title" },
        { key: "status", label: "Status" },
        { key: "date", label: "Date" },
        { key: "actions", label: "Actions" },
    ];

    return (
        <TableLayout
            columns={columns}
            data={suggestions}
            type="suggestions"
            renderRow={(s) => (
                <SuggestionRow
                    suggestion={s}
                    onViewDetails={onViewDetails}
                    onDeleteSuggestion={onDeleteSuggestion}
                    onUpdateStatus={onUpdateStatus}
                />
            )}
        />
    );
}
