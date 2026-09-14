import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiClient";
import type { User } from "../_interfaces/user";

async function fetchUsers(): Promise<User[]> {
  return apiFetch<User[]>("/users");
}

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 10_000,
  });
}
