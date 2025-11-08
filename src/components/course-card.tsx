"use client";

import { CourseDTO } from "@/types/course";
import { BookOpen, Crown, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

interface CourseCardProps {
  course: CourseDTO;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/courses/${course.id}`}>
      <Card className="group h-full overflow-hidden transition-all hover:shadow-xl hover:scale-105 border-2 hover:border-purple-400">
        <CardHeader className="p-0 relative">
          <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
            {course.thumbnailUrl ? (
              <Image
                src={course.thumbnailUrl}
                alt={course.name}
                fill
                className="object-cover transition-transform group-hover:scale-110"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <BookOpen className="w-16 h-16 text-purple-400" />
              </div>
            )}
            {course.isPremium && (
              <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                <Crown className="w-4 h-4" />
                <span className="text-xs font-semibold">Premium</span>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-4">
          <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
            {course.name}
          </h3>

          <p className="text-sm text-gray-600 mb-4 line-clamp-3">
            {course.description}
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              <span>{course.totalLesson} bài học</span>
            </div>

            {course.star > 0 && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{course.star}</span>
              </div>
            )}
          </div>

          {course.isPremium && course.price > 0 && (
            <div className="mt-3">
              <Badge variant="secondary" className="text-sm">
                {course.price.toLocaleString("vi-VN")} ₫
              </Badge>
            </div>
          )}
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
            Bắt đầu học
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
