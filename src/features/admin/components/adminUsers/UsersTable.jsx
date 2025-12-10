import UserStatusBadge from "./UserStatusBadge";
import UserActions from "./UserActions";

export default function UsersTable({ users, onView, onDelete, onPromote }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-separate border border-accent-light/20 rounded-xl p-8 bg-white shadow-sm">
        <thead>
          <tr className="text-center text-primary">
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Joined</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-center h-10 shadow-sm rounded-md hover:bg-primary-light/10">
              <td className="px-2">USR-{user.id.toString().padStart(3, "0")}</td>

              <td>{user.name}</td>

              <td>{user.email}</td>

              <td>
                <UserStatusBadge role={user.role} />
              </td>

              <td className="px-2">{new Date(user.createdAt).toLocaleDateString()}</td>

              <td className="px-2">
                <UserActions
                  onView={() => onView(user)}
                  // onPromote={() => onPromote(user.id)}
                  onDelete={() => onDelete(user.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
