"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@/app/(public)/users/_interfaces/user";
import { CreateUserDialog } from "./_components/create-user-dialog";
import { DeleteUserDialog } from "./_components/delete-user-dialog";
import { EditUserDialog } from "./_components/edit-user-dialog";
import { UsersTable } from "./_components/users-table";
import { ViewUserDialog } from "./_components/view-user-dialog";

export default function AdminUsersPage() {
  const router = useRouter();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [search, setSearch] = useState("");

  function handleView(user: User) {
    setSelectedUser(user);
    setViewOpen(true);
  }

  function handleEdit(user: User) {
    setSelectedUser(user);
    setEditOpen(true);
  }

  function handleDelete(user: User) {
    setSelectedUser(user);
    setDeleteOpen(true);
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              User Management
            </h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Admin view for the users demo — search, view, edit, and delete.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="shrink-0 rounded border border-black/[.08] px-3 py-2 text-sm dark:border-white/[.145]"
          >
            Log out
          </button>
        </div>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <input
            placeholder="Search by name or email..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="min-w-[220px] flex-1 rounded border border-black/[.08] bg-transparent px-3 py-2 text-sm dark:border-white/[.145]"
          />
          <button
            onClick={() => setCreateOpen(true)}
            className="bg-foreground text-background rounded px-4 py-2 text-sm font-medium"
          >
            + New user
          </button>
        </div>

        <div className="rounded-lg border border-black/[.08] bg-white dark:border-white/[.145] dark:bg-zinc-950">
          <div className="border-b border-black/[.08] px-4 py-3 dark:border-white/[.145]">
            <h2 className="font-semibold">Users list</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              All users returned by the demo API.
            </p>
          </div>
          <div className="p-4">
            <UsersTable
              search={search}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>

      <ViewUserDialog
        open={viewOpen}
        user={selectedUser}
        onClose={() => setViewOpen(false)}
      />
      <EditUserDialog
        open={editOpen}
        user={selectedUser}
        onClose={() => setEditOpen(false)}
      />
      <DeleteUserDialog
        open={deleteOpen}
        user={selectedUser}
        onClose={() => setDeleteOpen(false)}
      />
      <CreateUserDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
      />
    </main>
  );
}
