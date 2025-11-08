// Lesson Type Definitions

export interface LessonDTO {
  id: number;
  name: string;
  description: string;
  order: number;
  minAge: number;
  maxAge: number;
  difficultyLevel: number;
  thumbnailUrl: string;
  duration: number;
  totalVideo: number;
  star: number;
  isPremium: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LessonRequest {
  courseId: number;
  name: string;
  description: string;
  order: number;
  minAge: number;
  maxAge: number;
  difficultyLevel: number;
  duration: number;
  isPremium?: boolean;
  isActive?: boolean;
}

export interface LessonFilterRequest {
  name?: string;
  description?: string;
  order?: number;
  minAge?: number;
  maxAge?: number;
  difficultyLevel?: number;
  duration?: number;
  isPremium?: boolean;
  createdAfter?: string;
  createdBefore?: string;
}
