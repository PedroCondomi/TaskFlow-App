import { useEffect, useState } from "react";
import { useUpdateTeam, useDeleteTeam } from "../../hooks/useTeams";
import { Team } from "../../types/team";
import Modal from "../ui/Modal";
import { useTranslation } from "../../hooks/useTranslation";

type Props = {
  team: Team | null;
  open: boolean;
  onClose: () => void;
};

export default function EditTeamModal({ team, open, onClose }: Props) {
  const updateTeam = useUpdateTeam();
  const { mutate: deleteTeam } = useDeleteTeam();
  const { t } = useTranslation();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (team) {
      setName(team.name);
      setDescription(team.description || "");
    }
  }, [team]);

  if (!open || !team) return null;

  const handleUpdate = () => {
    updateTeam.mutate({
      id: team._id,
      data: {
        name,
        description: description || undefined,
      },
    });

    onClose();
  };

  const handleDelete = () => {
    deleteTeam(team._id);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md space-y-3">
        <h3 className="text-lg font-semibold text-gray-800">
          {t(`teamCard.editheader`)}
        </h3>

        {/* Name */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-600">
            {t(`teamCard.title`)}
          </label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder={t(`teamCard.titleplc`)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-600">
            {t(`teamCard.description`)}
          </label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder={t(`teamCard.descriptionplc`)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={handleDelete}
            className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition"
          >
            {t(`teamCard.delete`)}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition"
          >
            {t(`teamCard.cancel`)}
          </button>
          <button
            onClick={handleUpdate}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {t(`teamCard.save`)}
          </button>
        </div>
      </div>
    </Modal>
  );
}
