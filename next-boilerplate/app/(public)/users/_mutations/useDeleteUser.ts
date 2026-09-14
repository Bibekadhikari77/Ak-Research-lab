import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiClient";
import type { User } from "../_interfaces/user";

async function deleteUser(id: number): Promise<void> {
  return apiFetch<void>(`/users/${id}`, { method: "DELETE" });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: (_data, id) => {
      queryClient.setQueryData<User[]>(["users"], (users) =>
        users?.filter((user) => user.id !== id),
      );
      queryClient.removeQueries({ queryKey: ["users", id] });
    },
  });
}
