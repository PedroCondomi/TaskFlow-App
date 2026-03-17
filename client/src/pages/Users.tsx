import { useUsers } from "../hooks/useUsers";
import { useTranslation } from "../hooks/useTranslation";
import UserCard from "../components/users/UserCard";

export default function Users() {
  const { data: users, isLoading } = useUsers();
  const { t } = useTranslation();

  if (isLoading) return <p>{t("users.loading")}</p>;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          {t("users.header")}
          <span className="ml-2 text-md text-gray-500">
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
