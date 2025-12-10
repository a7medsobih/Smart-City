// ComplaintTable.jsx
import { Eye, Trash } from "lucide-react";
import TableLayout from "../shared/TableLayout";
import StatusSelect from "../shared/StatusDropdown";

export default function ComplaintTable({ complaints, onViewDetails, onDeleteComplaint, onUpdateStatus, formatDate }) {
  const columns = [
    { key: "title", label: "Title" },
    { key: "location", label: "Location" },
    { key: "status", label: "Status" },
    { key: "date", label: "Date" },
    { key: "actions", label: "Actions" },
  ];


  const renderRow = (complaint) => (
    <tr key={complaint.id} className="hover:bg-primary/5 transition-all duration-200 group">
      <td className="px-6 py-6">
        <div className="flex flex-col">
          <div className="text-sm font-semibold group-hover:text-primary-dark">{complaint.title}</div>
          <div className="text-xs text-dark/70 truncate max-w-xs mt-1">{complaint.description}</div>
        </div>
      </td>

      {/* Location */}
      <td className="px-6 py-6">
        <div className="text-sm text-dark/80 text-center bg-light rounded-lg px-3 py-2 border border-dark-light/10 min-w-[150px]">
          {complaint.location}
        </div>
      </td>

      <td className="px-6 py-6">
        <StatusSelect item={complaint} onUpdateStatus={onUpdateStatus} />
      </td>

      {/* Date */}
      <td className="px-6 py-6">
        <div className="text-sm text-dark/70 min-w-[170px] bg-light/50 rounded-lg px-3 py-2 text-center border border-dark-light/10">
          {formatDate(complaint.dateSubmitted) || "—"}
        </div>
      </td>

      <td className="px-6 py-6">
        <div className="flex justify-center space-x-2">
          <button onClick={() => onViewDetails(complaint)} className="flex gap-2 items-center px-3 py-2 text-xs font-medium text-primary bg-light rounded-lg hover:bg-primary hover:text-white smooth-transition cursor-pointer">
            <Eye className="w-4 h-4" /> View
          </button>
          <button onClick={() => onDeleteComplaint(complaint.id)} className=" px-3 py-2 text-xs font-medium text-accent bg-accent/20 rounded-lg hover:bg-accent hover:text-white smooth-transition cursor-pointer">
            <Trash className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );

  return <TableLayout columns={columns} data={complaints} renderRow={renderRow} type="complaints" />;
}
