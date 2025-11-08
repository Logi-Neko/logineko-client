// Statistics React Query Hooks

import statisticsApiRequest from "@/api/statistics";
import { useQuery } from "@tanstack/react-query";

// Query key factory
export const statisticsKeys = {
  all: ["statistics"] as const,
  user: (accountId: number, from: string, to: string) =>
    [...statisticsKeys.all, "user", accountId, from, to] as const,
  admin: (year: number) => [...statisticsKeys.all, "admin", year] as const,
};

// Get user statistics
export const useGetUserStatistics = (
  accountId: number,
  from: string,
  to: string
) => {
  return useQuery({
    queryKey: statisticsKeys.user(accountId, from, to),
    queryFn: async () => {
      const response = await statisticsApiRequest.getUserStats(
        accountId,
        from,
        to
      );
      return response.data;
    },
    enabled: !!accountId && !!from && !!to,
  });
};

// Get admin statistics
export const useGetAdminStatistics = (year: number = 2025) => {
  return useQuery({
    queryKey: statisticsKeys.admin(year),
    queryFn: async () => {
      const response = await statisticsApiRequest.getAdminStats(year);
      return response.data;
    },
    enabled: !!year,
  });
};
