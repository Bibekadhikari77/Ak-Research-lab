import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiClient";
import type { CreateUserInput, User } from "../_interfaces/user";

async function createUser(input: CreateUserInput): Promise<User> {
  return apiFetch<User>("/users", { method: "POST", body: input });
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: (created) => {
      // The demo API (JSONPlaceholder) accepts writes but never persists
      // them, so refetching would just return the original list — update
      // the cache from the response instead of invalidating.
      queryClient.setQueryData<User[]>(["users"], (users) =>
        users ? [...users, created] : [created],
      );
    },
  });
}
