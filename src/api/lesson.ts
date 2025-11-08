// Lesson API Service

import { learningApiDelete, learningApiGet, sendLearningRequest } from "@/lib/learning-api";
import { ApiResponse } from "@/types/api";
import { LessonDTO, LessonFilterRequest, LessonRequest } from "@/types/lesson";

const lessonApiRequest = {
  // Get all lessons
  getAll: () => learningApiGet<ApiResponse<LessonDTO[]>>("lessons"),

  // Get lesson by ID
  getById: (id: number) => learningApiGet<ApiResponse<LessonDTO>>(`lessons/${id}`),

  // Get lessons by course ID
  getByCourseId: (courseId: number) =>
    learningApiGet<ApiResponse<LessonDTO[]>>(`lessons/courses/${courseId}`),

  // Search lessons with filters
  search: (filters: LessonFilterRequest) =>
    sendLearningRequest<ApiResponse<LessonDTO[]>>({
      url: "lessons/search",
      method: "GET",
      body: filters,
    }),

  // Create lesson (with file upload)
  create: async (data: LessonRequest, thumbnail: File) => {
    const formData = new FormData();
    formData.append(
      "request",
      new Blob([JSON.stringify(data)], {
        type: "application/json",
      })
    );
    formData.append("thumbnail", thumbnail);

    return sendLearningRequest<ApiResponse<LessonDTO>>({
      url: "lessons",
      method: "POST",
      body: formData,
      headers: {},
    });
  },

  // Update lesson (with optional file upload)
  update: async (id: number, data: LessonRequest, thumbnail?: File) => {
    const formData = new FormData();
    formData.append(
      "request",
      new Blob([JSON.stringify(data)], {
        type: "application/json",
      })
    );
    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    return sendLearningRequest<ApiResponse<LessonDTO>>({
      url: `lessons/${id}`,
      method: "PATCH",
      body: formData,
      headers: {},
    });
  },

  // Delete lesson
  delete: (id: number) => learningApiDelete<ApiResponse<void>>(`lessons/${id}`),
};

export default lessonApiRequest;
