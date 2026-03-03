import { useState } from "react";
import {
  useMyTeams,
  useCreateTeam,
  useAddMember,
  usePromoteMember,
  useDemoteAdmin,
  useRemoveMember,
  useDeleteTeam,
} from "../hooks/useTeams";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useUsers } from "../hooks/useUsers";
import { useAllTasks } from "../hooks/useTasks";

export default function Teams() {
  const { data: teams } = useMyTeams();
  const { data: users } = useUsers();
  const { data: tasks } = useAllTasks();

  const user = useAuthStore(s => s.user);
  const navigate = useNavigate();
  const createTeam = useCreateTeam();
  const addMember = useAddMember();
  const promoteMember = usePromoteMember();
  const demoteAdmin = useDemoteAdmin();
  const removeMember = useRemoveMember();
  const { mutate: deleteTeam } = useDeleteTeam();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

  const handleCreate = () => {
    if (!name) return;
    createTeam.mutate({ name, description: description || undefined });
    setName("");
    setDescription("");
  };

  return (
    <div>
      <h2>My teams</h2>

      <input
        placeholder="Team name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      ></textarea>

      <button onClick={handleCreate}>Create Team</button>

      {teams?.map(team => {
        const isAdmin = team.admins.some(a => a._id === user?._id);

        const teamTasks = tasks?.filter(
          task => task.team?._id.toString() === team._id.toString(),
        );

        return (
          <div key={team._id} style={{ marginTop: "20px" }}>
            <h2>{team.name}</h2>
            <h4>{team.description}</h4>

            <strong>Tasks:</strong>
            <ul>
              {teamTasks && teamTasks.length > 0 ? (
                teamTasks.map(task => (
                  <li key={task._id}>
                    {task.title} — {task.status}
                  </li>
                ))
              ) : (
                <li>No tasks for this team</li>
              )}
            </ul>

            <strong>Members:</strong>

            <ul>
              {team.members.map(member => (
                <li key={member._id}>
                  {member.name}

                  {team.admins.some(a => a._id === member._id) && (
                    <span> (admin)</span>
                  )}

                  {isAdmin && member._id !== user?._id && (
                    <button
                      onClick={() =>
                        promoteMember.mutate({
                          teamId: team._id,
                          userId: member._id,
                        })
                      }
                    >
                      Promote
                    </button>
                  )}
                  {isAdmin && member._id !== user?._id && (
                    <button
                      onClick={() =>
                        demoteAdmin.mutate({
                          teamId: team._id,
                          userId: member._id,
                        })
                      }
                    >
                      Demote
                    </button>
                  )}
                </li>
              ))}
            </ul>

            {isAdmin && (
              <select
                value={selectedUser}
                onChange={e => {
                  const userId = e.target.value;
                  if (!userId) return;

                  addMember.mutate({
                    teamId: team._id,
                    userId,
                  });
                  setSelectedUser("");
                }}
              >
                <option>Add member</option>

                {users?.map(user => (
                  <option key={user._id} value={user._id}>
                    {user.name}
                  </option>
                ))}
              </select>
            )}

            {isAdmin && (
              <select
                value={selectedUser}
                onChange={e => {
                  const userId = e.target.value;
                  if (!userId) return;

                  removeMember.mutate({
                    teamId: team._id,
                    userId,
                  });
                  setSelectedUser("");
                }}
              >
                <option>Remove member</option>

                {users?.map(user => (
                  <option key={user._id} value={user._id}>
                    {user.name}
                  </option>
                ))}
              </select>
            )}
            <button
              onClick={() => deleteTeam(team._id)}
              style={{ marginLeft: "8px" }}
            >
              X
            </button>
          </div>
        );
      })}
      <button onClick={() => navigate("/tasks")}>Ir a Tasks</button>
    </div>
  );
}
