// Lesson React Query Hooks

import lessonApiRequest from "@/api/lesson";
import { LessonFilterRequest, LessonRequest } from "@/types/lesson";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Query key factory
export const lessonKeys = {
  all: ["lessons"] as const,
  lists: () => [...lessonKeys.all, "list"] as const,
  list: (filters: string) => [...lessonKeys.lists(), { filters }] as const,
  details: () => [...lessonKeys.all, "detail"] as const,
  detail: (id: number) => [...lessonKeys.details(), id] as const,
  byCourse: (courseId: number) => [...lessonKeys.all, "course", courseId] as const,
};

// Get all lessons
export const useGetAllLessons = () => {
  return useQuery({
    queryKey: lessonKeys.lists(),
    queryFn: async () => {
      const response = await lessonApiRequest.getAll();
      return response.data;
    },
  });
};

// Get lesson by ID
export const useGetLessonById = (id: number) => {
  return useQuery({
    queryKey: lessonKeys.detail(id),
    queryFn: async () => {
      const response = await lessonApiRequest.getById(id);
      return response.data;
    },
    enabled: !!id,
  });
};

// Get lessons by course ID
export const useGetLessonsByCourseId = (courseId: number) => {
  return useQuery({
    queryKey: lessonKeys.byCourse(courseId),
    queryFn: async () => {
      const response = await lessonApiRequest.getByCourseId(courseId);
      return response.data;
    },
    enabled: !!courseId,
  });
};

// Search lessons
export const useSearchLessons = (filters: LessonFilterRequest) => {
  return useQuery({
    queryKey: lessonKeys.list(JSON.stringify(filters)),
    queryFn: async () => {
      const response = await lessonApiRequest.search(filters);
      return response.data;
    },
    enabled: Object.keys(filters).length > 0,
  });
};

// Create lesson mutation
export const useCreateLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      data,
      thumbnail,
    }: {
      data: LessonRequest;
      thumbnail: File;
    }) => {
      const response = await lessonApiRequest.create(data, thumbnail);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: lessonKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: lessonKeys.byCourse(data.id),
      });
    },
  });
};

// Update lesson mutation
export const useUpdateLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
      thumbnail,
    }: {
      id: number;
      data: LessonRequest;
      thumbnail?: File;
    }) => {
      const response = await lessonApiRequest.update(id, data, thumbnail);
      return response.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: lessonKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: lessonKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({
        queryKey: lessonKeys.byCourse(data.id),
      });
    },
  });
};

// Delete lesson mutation
export const useDeleteLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await lessonApiRequest.delete(id);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: lessonKeys.lists() });
    },
  });
};
