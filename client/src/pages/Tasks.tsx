import { useState } from "react";
import {
  useMyTasks,
  useCreateTask,
  useDeleteTask,
  useUpdateTask,
  useAssignTask,
} from "../hooks/useTasks";
import { useMyTeams } from "../hooks/useTeams";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

export default function Tasks() {
  const { data: tasks, isLoading } = useMyTasks();
  const { data: teams } = useMyTeams();
  const { mutate: createTask, isPending } = useCreateTask();
  const { mutate: updateTask } = useUpdateTask();
  const { mutate: deleteTask } = useDeleteTask();
  const { mutate: assignTaskMutate } = useAssignTask();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [teamId, setTeamId] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");

  const logout = useAuthStore(s => s.logout);
  const navigate = useNavigate();

  const doLogout = () => {
    logout();
    navigate("/");
  };

  const submit = () => {
    if (!title.trim()) return;

    createTask({
      title,
      description,
      team: teamId,
      priority: priority || undefined,
      dueDate: dueDate || undefined,
    });
    setTitle("");
    setDescription("");
    setTeamId("");
    setDueDate("");
    setPriority("medium");
  };

  if (isLoading) return <p>Cargando tasks...</p>;

  return (
    <div>
      <button onClick={doLogout}>Logout</button>

      <h2>My Tasks</h2>

      {/* Name selector */}
      <input
        placeholder="New task"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      {/* Description selector */}
      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      ></textarea>

      {/* Date selector */}
      <input
        type="date"
        value={dueDate}
        onChange={e => setDueDate(e.target.value)}
        style={{ marginLeft: "8px" }}
      />

      {/* Team selector */}
      <select
        value={teamId}
        onChange={e => setTeamId(e.target.value)}
        style={{ marginLeft: "8px" }}
      >
        <option value="">Personal task</option>

        {teams?.map(team => (
          <option key={team._id} value={team._id}>
            {team.name}
          </option>
        ))}
      </select>

      <select
        value={priority}
        onChange={e => setPriority(e.target.value as "low" | "medium" | "high")}
        style={{ marginLeft: "8px" }}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button onClick={submit} disabled={isPending}>
        Crear
      </button>

      {/* Task mapping */}
      <ul>
        {tasks?.map(task => (
          <li key={task._id} style={{ marginBottom: "8px" }}>
            <strong>{task.title}</strong>
            {task.team && (
              <span style={{ marginLeft: "8px" }}>[{task.team.name}]</span>
            )}
            {task.description && (
              <span style={{ marginLeft: "8px" }}>"{task.description}"</span>
            )}
            {task.dueDate && (
              <span style={{ marginLeft: "8px" }}>
                {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}
            <select
              value={task.status}
              onChange={e =>
                updateTask({
                  id: task._id,
                  data: { status: e.target.value as any },
                })
              }
              style={{ marginLeft: "8px" }}
            >
              <option value="pending">pending</option>
              <option value="in progress">in progress</option>
              <option value="completed">completed</option>
            </select>

            {task.team && (
              <select
                value={task.assignedTo?._id || ""}
                onChange={e =>
                  assignTaskMutate({
                    id: task._id,
                    assignedTo: e.target.value,
                  })
                }
                style={{ marginLeft: "8px" }}
              >
                {task.team.members.map(member => (
                  <option key={member._id} value={member._id}>
                    {member.name}
                  </option>
                ))}
              </select>
            )}

            <select
              value={task.priority}
              onChange={e =>
                updateTask({
                  id: task._id,
                  data: { priority: e.target.value as any },
                })
              }
              style={{ marginLeft: "8px" }}
            >
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="high">high</option>
            </select>

            <button
              onClick={() => deleteTask(task._id)}
              style={{ marginLeft: "8px" }}
            >
              X
            </button>
          </li>
        ))}
      </ul>
      {/* Go to Teams page */}
      <button onClick={() => navigate("/teams")}>Ir a Teams</button>
    </div>
  );
}
