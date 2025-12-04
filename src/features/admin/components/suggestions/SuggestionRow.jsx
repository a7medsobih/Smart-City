import { Eye, Trash } from "lucide-react";
import StatusDropdown from "../shared/StatusDropdown";

export default function SuggestionRow({
    suggestion,
    onViewDetails,
    onDeleteSuggestion,
    onUpdateStatus,
}) {
    const formatDate = (d) =>
        new Date(d).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });

    return (
        <tr key={suggestion.id} className="hover:bg-primary/5 transition-all group">
            <td className="px-6 py-6">
                <div className="text-sm font-semibold group-hover:text-primary-dark">
                    citizen #{suggestion.id}
                </div>
            </td>

            <td className="px-6 py-6">
                <div className="flex flex-col">
                    <div className="text-sm font-semibold group-hover:text-primary-dark">
                        {suggestion.title}
                    </div>
                    <div className="text-xs text-dark/70 truncate max-w-xs mt-1">
                        {suggestion.description}
                    </div>
                </div>
            </td>

            <td className="px-6 py-6 w-[150px]">
                <StatusDropdown item={suggestion} onUpdateStatus={onUpdateStatus} />
            </td>

            <td className="px-6 py-6">
                <div className="text-sm text-dark/70 min-w-[170px] bg-light/50 rounded-lg px-3 py-2 text-center border border-dark-light/10">
                    {formatDate(suggestion.dateSubmitted)}
                </div>
            </td>

            <td className="px-6 py-6">
                <div className="flex justify-center space-x-2">
                    <button
                        onClick={() => onViewDetails(suggestion)}
                        className="flex gap-2 items-center px-3 py-2 text-xs font-medium text-primary bg-light rounded-lg hover:bg-primary hover:text-white transition"
                    >
                        <Eye className="w-4 h-4" />
                        View
                    </button>

                    <button
                        onClick={() => onDeleteSuggestion(suggestion.id)}
                        className="flex gap-2 items-center px-3 py-2 text-xs font-medium text-accent bg-accent/20 rounded-lg hover:bg-accent hover:text-white transition"
                    >
                        <Trash className="w-4 h-4" />
                        Delete
                    </button>
                </div>
            </td>
        </tr>
    );
}
