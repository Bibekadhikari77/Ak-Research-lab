"use client";

import type { User } from "@/app/(public)/users/_interfaces/user";
import { useDeleteUser } from "@/app/(public)/users/_mutations/useDeleteUser";
import { Modal } from "./modal";

export function DeleteUserDialog({
  open,
  user,
  onClose,
}: {
  open: boolean;
  user: User | null;
  onClose: () => void;
}) {
  const deleteUser = useDeleteUser();

  function handleDelete() {
    if (!user) return;
    deleteUser.mutate(user.id, { onSuccess: onClose });
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Delete user"
      description="This action cannot be undone."
    >
      {user && (
        <p className="rounded bg-red-600/10 p-2 text-sm text-red-600 dark:text-red-400">
          {user.name} ({user.email})
        </p>
      )}
      <div className="mt-6 flex justify-end gap-2">
        <button
          onClick={onClose}
          disabled={deleteUser.isPending}
          className="rounded border border-black/[.08] px-3 py-2 text-sm dark:border-white/[.145]"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          disabled={deleteUser.isPending}
          className="rounded bg-red-600 px-3 py-2 text-sm text-white disabled:opacity-50"
        >
          {deleteUser.isPending ? "Deleting…" : "Delete"}
        </button>
      </div>
    </Modal>
  );
}
