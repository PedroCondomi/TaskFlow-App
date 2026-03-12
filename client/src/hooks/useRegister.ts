import { useMutation } from "@tanstack/react-query";
import { registerUser, RegisterInput } from "../api/auth";

export function useRegister() {
  return useMutation({
    mutationFn: (data: RegisterInput) => registerUser(data),
  });
}
