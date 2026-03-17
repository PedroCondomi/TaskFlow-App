import { useState } from "react";
import { useCreateTask } from "../../hooks/useTasks";
import { useMyTeams } from "../../hooks/useTeams";
import Modal from "../ui/Modal";
import { useTranslation } from "../../hooks/useTranslation";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function TaskModal({ open, onClose }: Props) {
  const { data: teams } = useMyTeams();
  const { mutate: createTask, isPending } = useCreateTask();

  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [teamId, setTeamId] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");

  if (!open) return null;

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

    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md space-y-3">
        <h3 className="text-lg font-semibold text-gray-800">
          {" "}
          {t(`taskCard.newheader`)}
        </h3>

        {/* Title */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-600">
            {t(`taskCard.title`)}
          </label>
          <input
            placeholder={t(`taskCard.titleplc`)}
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-600">
            {t(`taskCard.description`)}
          </label>
          <textarea
            placeholder={t(`taskCard.descriptionplc`)}
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={3}
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

        {/* Grid for selects */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">
              {t(`taskCard.team`)}
            </label>
            <select
              value={teamId}
              onChange={e => setTeamId(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">{t(`taskCard.personal`)}</option>
              {teams?.map(team => (
                <option key={team._id} value={team._id}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>

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
            disabled={isPending}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {t(`taskCard.create`)}
          </button>
        </div>
      </div>
    </Modal>
  );
}
