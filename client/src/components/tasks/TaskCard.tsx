import { Task } from "../../types/task";
import { useAuthStore } from "../../store/authStore";
import { useTranslation } from "../../hooks/useTranslation";
import {
  useDeleteTask,
  useUpdateTask,
  useAssignTask,
} from "../../hooks/useTasks";

type Props = {
  task: Task;
  openEdit: (task: Task) => void;
};

export default function TaskCard({ task, openEdit }: Props) {
  const user = useAuthStore(s => s.user);

  const { t } = useTranslation();
  const { mutate: updateTask } = useUpdateTask();
  const { mutate: deleteTask } = useDeleteTask();
  const { mutate: assignTaskMutate } = useAssignTask();

  const isAdmin = user?.role === "admin";

  const canEdit = isAdmin || (!task.team && task.createdBy._id === user?._id);
  const isAssignedToUser = task.assignedTo?._id === user?._id;
  const canChangeStatus = isAdmin || isAssignedToUser;

  const renderStatusOptions = () => (
    <>
      <option value="pending">{t("tasks.pending")}</option>
      <option value="in progress">{t("tasks.inprogress")}</option>
      <option value="completed">{t("tasks.completed")}</option>
    </>
  );

  return (
    <li className="group bg-white border border-gray-400 rounded-lg px-4 py-3 flex items-center gap-4 hover:bg-gray-50 hover:shadow-sm transition">
      {/* LEFT — Title + Desc */}
      <div className="flex flex-col flex-1 min-w-0">
        <div className="font-medium text-gray-800 break-words flex items-center gap-3 flex-wrap">
          {task.title.charAt(0).toUpperCase() + task.title.slice(1)}

          {task.team && (
            <span className="text-xs px-2 py-1 bg-gray-100 rounded">
              {task.team.name}
            </span>
          )}

          <span
            className={`text-xs px-2 py-1 rounded font-medium
            ${
              task.priority === "high"
                ? "bg-red-100 text-red-600"
                : task.priority === "medium"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
            }`}
          >
            {t(`taskCard.${task.priority}`)}
          </span>

          {task.dueDate && (
            <span className="text-xs text-gray-500 whitespace-nowrap">
              {new Date(task.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>

        {task.description && (
          <span className="text-xs text-gray-400 line-clamp-2">
            {task.description}
          </span>
        )}
      </div>

      {/* CENTER — Metadata */}
      <div className="flex items-center gap-3 flex-shrink-0">
        {/* Status */}
        {canChangeStatus ? (
          <select
            value={task.status}
            disabled={!canChangeStatus}
            onChange={e =>
              updateTask({
                id: task._id,
                data: { status: e.target.value as any },
              })
            }
            className={`text-xs border rounded px-2 py-1 ${
              !canChangeStatus
                ? "bg-gray-100 text-gray-600 cursor-not-allowed"
                : ""
            }`}
          >
            {renderStatusOptions()}
          </select>
        ) : (
          <span className="text-sm text-gray-500">
            {t(`tasks.status`)}: {t(`tasks.${task.status}`)}
          </span>
        )}

        {/* Assigned */}
        {task.team && (
          <select
            value={task.assignedTo?._id || ""}
            disabled={!isAdmin}
            onChange={e =>
              assignTaskMutate({
                id: task._id,
                assignedTo: e.target.value,
              })
            }
            className={`text-xs border rounded px-2 py-1 ${
              !isAdmin ? "bg-gray-100 text-gray-600 cursor-not-allowed" : ""
            }`}
          >
            {task.team.members.map(member => (
              <option key={member._id} value={member._id}>
                {member.name}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* RIGHT — Actions */}
      <div className="flex items-center gap-3 w-24 justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {canEdit && (
          <button
            onClick={() => openEdit(task)}
            className="text-blue-600 hover:underline"
          >
            {t(`tasks.edit`)}
          </button>
        )}

        {canEdit && (
          <button
            onClick={() => deleteTask(task._id)}
            className="text-red-500 hover:underline"
          >
            {t(`tasks.delete`)}
          </button>
        )}
      </div>
    </li>
  );
}
