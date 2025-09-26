import authApiRequest from "@/api/auth";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: authApiRequest.login,
  });
};

export const useAccountMe = () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  return useQuery({
    queryKey: ["account-me", token],
    queryFn: authApiRequest.me,
    enabled: !!token,
  });
};
