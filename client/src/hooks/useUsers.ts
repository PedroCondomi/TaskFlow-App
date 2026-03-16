import {
  useQuery,
  UseQueryOptions,
  useQueryClient,
  useMutation,
} from "@tanstack/react-query";
import { getUsers, deleteUser } from "../api/users";
import { User } from "../types/user";

export function useUsers(options?: UseQueryOptions<User[]>) {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers,
    ...options,
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
