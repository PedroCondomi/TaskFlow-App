import { useState, useEffect } from "react";
import { useUpdateTask } from "../../hooks/useTasks";
import { Task } from "../../types/task";
import Modal from "../ui/Modal";

type Props = {
  task: Task | null;
  open: boolean;
  onClose: () => void;
};

export default function EditTaskModal({ task, open, onClose }: Props) {
  const { mutate: updateTask } = useUpdateTask();

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
        <h3 className="text-lg font-semibold text-gray-800">Edit Task</h3>

        {/* Title */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-600">Title</label>
          <input
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={title}
            placeholder="Task title"
            onChange={e => setTitle(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-600">
            Description
          </label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Description"
            className="border border-gray-300 rounded-md px-3 py-2 w-full resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Date */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-600">Due date</label>
          <input
            type="date"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Priority */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-600">Priority</label>

          <select
            value={priority}
            onChange={e => setPriority(e.target.value as any)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
}
