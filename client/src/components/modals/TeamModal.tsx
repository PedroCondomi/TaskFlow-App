import { useState } from "react";
import { useCreateTeam } from "../../hooks/useTeams";
import Modal from "../ui/Modal";
import { useTranslation } from "../../hooks/useTranslation";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function TeamModal({ open, onClose }: Props) {
  const createTeam = useCreateTeam();
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  if (!open) return null;

  const handleCreate = () => {
    if (!name) return;

    createTeam.mutate({
      name,
      description: description || undefined,
    });

    setName("");
    setDescription("");
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md space-y-3">
        <h3 className="text-lg font-semibold text-gray-800">
          {t(`teamCard.newheader`)}
        </h3>

        {/* Title */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-600">
            {t(`teamCard.title`)}
          </label>

          <input
            placeholder={t(`teamCard.titleplc`)}
            value={name}
            onChange={e => setName(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-600">
            {t(`teamCard.description`)}
          </label>
          <textarea
            placeholder={t(`teamCard.descriptionplc`)}
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition"
          >
            {t(`teamCard.cancel`)}
          </button>
          <button
            onClick={handleCreate}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {t(`teamCard.create`)}
          </button>
        </div>
      </div>
    </Modal>
  );
}
