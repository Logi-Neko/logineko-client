// Statistics Type Definitions

import { CourseDTO } from "./course";
import { LessonDTO } from "./lesson";

export interface StatisticDTO {
  courses: CourseDTO[];
  lessons: LessonDTO[];
  from: string;
  to: string;
}

export interface MonthData {
  month: number;
  revenue: number;
  newUsers: number;
  newPremiumUsers: number;
  monthOverMonthGrowth: number;
}

export interface AdminStatDTO {
  totalUsers: number;
  totalPremiumUsers: number;
  totalRevenue: number;
  totalQuestions: number;
  year: number;
  totalRevenueInYear: number;
  averageRevenueInMonth: number;
  monthWithHighestRevenue: number;
  yearOverYearGrowth: number;
  monthData: MonthData[];
}
