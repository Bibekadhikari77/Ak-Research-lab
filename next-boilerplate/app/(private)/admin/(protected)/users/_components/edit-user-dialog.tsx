"use client";

import { useState } from "react";
import type { User } from "@/app/(public)/users/_interfaces/user";
import { useUpdateUser } from "@/app/(public)/users/_mutations/useUpdateUser";
import { Modal } from "./modal";

export function EditUserDialog({
  open,
  user,
  onClose,
}: {
  open: boolean;
  user: User | null;
  onClose: () => void;
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Edit user"
      description={user ? `Update details for ${user.name}.` : undefined}
    >
      {/* Keyed by id so switching users remounts with fresh field values
          instead of syncing local state from props via an effect. */}
      {user && <EditUserForm key={user.id} user={user} onClose={onClose} />}
    </Modal>
  );
}

function EditUserForm({ user, onClose }: { user: User; onClose: () => void }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const updateUser = useUpdateUser();

  function handleSave() {
    updateUser.mutate(
      { id: user.id, input: { name, email } },
      { onSuccess: onClose },
    );
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          disabled={updateUser.isPending}
          className="rounded border border-black/[.08] bg-transparent px-3 py-2 text-sm dark:border-white/[.145]"
        />
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={updateUser.isPending}
          className="rounded border border-black/[.08] bg-transparent px-3 py-2 text-sm dark:border-white/[.145]"
        />
      </div>
      <div className="mt-6 flex justify-end gap-2">
        <button
          onClick={onClose}
          disabled={updateUser.isPending}
          className="rounded border border-black/[.08] px-3 py-2 text-sm dark:border-white/[.145]"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={updateUser.isPending}
          className="bg-foreground text-background rounded px-3 py-2 text-sm disabled:opacity-50"
        >
          {updateUser.isPending ? "Saving…" : "Save changes"}
        </button>
      </div>
    </>
  );
}
