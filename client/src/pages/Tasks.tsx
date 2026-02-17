import { useState } from "react";
import {
  useMyTasks,
  useCreateTask,
  useDeleteTask,
  useUpdateTask,
  useAssignTask,
} from "../hooks/useTasks";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

export default function Tasks() {
  const { data: tasks, isLoading } = useMyTasks();
  const { mutate: createTask, isPending } = useCreateTask();
  const { mutate: updateTask } = useUpdateTask();
  const { mutate: deleteTask } = useDeleteTask();
  const { mutate: assignTaskMutate } = useAssignTask();

  const [title, setTitle] = useState("");

  const logout = useAuthStore(s => s.logout);
  const navigate = useNavigate();

  const doLogout = () => {
    logout();
    navigate("/");
  };

  const submit = () => {
    if (!title.trim()) return;

    createTask({ title });
    setTitle("");
  };

  if (isLoading) return <p>Cargando tasks...</p>;

  return (
    <div>
      <button onClick={doLogout}>Logout</button>

      <h2>My Tasks</h2>

      <input
        placeholder="Nueva task"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <button onClick={submit} disabled={isPending}>
        Crear
      </button>

      <ul>
        {tasks?.map(task => (
          <li key={task._id} style={{ marginBottom: "8px" }}>
            <strong>{task.title}</strong>

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
                <option value="">Unassigned</option>

                {task.team.members.map(member => (
                  <option key={member._id} value={member._id}>
                    {member.name}
                  </option>
                ))}
              </select>
            )}

            <span style={{ marginLeft: "8px" }}>{task.priority}</span>

            <button
              onClick={() => deleteTask(task._id)}
              style={{ marginLeft: "8px" }}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
