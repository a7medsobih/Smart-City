export default function UserStatusBadge({ role }) {
  return (
    <span
      className={`px-3 py-1.5 text-xs font-semibold rounded-full border
    ${role === "Admin"
          ? "bg-green-50 text-green-600 border-green-200"
          : "bg-blue-50 text-blue-600 border-blue-200"
        }`}
    >
      {role === "Admin" ? "Admin" : "Citizen"}
    </span>
  );
}
