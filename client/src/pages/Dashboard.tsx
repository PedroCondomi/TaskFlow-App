import { useState } from "react";
import { useMyTasks } from "../hooks/useTasks";
import { Task } from "../types/task";
import { useTranslation } from "../hooks/useTranslation";
import TaskModal from "../components/modals/TaskModal";
import EditTaskModal from "../components/modals/EditTaskModal";
import TaskCard from "../components/tasks/TaskCard";

export default function Dashboard() {
  const { data: tasks, isLoading } = useMyTasks();
  const { t } = useTranslation();
  const [editOpen, setEditOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [openModal, setOpenModal] = useState(false);

  const openEdit = (task: Task) => {
    setSelectedTask(task);
    setEditOpen(true);
  };

  const groupedTasks = {
    pending: tasks?.filter(t => t.status === "pending") || [],
    inprogress: tasks?.filter(t => t.status === "in progress") || [],
    completed: tasks?.filter(t => t.status === "completed") || [],
  };

  if (isLoading) return <p>{t("tasks.loading")}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{t("tasks.header")}</h2>

        <button
          onClick={() => setOpenModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          {t("tasks.newtask")}
        </button>
      </div>

      <TaskModal open={openModal} onClose={() => setOpenModal(false)} />

      <div className="space-y-6">
        {/* Pending */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 mb-2">
            {t("tasks.pending") + "s"} ({groupedTasks.pending.length})
          </h3>

          <ul className="space-y-2">
            {groupedTasks.pending.map(task => (
              <TaskCard key={task._id} task={task} openEdit={openEdit} />
            ))}
          </ul>
        </div>

        {/* In Progress */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 mb-2">
            {t("tasks.inprogress")} ({groupedTasks.inprogress.length})
          </h3>

          <ul className="space-y-2">
            {groupedTasks.inprogress.map(task => (
              <TaskCard key={task._id} task={task} openEdit={openEdit} />
            ))}
          </ul>
        </div>

        {/* Completed */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 mb-2">
            {t("tasks.completed") + "s"} ({groupedTasks.completed.length})
          </h3>

          <ul className="space-y-2">
            {groupedTasks.completed.map(task => (
              <TaskCard key={task._id} task={task} openEdit={openEdit} />
            ))}
          </ul>
        </div>
      </div>

      <EditTaskModal
        task={selectedTask}
        open={editOpen}
        onClose={() => setEditOpen(false)}
      />
    </div>
  );
}
