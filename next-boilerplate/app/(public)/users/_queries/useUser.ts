import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiClient";
import type { User } from "../_interfaces/user";

async function fetchUser(id: number): Promise<User> {
  return apiFetch<User>(`/users/${id}`);
}

export function useUser(id: number) {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => fetchUser(id),
    enabled: Number.isFinite(id),
    // Mutations write this same key directly (see useUpdateUser) since the
    // demo API doesn't persist writes. A short staleTime stops an immediate
    // background refetch from overwriting that cache with stale server data.
    staleTime: 10_000,
  });
}
