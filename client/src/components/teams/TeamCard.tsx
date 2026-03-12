import { useAuthStore } from "../../store/authStore";
import {
  useAddMember,
  usePromoteMember,
  useDemoteAdmin,
  useRemoveMember,
} from "../../hooks/useTeams";
import { Team } from "../../types/team";
import { Task } from "../../types/task";
import { User } from "../../types/user";
import { useState } from "react";
import ManageMembersModal from "../modals/ManageMembersModal";

type Props = {
  team: Team;
  tasks: Task[] | undefined;
  users: User[] | undefined;
  openEdit: (team: Team) => void;
};

export default function TeamCard({ team, tasks, users, openEdit }: Props) {
  const user = useAuthStore(s => s.user);

  const addMember = useAddMember();
  const promoteMember = usePromoteMember();
  const demoteAdmin = useDemoteAdmin();
  const removeMember = useRemoveMember();

  const isAdmin = team.admins.some(a => a._id === user?._id);

  const teamTasks = tasks?.filter(
    task => task.team?._id.toString() === team._id.toString(),
  );

  const [membersOpen, setMembersOpen] = useState(false);

  return (
    <>
      <div className="group bg-white border border-gray-400 rounded-lg px-4 py-4 flex items-center justify-between hover:shadow-sm transition">
        {/* LEFT SIDE */}
        <div className="flex flex-col gap-1 flex-1">
          {/* TEAM NAME */}
          <div className="font-medium text-gray-800">
            {team.name.charAt(0).toUpperCase() + team.name.slice(1)}
          </div>

          {/* DESCRIPTION */}
          {team.description && (
            <span className="text-xs text-gray-400">{team.description}</span>
          )}

          {/* META */}
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span>{team.members.length} members</span>

            <span>{teamTasks?.length ?? 0} tasks</span>
          </div>

          {/* MEMBERS PREVIEW */}
          <div className="text-xs text-gray-400">
            {team.members
              .slice(0, 3)
              .map(m => m.name)
              .join(" • ")}

            {team.members.length > 3 && ` +${team.members.length - 3}`}
          </div>
        </div>

        {/* ACTIONS */}
        {isAdmin && (
          <div className="flex items-center gap-3 text-sm opacity-0 group-hover:opacity-100 transition">
            <button
              onClick={() => setMembersOpen(true)}
              className="text-gray-600 hover:underline"
            >
              Members
            </button>

            <button
              onClick={() => openEdit(team)}
              className="text-blue-600 hover:underline"
            >
              Edit
            </button>
          </div>
        )}
      </div>

      <ManageMembersModal
        team={team}
        users={users || []}
        open={membersOpen}
        onClose={() => setMembersOpen(false)}
        promoteMember={promoteMember}
        demoteAdmin={demoteAdmin}
        addMember={addMember}
        removeMember={removeMember}
      />
    </>
  );
}
