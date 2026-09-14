"use client";

import type { User } from "@/app/(public)/users/_interfaces/user";
import { useUser } from "@/app/(public)/users/_queries/useUser";
import { Modal } from "./modal";

export function ViewUserDialog({
  open,
  user,
  onClose,
}: {
  open: boolean;
  user: User | null;
  onClose: () => void;
}) {
  const { data: fullUser, isPending } = useUser(user?.id ?? Number.NaN);
  const displayUser = fullUser ?? user;

  return (
    <Modal open={open} onClose={onClose} title="User details">
      {isPending ? (
        <div className="flex flex-col gap-3">
          <div className="h-9 w-full animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
          <div className="h-9 w-full animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
        </div>
      ) : displayUser ? (
        <div className="flex flex-col gap-3 text-sm">
          <div>
            <p className="text-xs font-semibold text-zinc-500 uppercase">
              Name
            </p>
            <p>{displayUser.name}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-zinc-500 uppercase">
              Email
            </p>
            <p>{displayUser.email}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-zinc-500 uppercase">ID</p>
            <p>{displayUser.id}</p>
          </div>
        </div>
      ) : (
        <p className="text-red-600 dark:text-red-400">
          Failed to load user details
        </p>
      )}
      <div className="mt-6 flex justify-end">
        <button
          onClick={onClose}
          className="rounded border border-black/[.08] px-3 py-2 text-sm dark:border-white/[.145]"
        >
          Close
        </button>
      </div>
    </Modal>
  );
}
