// Video API Service

import { learningApiDelete, learningApiGet, learningApiPost, sendLearningRequest } from "@/lib/learning-api";
import { ApiResponse } from "@/types/api";
import { VideoDTO, VideoRequest } from "@/types/video";

const videoApiRequest = {
  // Get videos by lesson ID
  getByLessonId: (lessonId: number) =>
    learningApiGet<ApiResponse<VideoDTO[]>>(`videos?lessonId=${lessonId}`),

  // Create video (with file uploads)
  create: async (data: VideoRequest, thumbnail: File, video: File) => {
    const formData = new FormData();
    formData.append(
      "request",
      new Blob([JSON.stringify(data)], {
        type: "application/json",
      })
    );
    formData.append("thumbnail", thumbnail);
    formData.append("video", video);

    return sendLearningRequest<ApiResponse<VideoDTO>>({
      url: "videos",
      method: "POST",
      body: formData,
      headers: {},
    });
  },

  // Update video (with optional file uploads)
  update: async (
    id: number,
    data: VideoRequest,
    thumbnail?: File,
    video?: File
  ) => {
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
    if (video) {
      formData.append("video", video);
    }

    return sendLearningRequest<ApiResponse<VideoDTO>>({
      url: `videos/${id}`,
      method: "PATCH",
      body: formData,
      headers: {},
    });
  },

  // Delete video
  delete: (id: number) => learningApiDelete<ApiResponse<void>>(`videos/${id}`),

  // Answer video question
  answerQuestion: (questionId: number, answer: string) =>
    learningApiPost<ApiResponse<void>>(
      `video/questions/${questionId}?answer=${answer}`,
      {}
    ),
};

export default videoApiRequest;
