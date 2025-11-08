// Video React Query Hooks

import videoApiRequest from "@/api/video";
import { VideoRequest } from "@/types/video";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Query key factory
export const videoKeys = {
  all: ["videos"] as const,
  byLesson: (lessonId: number) => [...videoKeys.all, "lesson", lessonId] as const,
};

// Get videos by lesson ID
export const useGetVideosByLessonId = (lessonId: number) => {
  return useQuery({
    queryKey: videoKeys.byLesson(lessonId),
    queryFn: async () => {
      const response = await videoApiRequest.getByLessonId(lessonId);
      return response.data;
    },
    enabled: !!lessonId,
  });
};

// Create video mutation
export const useCreateVideo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      data,
      thumbnail,
      video,
    }: {
      data: VideoRequest;
      thumbnail: File;
      video: File;
    }) => {
      const response = await videoApiRequest.create(data, thumbnail, video);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: videoKeys.byLesson(data.id),
      });
    },
  });
};

// Update video mutation
export const useUpdateVideo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
      thumbnail,
      video,
    }: {
      id: number;
      data: VideoRequest;
      thumbnail?: File;
      video?: File;
    }) => {
      const response = await videoApiRequest.update(id, data, thumbnail, video);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: videoKeys.byLesson(data.id),
      });
    },
  });
};

// Delete video mutation
export const useDeleteVideo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      lessonId,
    }: {
      id: number;
      lessonId: number;
    }) => {
      const response = await videoApiRequest.delete(id);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: videoKeys.byLesson(variables.lessonId),
      });
    },
  });
};

// Answer question mutation
export const useAnswerQuestion = () => {
  return useMutation({
    mutationFn: async ({
      questionId,
      answer,
    }: {
      questionId: number;
      answer: string;
    }) => {
      const response = await videoApiRequest.answerQuestion(questionId, answer);
      return response.data;
    },
  });
};
