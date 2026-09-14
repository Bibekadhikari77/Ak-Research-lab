import { UsersView } from "./_components/users-view";

export default function UsersPage() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-6 py-16">
      <div>
        <h1 className="text-2xl font-semibold">Users</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          CRUD demo built with TanStack Query — useQuery for reads, useMutation
          for create/update/delete.
        </p>
      </div>
      <UsersView />
    </div>
  );
}
