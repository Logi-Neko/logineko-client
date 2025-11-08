"use client";

import { CourseCard } from "@/components/course-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllCourses } from "@/queries/useCourse";
import { BookOpen, Search } from "lucide-react";
import { useState } from "react";

export default function CoursesPage() {
  const { data: courses, isLoading, error } = useGetAllCourses();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = courses?.filter((course) =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Khóa học của LogiNeko
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Khám phá các khóa học thú vị và phát triển tư duy logic cùng LogiNeko
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm khóa học..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-purple-200 focus:border-purple-400 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <BookOpen className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Không thể tải khóa học
            </h3>
            <p className="text-gray-600">
              Đã có lỗi xảy ra. Vui lòng thử lại sau.
            </p>
          </div>
        )}

        {/* Courses Grid */}
        {!isLoading && !error && (
          <>
            {filteredCourses && filteredCourses.length > 0 ? (
              <>
                <div className="mb-4 text-gray-600">
                  Tìm thấy <span className="font-semibold">{filteredCourses.length}</span> khóa học
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Không tìm thấy khóa học
                </h3>
                <p className="text-gray-600">
                  Thử tìm kiếm với từ khóa khác
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
