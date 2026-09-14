"use client";

import { useState } from "react";
import { useCreateUser } from "@/app/(public)/users/_mutations/useCreateUser";
import { Modal } from "./modal";

export function CreateUserDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const createUser = useCreateUser();

  function handleCreate() {
    if (!name.trim() || !email.trim()) return;

    createUser.mutate(
      { name: name.trim(), email: email.trim() },
      {
        onSuccess: () => {
          setName("");
          setEmail("");
          onClose();
        },
      },
    );
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Create new user"
      description="Add a new user to the demo list."
    >
      <div className="flex flex-col gap-3">
        <input
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          disabled={createUser.isPending}
          className="rounded border border-black/[.08] bg-transparent px-3 py-2 text-sm dark:border-white/[.145]"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={createUser.isPending}
          className="rounded border border-black/[.08] bg-transparent px-3 py-2 text-sm dark:border-white/[.145]"
        />
      </div>
      <div className="mt-6 flex justify-end gap-2">
        <button
          onClick={onClose}
          disabled={createUser.isPending}
          className="rounded border border-black/[.08] px-3 py-2 text-sm dark:border-white/[.145]"
        >
          Cancel
        </button>
        <button
          onClick={handleCreate}
          disabled={createUser.isPending || !name.trim() || !email.trim()}
          className="bg-foreground text-background rounded px-3 py-2 text-sm disabled:opacity-50"
        >
          {createUser.isPending ? "Creating…" : "Create user"}
        </button>
      </div>
    </Modal>
  );
}
