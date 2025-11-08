"use client";

import { LessonCard } from "@/components/lesson-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCourseById } from "@/queries/useCourse";
import { useGetLessonsByCourseId } from "@/queries/useLesson";
import { ArrowLeft, BookOpen, Crown, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { profile } = useAuth();
  const courseId = Number(params.id);

  const { data: course, isLoading: courseLoading, error: courseError } = useGetCourseById(courseId);
  const { data: lessons, isLoading: lessonsLoading, error: lessonsError } = useGetLessonsByCourseId(courseId);

  const isLoading = courseLoading || lessonsLoading;
  const error = courseError || lessonsError;

  // Check if user can access premium content
  const canAccessPremium = profile?.premium || false;
  const needsPremium = course?.isPremium && !canAccessPremium;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-32 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <Skeleton className="h-64 lg:col-span-1" />
            <div className="lg:col-span-2 space-y-4">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Không tìm thấy khóa học
            </h3>
            <p className="text-gray-600 mb-4">
              Khóa học này không tồn tại hoặc đã bị xóa.
            </p>
            <Button onClick={() => router.push("/courses")} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại danh sách khóa học
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Sort lessons by order
  const sortedLessons = lessons?.sort((a, b) => a.order - b.order) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Quay lại danh sách khóa học
        </Link>

        {/* Course Header */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
            {/* Course Thumbnail */}
            <div className="lg:col-span-1">
              <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gradient-to-br from-purple-100 to-pink-100">
                {course.thumbnailUrl ? (
                  <Image
                    src={course.thumbnailUrl}
                    alt={course.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <BookOpen className="w-24 h-24 text-purple-400" />
                  </div>
                )}
                {course.isPremium && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                    <Crown className="w-5 h-5" />
                    <span className="font-semibold">Premium</span>
                  </div>
                )}
              </div>
            </div>

            {/* Course Details */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  {course.name}
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {course.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold text-purple-800">
                    {course.totalLesson} bài học
                  </span>
                </div>

                {course.star > 0 && (
                  <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full">
                    <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                    <span className="font-semibold text-yellow-800">
                      {course.star} sao
                    </span>
                  </div>
                )}

                {course.isPremium && course.price > 0 && (
                  <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full">
                    <span className="font-semibold text-green-800">
                      {course.price.toLocaleString("vi-VN")} ₫
                    </span>
                  </div>
                )}
              </div>

              {needsPremium && (
                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-300 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <Crown className="w-8 h-8 text-yellow-600 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 mb-2">
                        Nội dung Premium
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Khóa học này yêu cầu tài khoản Premium để truy cập. Nâng cấp ngay để mở khóa tất cả nội dung!
                      </p>
                      <Button
                        onClick={() => router.push("/profile")}
                        className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600"
                      >
                        <Crown className="w-4 h-4 mr-2" />
                        Nâng cấp Premium
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Lessons Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Danh sách bài học
            </h2>
            <Badge variant="secondary" className="text-sm">
              {sortedLessons.length} bài học
            </Badge>
          </div>

          {sortedLessons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedLessons.map((lesson) => (
                <LessonCard key={lesson.id} lesson={lesson} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Chưa có bài học nào
              </h3>
              <p className="text-gray-600">
                Khóa học này đang được cập nhật. Vui lòng quay lại sau!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
