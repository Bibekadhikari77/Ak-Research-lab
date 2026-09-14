import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiClient";
import type { UpdateUserInput, User } from "../_interfaces/user";

async function updateUser(id: number, input: UpdateUserInput): Promise<User> {
  return apiFetch<User>(`/users/${id}`, { method: "PUT", body: input });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: number; input: UpdateUserInput }) =>
      updateUser(id, input),
    onSuccess: (updated, { id }) => {
      queryClient.setQueryData<User[]>(["users"], (users) =>
        users?.map((user) => (user.id === id ? updated : user)),
      );
      queryClient.setQueryData(["users", id], updated);
    },
  });
}
