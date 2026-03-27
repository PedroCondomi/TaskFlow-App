import { useState } from "react";
import { useTranslation } from "../../hooks/useTranslation";

type Props = {
  team: any;
  users: any[];
  open: boolean;
  onClose: () => void;
  promoteMember: any;
  demoteAdmin: any;
  addMember: any;
  removeMember: any;
};

export default function ManageMembersModal({
  team,
  users,
  open,
  onClose,
  promoteMember,
  demoteAdmin,
  addMember,
  removeMember,
}: Props) {
  const { t } = useTranslation();

  const [selectedUser, setSelectedUser] = useState("");

  if (!open || !team) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {t("memberscard.header")}
        </h3>

        {/* MEMBERS LIST */}
        <div className="space-y-2">
          {team.members.map((member: any) => {
            const memberIsAdmin = team.admins.some(
              (a: any) => a._id === member._id,
            );

            return (
              <div
                key={member._id}
                className="flex items-center justify-between border border-gray-400 rounded-md px-3 py-2"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{member.name}</span>

                  <span className="text-xs text-gray-500">
                    {memberIsAdmin
                      ? t("memberscard.admin")
                      : t("memberscard.member")}
                  </span>
                </div>

                <div className="flex gap-2 text-xs">
                  {!memberIsAdmin && (
                    <button
                      onClick={() =>
                        promoteMember.mutate({
                          teamId: team._id,
                          userId: member._id,
                        })
                      }
                      className="px-2 py-1 rounded-md bg-green-100 text-green-700 hover:bg-green-200 text-xs font-medium transition"
                    >
                      {t("memberscard.promote")}
                    </button>
                  )}

                  {memberIsAdmin && (
                    <button
                      onClick={() =>
                        demoteAdmin.mutate({
                          teamId: team._id,
                          userId: member._id,
                        })
                      }
                      className="px-2 py-1 rounded-md bg-yellow-100 text-yellow-700 hover:bg-yellow-200 text-xs font-medium transition"
                    >
                      {t("memberscard.demote")}
                    </button>
                  )}

                  <button
                    onClick={() =>
                      removeMember.mutate({
                        teamId: team._id,
                        userId: member._id,
                      })
                    }
                    className="px-2 py-1 rounded-md bg-red-100 text-red-700 hover:bg-red-200 text-xs font-medium transition"
                  >
                    {t("memberscard.remove")}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* ADD MEMBER */}
        <div className="border-t border-gray-500 pt-3 flex gap-2">
          <select
            value={selectedUser}
            onChange={e => setSelectedUser(e.target.value)}
            className="border border-gray-400 rounded px-3 py-2 text-sm flex-1"
          >
            <option value="">{t("memberscard.selectuser")}</option>

            {users.map((u: any) => (
              <option key={u._id} value={u._id}>
                {u.name}
              </option>
            ))}
          </select>

          <button
            onClick={() => {
              if (!selectedUser) return;

              addMember.mutate({
                teamId: team._id,
                userId: selectedUser,
              });

              setSelectedUser("");
            }}
            className="px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
          >
            {t("memberscard.add")}
          </button>
        </div>

        {/* CLOSE */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-gray-100 rounded hover:bg-gray-200"
          >
            {t("memberscard.close")}
          </button>
        </div>
      </div>
    </div>
  );
}
