// Course API Service

import { learningApiGet, sendLearningRequest } from "@/lib/learning-api";
import { ApiResponse } from "@/types/api";
import { CourseDTO, CourseRequest } from "@/types/course";

const courseApiRequest = {
  // Get all courses
  getAll: () => learningApiGet<ApiResponse<CourseDTO[]>>("courses"),

  // Get course by ID
  getById: (id: number) => learningApiGet<ApiResponse<CourseDTO>>(`courses/${id}`),

  // Create course (with file upload)
  create: async (data: CourseRequest, thumbnail: File) => {
    const formData = new FormData();
    formData.append(
      "request",
      new Blob([JSON.stringify(data)], {
        type: "application/json",
      })
    );
    formData.append("thumbnail", thumbnail);

    return sendLearningRequest<ApiResponse<CourseDTO>>({
      url: "courses",
      method: "POST",
      body: formData,
      headers: {},
    });
  },

  // Update course (with optional file upload)
  update: async (id: number, data: CourseRequest, thumbnail?: File) => {
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

    return sendLearningRequest<ApiResponse<CourseDTO>>({
      url: `courses/${id}`,
      method: "PATCH",
      body: formData,
      headers: {},
    });
  },
};

export default courseApiRequest;
