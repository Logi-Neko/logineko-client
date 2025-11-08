// Course React Query Hooks

import courseApiRequest from "@/api/course";
import { CourseRequest } from "@/types/course";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Query key factory
export const courseKeys = {
  all: ["courses"] as const,
  lists: () => [...courseKeys.all, "list"] as const,
  list: (filters: string) => [...courseKeys.lists(), { filters }] as const,
  details: () => [...courseKeys.all, "detail"] as const,
  detail: (id: number) => [...courseKeys.details(), id] as const,
};

// Get all courses
export const useGetAllCourses = () => {
  return useQuery({
    queryKey: courseKeys.lists(),
    queryFn: async () => {
      const response = await courseApiRequest.getAll();
      return response.data;
    },
  });
};

// Get course by ID
export const useGetCourseById = (id: number) => {
  return useQuery({
    queryKey: courseKeys.detail(id),
    queryFn: async () => {
      const response = await courseApiRequest.getById(id);
      return response.data;
    },
    enabled: !!id,
  });
};

// Create course mutation
export const useCreateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      data,
      thumbnail,
    }: {
      data: CourseRequest;
      thumbnail: File;
    }) => {
      const response = await courseApiRequest.create(data, thumbnail);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: courseKeys.lists() });
    },
  });
};

// Update course mutation
export const useUpdateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
      thumbnail,
    }: {
      id: number;
      data: CourseRequest;
      thumbnail?: File;
    }) => {
      const response = await courseApiRequest.update(id, data, thumbnail);
      return response.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: courseKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: courseKeys.detail(variables.id),
      });
    },
  });
};
