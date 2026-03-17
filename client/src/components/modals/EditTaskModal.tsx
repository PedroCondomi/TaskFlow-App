import { useState, useEffect } from "react";
import { useUpdateTask } from "../../hooks/useTasks";
import { Task } from "../../types/task";
import Modal from "../ui/Modal";
import { useTranslation } from "../../hooks/useTranslation";

type Props = {
  task: Task | null;
  open: boolean;
  onClose: () => void;
};

export default function EditTaskModal({ task, open, onClose }: Props) {
  const { mutate: updateTask } = useUpdateTask();

  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");

  useEffect(() => {
    if (!task) return;

    setTitle(task.title);
    setDescription(task.description || "");
    setDueDate(task.dueDate ? task.dueDate.slice(0, 10) : "");
    setPriority(task.priority);
  }, [task]);

  if (!open || !task) return null;

  const submit = () => {
    updateTask({
      id: task._id,
      data: {
        title,
        description,
        dueDate: dueDate || undefined,
        priority,
      },
    });

    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md space-y-3">
        <h3 className="text-lg font-semibold text-gray-800">
          {t(`taskCard.editheader`)}
        </h3>

        {/* Title */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-600">
            {t(`taskCard.title`)}
          </label>
          <input
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={title}
            placeholder={t(`taskCard.titleplc`)}
            onChange={e => setTitle(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-600">
            {t(`taskCard.description`)}
          </label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder={t(`taskCard.descriptionplc`)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Date */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-600">
            {t(`taskCard.duedate`)}
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Priority */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-600">
            {t(`taskCard.priority`)}
          </label>

          <select
            value={priority}
            onChange={e => setPriority(e.target.value as any)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="low">{t(`taskCard.low`)}</option>
            <option value="medium">{t(`taskCard.medium`)}</option>
            <option value="high">{t(`taskCard.high`)}</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition"
          >
            {t(`taskCard.cancel`)}
          </button>
          <button
            onClick={submit}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {t(`taskCard.save`)}
          </button>
        </div>
      </div>
    </Modal>
  );
}
