"use client";

import { useUsers } from "@/app/(public)/users/_queries/useUsers";
import type { User } from "@/app/(public)/users/_interfaces/user";

export function UsersTable({
  search,
  onView,
  onEdit,
  onDelete,
}: {
  search: string;
  onView: (user: User) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}) {
  const { data: users = [], isPending, isError } = useUsers();
  const filtered = users.filter((user) =>
    `${user.name} ${user.email}`.toLowerCase().includes(search.toLowerCase()),
  );

  if (isPending) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }, (_, index) => (
          <div
            key={`skeleton-${index}`}
            className="h-12 w-full animate-pulse rounded bg-zinc-100 dark:bg-zinc-800"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <p className="py-8 text-center text-red-600 dark:text-red-400">
        Failed to load users
      </p>
    );
  }

  if (filtered.length === 0) {
    return (
      <p className="py-8 text-center text-zinc-600 dark:text-zinc-400">
        No users found
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-black/[.08] text-zinc-600 dark:border-white/[.145] dark:text-zinc-400">
            <th className="py-2 pr-4 font-medium">Name</th>
            <th className="py-2 pr-4 font-medium">Email</th>
            <th className="py-2 pr-4 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((user) => (
            <tr
              key={user.id}
              className="border-b border-black/[.05] last:border-0 dark:border-white/[.08]"
            >
              <td className="py-3 pr-4">{user.name}</td>
              <td className="py-3 pr-4 text-zinc-600 dark:text-zinc-400">
                {user.email}
              </td>
              <td className="py-3 pr-4">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onView(user)}
                    className="rounded px-2 py-1 text-xs hover:bg-black/[.04] dark:hover:bg-white/[.08]"
                  >
                    View
                  </button>
                  <button
                    onClick={() => onEdit(user)}
                    className="rounded px-2 py-1 text-xs hover:bg-black/[.04] dark:hover:bg-white/[.08]"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(user)}
                    className="rounded px-2 py-1 text-xs text-red-600 hover:bg-red-600/10 dark:text-red-400"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
