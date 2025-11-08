// Statistics API Service

import { learningApiGet } from "@/lib/learning-api";
import { ApiResponse } from "@/types/api";
import { AdminStatDTO, StatisticDTO } from "@/types/statistics";

const statisticsApiRequest = {
  // Get user statistics
  getUserStats: (accountId: number, from: string, to: string) =>
    learningApiGet<ApiResponse<StatisticDTO>>(
      `statistics/${accountId}?from=${from}&to=${to}`
    ),

  // Get admin statistics
  getAdminStats: (year: number = 2025) =>
    learningApiGet<ApiResponse<AdminStatDTO>>(`statistics/admin?year=${year}`),
};

export default statisticsApiRequest;
