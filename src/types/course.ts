// Course Type Definitions

export interface CourseDTO {
  id: number;
  name: string;
  description: string;
  thumbnailUrl: string;
  thumbnailPublicId: string;
  totalLesson: number;
  isPremium: boolean;
  isActive: boolean;
  price: number;
  star: number;
  createdAt: string;
  updatedAt: string;
}

export interface CourseRequest {
  name: string;
  description: string;
  isPremium?: boolean;
  isActive?: boolean;
  price?: number;
}
