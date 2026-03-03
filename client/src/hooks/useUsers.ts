import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getUsers } from "../api/users";
import { User } from "../types/user";

export function useUsers(options?: UseQueryOptions<User[]>) {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers,
    ...options,
  });
}
