import { User } from "../../types/user";
import { useAuthStore } from "../../store/authStore";
import { useDeleteUser } from "../../hooks/useUsers";

type Props = {
  user: User;
};

export default function UserCard({ user }: Props) {
  const deleteUser = useDeleteUser();
  const currentUser = useAuthStore(s => s.user);

  const isAdmin = currentUser?.role === "admin";

  const handleDelete = () => {
    if (!confirm(`Delete user ${user.name}?`)) return;

    deleteUser.mutate(user._id);
  };

  return (
    <div className="group bg-white border rounded-lg px-4 py-4 flex items-center justify-between hover:shadow-sm hover:border-gray-300 transition">
      {/* USER INFO */}
      <div className="flex flex-col">
        <span className="font-medium text-gray-800">{user.name}</span>

        <span className="text-xs text-gray-500">{user.email}</span>

        <span className="text-xs text-gray-400 uppercase tracking-wide">
          {user.role}
        </span>
      </div>

      {/* ACTIONS */}
      {isAdmin && currentUser?._id !== user._id && (
        <div className="text-sm opacity-0 group-hover:opacity-100 transition">
          <button
            onClick={handleDelete}
            className="text-red-500 hover:underline"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
