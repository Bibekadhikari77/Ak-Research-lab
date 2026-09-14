"use client";

import { useState } from "react";
import { useCreateUser } from "../_mutations/useCreateUser";
import { useDeleteUser } from "../_mutations/useDeleteUser";
import { useUpdateUser } from "../_mutations/useUpdateUser";
import { useUsers } from "../_queries/useUsers";
import type { User } from "../_interfaces/user";

export function UsersView() {
  const { data: users, isPending, isError, error } = useUsers();

  if (isPending) {
    return <p className="text-zinc-600 dark:text-zinc-400">Loading users…</p>;
  }

  if (isError) {
    return (
      <p className="text-red-600 dark:text-red-400">
        Failed to load users: {error.message}
      </p>
    );
  }

  return (
    <div className="flex w-full flex-col gap-8">
      <CreateUserForm />
      <ul className="flex flex-col gap-3">
        {users.map((user) => (
          <UserRow key={user.id} user={user} />
        ))}
      </ul>
    </div>
  );
}

function CreateUserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const createUser = useCreateUser();

  return (
    <form
      className="flex flex-col gap-3 sm:flex-row"
      onSubmit={(event) => {
        event.preventDefault();
        createUser.mutate(
          { name, email },
          {
            onSuccess: () => {
              setName("");
              setEmail("");
            },
          },
        );
      }}
    >
      <input
        required
        placeholder="Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        className="flex-1 rounded border border-black/[.08] bg-transparent px-3 py-2 text-sm dark:border-white/[.145]"
      />
      <input
        required
        type="email"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className="flex-1 rounded border border-black/[.08] bg-transparent px-3 py-2 text-sm dark:border-white/[.145]"
      />
      <button
        type="submit"
        disabled={createUser.isPending}
        className="bg-foreground text-background rounded px-4 py-2 text-sm font-medium transition-colors hover:bg-[#383838] disabled:opacity-50 dark:hover:bg-[#ccc]"
      >
        {createUser.isPending ? "Adding…" : "Add user"}
      </button>
    </form>
  );
}

function UserRow({ user }: { user: User }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();

  if (isEditing) {
    return (
      <li className="flex flex-col gap-2 rounded border border-black/[.08] p-3 sm:flex-row sm:items-center dark:border-white/[.145]">
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="flex-1 rounded border border-black/[.08] bg-transparent px-2 py-1 text-sm dark:border-white/[.145]"
        />
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="flex-1 rounded border border-black/[.08] bg-transparent px-2 py-1 text-sm dark:border-white/[.145]"
        />
        <div className="flex gap-2">
          <button
            disabled={updateUser.isPending}
            onClick={() =>
              updateUser.mutate(
                { id: user.id, input: { name, email } },
                { onSuccess: () => setIsEditing(false) },
              )
            }
            className="bg-foreground text-background rounded px-3 py-1 text-sm disabled:opacity-50"
          >
            {updateUser.isPending ? "Saving…" : "Save"}
          </button>
          <button
            onClick={() => {
              setName(user.name);
              setEmail(user.email);
              setIsEditing(false);
            }}
            className="rounded border border-black/[.08] px-3 py-1 text-sm dark:border-white/[.145]"
          >
            Cancel
          </button>
        </div>
      </li>
    );
  }

  return (
    <li className="flex items-center justify-between gap-3 rounded border border-black/[.08] p-3 dark:border-white/[.145]">
      <div>
        <p className="font-medium">{user.name}</p>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{user.email}</p>
      </div>
      <div className="flex shrink-0 gap-2">
        <button
          onClick={() => setIsEditing(true)}
          className="rounded border border-black/[.08] px-3 py-1 text-sm dark:border-white/[.145]"
        >
          Edit
        </button>
        <button
          disabled={deleteUser.isPending && deleteUser.variables === user.id}
          onClick={() => deleteUser.mutate(user.id)}
          className="rounded border border-red-600/30 px-3 py-1 text-sm text-red-600 disabled:opacity-50 dark:text-red-400"
        >
          {deleteUser.isPending && deleteUser.variables === user.id
            ? "Deleting…"
            : "Delete"}
        </button>
      </div>
    </li>
  );
}
