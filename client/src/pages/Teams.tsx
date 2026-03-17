import { useState } from "react";
import { useMyTeams } from "../hooks/useTeams";
import { useUsers } from "../hooks/useUsers";
import { useAllTasks } from "../hooks/useTasks";
import TeamModal from "../components/modals/TeamModal";
import EditTeamModal from "../components/modals/EditTeamModal";
import TeamCard from "../components/teams/TeamCard";
import { useTranslation } from "../hooks/useTranslation";

export default function Teams() {
  const { data: teams, isLoading } = useMyTeams();
  const { data: users } = useUsers();
  const { data: tasks } = useAllTasks();
  const { t } = useTranslation();

  const [openCreateModal, setOpenCreateModal] = useState(false);

  const [editOpen, setEditOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<any>(null);

  const openEdit = (team: any) => {
    setSelectedTeam(team);
    setEditOpen(true);
  };

  if (isLoading) return <p>{t(`teams.loading`)}</p>;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          {t(`teams.header`)}
          <span className="ml-2 text-md text-gray-500">
            ({teams?.length ?? 0})
          </span>
        </h2>

        <button
          onClick={() => setOpenCreateModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          {t(`teams.newteam`)}
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
