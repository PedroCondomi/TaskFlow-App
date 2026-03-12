import { useState } from "react";
import { useMyTeams } from "../hooks/useTeams";
import { useUsers } from "../hooks/useUsers";
import { useAllTasks } from "../hooks/useTasks";
import TeamModal from "../components/modals/TeamModal";
import EditTeamModal from "../components/modals/EditTeamModal";
import TeamCard from "../components/teams/TeamCard";

export default function Teams() {
  const { data: teams, isLoading } = useMyTeams();
  const { data: users } = useUsers();
  const { data: tasks } = useAllTasks();

  const [openCreateModal, setOpenCreateModal] = useState(false);

  const [editOpen, setEditOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<any>(null);

  const openEdit = (team: any) => {
    setSelectedTeam(team);
    setEditOpen(true);
  };

  if (isLoading) return <p>Loading teams...</p>;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          My Teams
          <span className="ml-2 text-md text-gray-500">
            ({teams?.length ?? 0})
          </span>
        </h2>

        <button
          onClick={() => setOpenCreateModal(true)}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
        >
          New Team
        </button>
      </div>

      {/* TEAMS LIST */}
      <div className="space-y-3">
        {teams?.map(team => (
          <TeamCard
            key={team._id}
            team={team}
            tasks={tasks}
            users={users}
            openEdit={openEdit}
          />
        ))}
      </div>

      {/* MODALS */}
      <TeamModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
      />

      <EditTeamModal
        team={selectedTeam}
        open={editOpen}
        onClose={() => setEditOpen(false)}
      />
    </div>
  );
}
