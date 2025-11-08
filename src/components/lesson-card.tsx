"use client";

import { LessonDTO } from "@/types/lesson";
import { Clock, Crown, PlayCircle, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

interface LessonCardProps {
  lesson: LessonDTO;
}

export function LessonCard({ lesson }: LessonCardProps) {
  const getDifficultyLabel = (level: number) => {
    if (level <= 3) return { text: "Dễ", color: "bg-green-100 text-green-700" };
    if (level <= 6) return { text: "Trung bình", color: "bg-yellow-100 text-yellow-700" };
    return { text: "Khó", color: "bg-red-100 text-red-700" };
  };

  const difficulty = getDifficultyLabel(lesson.difficultyLevel);

  return (
    <Link href={`/lessons/${lesson.id}`}>
      <Card className="group h-full overflow-hidden transition-all hover:shadow-xl hover:scale-105 border-2 hover:border-blue-400">
        <CardHeader className="p-0 relative">
          <div className="relative h-40 w-full overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
            {lesson.thumbnailUrl ? (
              <Image
                src={lesson.thumbnailUrl}
                alt={lesson.name}
                fill
                className="object-cover transition-transform group-hover:scale-110"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <PlayCircle className="w-16 h-16 text-blue-400" />
              </div>
            )}
            {lesson.isPremium && (
              <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
                <Crown className="w-3 h-3" />
                <span className="text-xs font-semibold">Premium</span>
              </div>
            )}
            <div className="absolute top-2 left-2">
              <Badge className={difficulty.color}>{difficulty.text}</Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="text-xs">
              Bài {lesson.order}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {lesson.minAge}-{lesson.maxAge} tuổi
            </Badge>
          </div>

          <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {lesson.name}
          </h3>

          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {lesson.description}
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <PlayCircle className="w-4 h-4" />
              <span>{lesson.totalVideo} video</span>
            </div>

            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{lesson.duration} phút</span>
            </div>

            {lesson.star > 0 && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{lesson.star}</span>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
            Xem bài học
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
