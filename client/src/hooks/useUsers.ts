import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUsers } from "../api/users";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
}
