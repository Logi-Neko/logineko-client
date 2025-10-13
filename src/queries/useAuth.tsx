/* eslint-disable @typescript-eslint/no-explicit-any */
import authApiRequest from "@/api/auth";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: authApiRequest.login,
  });
};

export const useLoginGGMutation = () => {
  return useMutation({
    mutationFn: authApiRequest.loginGG,
  });
};

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: authApiRequest.register,
  });
};

export const useAccountMe = () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  return useQuery({
    queryKey: ["account-me", token],
    queryFn: async () => {
      if (!token) throw new Error("No token found");

      try {
        const res = await authApiRequest.me();
        return res;
      } catch (error: any) {
        if (error?.response?.status === 401) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("profile");
        }
        throw error;
      }
    },
    enabled: !!token,
    retry: false,
  });
};
