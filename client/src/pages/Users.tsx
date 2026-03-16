import { useUsers } from "../hooks/useUsers";
import UserCard from "../components/users/userCard";

export default function Users() {
  const { data: users, isLoading } = useUsers();

  if (isLoading) return <p>Loading users...</p>;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          Users
          <span className="ml-2 text-sm text-gray-500">
            ({users?.length ?? 0})
          </span>
        </h2>
      </div>

      {/* USERS LIST */}
      <div className="space-y-3">
        {users?.map(user => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
}
