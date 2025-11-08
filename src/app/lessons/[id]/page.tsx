"use client";

import { VideoPlayer } from "@/components/video-player";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";
import { useGetLessonById } from "@/queries/useLesson";
import { useGetVideosByLessonId } from "@/queries/useVideo";
import { ArrowLeft, Clock, Crown, PlayCircle, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function LessonDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { profile } = useAuth();
  const lessonId = Number(params.id);

  const { data: lesson, isLoading: lessonLoading, error: lessonError } = useGetLessonById(lessonId);
  const { data: videosData, isLoading: videosLoading, error: videosError } = useGetVideosByLessonId(lessonId);

  const isLoading = lessonLoading || videosLoading;
  const error = lessonError || videosError;

  // Check if user can access premium content
  const canAccessPremium = profile?.premium || false;
  const needsPremium = lesson?.isPremium && !canAccessPremium;

  const getDifficultyLabel = (level: number) => {
    if (level <= 3) return { text: "Dễ", color: "bg-green-100 text-green-700" };
    if (level <= 6) return { text: "Trung bình", color: "bg-yellow-100 text-yellow-700" };
    return { text: "Khó", color: "bg-red-100 text-red-700" };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-32 mb-8" />
          <div className="space-y-8">
            <Skeleton className="h-96 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Không tìm thấy bài học
            </h3>
            <p className="text-gray-600 mb-4">
              Bài học này không tồn tại hoặc đã bị xóa.
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

  // Sort videos by order - videosData is the array directly from the API
  const sortedVideos = videosData?.sort((a, b) => a.order - b.order) || [];
  const difficulty = getDifficultyLabel(lesson.difficultyLevel);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Quay lại
        </button>

        {/* Lesson Header */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            {/* Lesson Thumbnail */}
            <div className="md:col-span-1">
              <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gradient-to-br from-blue-100 to-purple-100">
                {lesson.thumbnailUrl ? (
                  <Image
                    src={lesson.thumbnailUrl}
                    alt={lesson.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <PlayCircle className="w-16 h-16 text-blue-400" />
                  </div>
                )}
                {lesson.isPremium && (
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                    <Crown className="w-4 h-4" />
                    <span className="text-xs font-semibold">Premium</span>
                  </div>
                )}
              </div>
            </div>

            {/* Lesson Details */}
            <div className="md:col-span-2 space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline">Bài {lesson.order}</Badge>
                  <Badge variant="outline">
                    {lesson.minAge}-{lesson.maxAge} tuổi
                  </Badge>
                  <Badge className={difficulty.color}>{difficulty.text}</Badge>
                </div>

                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                  {lesson.name}
                </h1>
                <p className="text-gray-600 leading-relaxed">
                  {lesson.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-blue-100 px-3 py-2 rounded-full">
                  <PlayCircle className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-blue-800">
                    {lesson.totalVideo} video
                  </span>
                </div>

                <div className="flex items-center gap-2 bg-purple-100 px-3 py-2 rounded-full">
                  <Clock className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-semibold text-purple-800">
                    {lesson.duration} phút
                  </span>
                </div>

                {lesson.star > 0 && (
                  <div className="flex items-center gap-2 bg-yellow-100 px-3 py-2 rounded-full">
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    <span className="text-sm font-semibold text-yellow-800">
                      {lesson.star} sao
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Premium Gate */}
        {needsPremium ? (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full mb-6">
                <Crown className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Nội dung Premium
              </h2>
              <p className="text-gray-600 mb-6 text-lg">
                Bài học này yêu cầu tài khoản Premium để truy cập. Nâng cấp ngay để mở khóa tất cả nội dung học tập!
              </p>
              <Button
                onClick={() => router.push("/profile")}
                size="lg"
                className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white"
              >
                <Crown className="w-5 h-5 mr-2" />
                Nâng cấp Premium ngay
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Video Player */}
            {sortedVideos.length > 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <VideoPlayer videos={sortedVideos} lessonName={lesson.name} />
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-12">
                <div className="text-center">
                  <PlayCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Chưa có video nào
                  </h3>
                  <p className="text-gray-600">
                    Bài học này đang được cập nhật. Vui lòng quay lại sau!
                  </p>
                </div>
              </div>
            )}
          </>
        )}

        {/* Lesson Progress */}
        {!needsPremium && sortedVideos.length > 0 && (
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Tiến độ học tập
            </h3>
            <div className="space-y-3">
              {sortedVideos.map((video, index) => (
                <div
                  key={video.id}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-center w-8 h-8 bg-purple-100 text-purple-600 rounded-full font-semibold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{video.title}</p>
                    <p className="text-sm text-gray-500">
                      {Math.floor(video.duration / 60)}:{String(video.duration % 60).padStart(2, '0')} phút
                    </p>
                  </div>
                  <PlayCircle className="w-5 h-5 text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
