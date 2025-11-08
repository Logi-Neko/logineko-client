"use client";

import { useAnswerQuestion } from "@/queries/useVideo";
import { VideoDTO } from "@/types/video";
import { CheckCircle2, ChevronLeft, ChevronRight, XCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useToast } from "./ui/use-toast";

interface VideoPlayerProps {
  videos: VideoDTO[];
  lessonName?: string;
}

export function VideoPlayer({ videos, lessonName }: VideoPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [openQuestionDialog, setOpenQuestionDialog] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [answeredCorrectly, setAnsweredCorrectly] = useState<boolean[]>(
    new Array(videos.length).fill(false)
  );
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  const answerMutation = useAnswerQuestion();

  const currentVideo = videos[currentIndex];
  const canGoNext = currentIndex < videos.length - 1;
  const canGoPrev = currentIndex > 0;

  // Check if current item is a video or image
  const isVideo = currentVideo?.videoUrl?.match(/\.(mp4|webm|ogg|mov)$/i);
  const isImage = currentVideo?.videoUrl?.match(/\.(jpg|jpeg|png|gif|webp|avif)$/i);

  useEffect(() => {
    setShowQuestion(false);
    setOpenQuestionDialog(false);
    setSelectedAnswer("");
    setIsCorrect(null);
  }, [currentIndex]);

  const handleVideoEnd = () => {
    setShowQuestion(true);
  };

  const handleImageContinue = () => {
    setOpenQuestionDialog(true);
  };

  const handleAnswerSubmit = async () => {
    if (!selectedAnswer || !currentVideo?.videoQuestion?.id) return;

    try {
      await answerMutation.mutateAsync({
        questionId: currentVideo.videoQuestion.id,
        answer: selectedAnswer,
      });

      const correct = selectedAnswer === currentVideo.videoQuestion.answer;
      setIsCorrect(correct);

      if (correct) {
        const newAnswered = [...answeredCorrectly];
        newAnswered[currentIndex] = true;
        setAnsweredCorrectly(newAnswered);

        toast({
          title: "Chính xác!",
          description: "Bạn đã trả lời đúng. Tiếp tục học nhé!",
        });

        // Auto move to next video/image after 2 seconds
        setTimeout(() => {
          if (isImage) {
            setOpenQuestionDialog(false);
          }
          if (canGoNext) {
            handleNext();
          }
        }, 2000);
      } else {
        toast({
          title: "Chưa chính xác",
          description: `Đáp án đúng là: ${currentVideo.videoQuestion.answer}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
      toast({
        title: "Lỗi",
        description: "Không thể gửi câu trả lời. Vui lòng thử lại.",
        variant: "destructive",
      });
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      setCurrentIndex(currentIndex + 1);
      videoRef.current?.load();
    }
  };

  const handlePrev = () => {
    if (canGoPrev) {
      setCurrentIndex(currentIndex - 1);
      videoRef.current?.load();
    }
  };

  const handleRetry = () => {
    setShowQuestion(false);
    setSelectedAnswer("");
    setIsCorrect(null);
    videoRef.current?.load();
    videoRef.current?.play();
  };

  if (!currentVideo) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
        <p className="text-gray-500">Không có video nào</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Video Title and Progress */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{currentVideo.title}</h2>
          {lessonName && <p className="text-sm text-gray-600">{lessonName}</p>}
        </div>
        <div className="text-sm text-gray-600">
          Video {currentIndex + 1} / {videos.length}
        </div>
      </div>

      {/* Video Player or Question */}
      {!showQuestion ? (
        <Card className="overflow-hidden">
          {isVideo ? (
            <video
              ref={videoRef}
              src={currentVideo.videoUrl}
              poster={currentVideo.thumbnailUrl}
              controls
              className="w-full aspect-video bg-black"
              onEnded={handleVideoEnd}
              controlsList="nodownload"
            >
              Trình duyệt của bạn không hỗ trợ video.
            </video>
          ) : isImage ? (
            <div className="space-y-4">
              <div className="relative bg-gray-100 aspect-video flex items-center justify-center rounded-lg overflow-hidden">
                <img
                  src={currentVideo.videoUrl}
                  alt={currentVideo.title}
                  className="max-w-full max-h-full object-contain"
                />
                <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Hình ảnh
                </div>
              </div>
              <Button
                onClick={handleImageContinue}
                size="lg"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg"
              >
                Xem câu hỏi
              </Button>
            </div>
          ) : (
            <div className="aspect-video bg-gray-100 flex items-center justify-center">
              <p className="text-gray-500">Không thể hiển thị nội dung này</p>
            </div>
          )}
        </Card>
      ) : (
        <Card className="border-2 border-purple-200">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
            <CardTitle className="text-xl">Câu hỏi kiểm tra</CardTitle>
            <CardDescription>
              Hãy trả lời câu hỏi để tiếp tục học
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">
              {currentVideo.videoQuestion.question}
            </h3>

            <div className="space-y-3">
              {["A", "B", "C", "D"].map((option) => {
                const optionText =
                  currentVideo.videoQuestion[
                    `option${option}` as keyof typeof currentVideo.videoQuestion
                  ];
                const isSelected = selectedAnswer === option;
                const showCorrect = isCorrect !== null;
                const isCorrectAnswer =
                  option === currentVideo.videoQuestion.answer;

                return (
                  <button
                    key={option}
                    onClick={() => {
                      if (isCorrect === null) {
                        setSelectedAnswer(option);
                      }
                    }}
                    disabled={isCorrect !== null}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                      isSelected && !showCorrect
                        ? "border-purple-500 bg-purple-50"
                        : "border-gray-200 hover:border-purple-300"
                    } ${
                      showCorrect && isCorrectAnswer
                        ? "border-green-500 bg-green-50"
                        : ""
                    } ${
                      showCorrect && isSelected && !isCorrectAnswer
                        ? "border-red-500 bg-red-50"
                        : ""
                    } ${isCorrect !== null ? "cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-lg text-purple-600">
                          {option}.
                        </span>
                        <span className="text-gray-800">{optionText}</span>
                      </div>
                      {showCorrect && isCorrectAnswer && (
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                      )}
                      {showCorrect && isSelected && !isCorrectAnswer && (
                        <XCircle className="w-6 h-6 text-red-600" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex gap-3 pt-4">
              {isCorrect === null ? (
                <Button
                  onClick={handleAnswerSubmit}
                  disabled={!selectedAnswer || answerMutation.isPending}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  {answerMutation.isPending ? "Đang gửi..." : "Gửi câu trả lời"}
                </Button>
              ) : (
                <>
                  <Button onClick={handleRetry} variant="outline" className="flex-1">
                    Xem lại video
                  </Button>
                  {canGoNext && (
                    <Button
                      onClick={handleNext}
                      className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                      Tiếp theo
                    </Button>
                  )}
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation Controls */}
      <div className="flex items-center justify-between">
        <Button
          onClick={handlePrev}
          disabled={!canGoPrev}
          variant="outline"
          className="gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Video trước
        </Button>

        <div className="flex gap-2">
          {videos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-purple-600 w-6"
                  : answeredCorrectly[index]
                  ? "bg-green-500"
                  : "bg-gray-300"
              }`}
              aria-label={`Video ${index + 1}`}
            />
          ))}
        </div>

        <Button
          onClick={handleNext}
          disabled={!canGoNext}
          variant="outline"
          className="gap-2"
        >
          Video tiếp
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Question Dialog for Images - Professional Design */}
      <Dialog open={openQuestionDialog} onOpenChange={setOpenQuestionDialog}>
        <DialogContent className="max-w-6xl max-h-[95vh] overflow-hidden p-0">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-5">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white">
                Câu hỏi kiểm tra
              </DialogTitle>
              <DialogDescription className="text-purple-100 text-base">
                Quan sát hình ảnh và chọn đáp án đúng
              </DialogDescription>
            </DialogHeader>
          </div>

          {/* Content - Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 overflow-y-auto max-h-[calc(95vh-100px)]">
            {/* Left Column - Image */}
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-2xl shadow-inner">
                <div className="relative bg-white rounded-xl overflow-hidden shadow-lg" style={{ minHeight: '400px' }}>
                  <img
                    src={currentVideo.videoUrl}
                    alt={currentVideo.title}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Hãy quan sát kỹ hình ảnh trước khi trả lời</span>
              </div>
            </div>

            {/* Right Column - Question and Options */}
            <div className="space-y-6">
              {/* Question */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-xl">
                <h3 className="text-xl font-bold text-gray-800 leading-relaxed">
                  {currentVideo?.videoQuestion?.question}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-3">
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  Chọn đáp án đúng:
                </p>
                {["A", "B", "C", "D"].map((option) => {
                  const optionText =
                    currentVideo?.videoQuestion?.[
                      `option${option}` as keyof typeof currentVideo.videoQuestion
                    ];
                  const isSelected = selectedAnswer === option;
                  const showCorrect = isCorrect !== null;
                  const isCorrectAnswer =
                    option === currentVideo?.videoQuestion?.answer;

                  return (
                    <button
                      key={option}
                      onClick={() => {
                        if (isCorrect === null) {
                          setSelectedAnswer(option);
                        }
                      }}
                      disabled={isCorrect !== null}
                      className={`group w-full p-5 text-left rounded-xl border-2 transition-all duration-200 transform hover:scale-[1.02] ${
                        isSelected && !showCorrect
                          ? "border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg scale-[1.02]"
                          : "border-gray-200 hover:border-purple-300 bg-white hover:shadow-md"
                      } ${
                        showCorrect && isCorrectAnswer
                          ? "border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 shadow-lg"
                          : ""
                      } ${
                        showCorrect && isSelected && !isCorrectAnswer
                          ? "border-red-500 bg-gradient-to-r from-red-50 to-rose-50 shadow-lg"
                          : ""
                      } ${isCorrect !== null ? "cursor-not-allowed" : "cursor-pointer"}`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 flex-1">
                          <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-lg transition-all ${
                            isSelected && !showCorrect
                              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                              : showCorrect && isCorrectAnswer
                              ? "bg-green-500 text-white"
                              : showCorrect && isSelected && !isCorrectAnswer
                              ? "bg-red-500 text-white"
                              : "bg-gray-100 text-purple-600 group-hover:bg-purple-100"
                          }`}>
                            {option}
                          </div>
                          <span className="text-base text-gray-800 font-medium leading-relaxed">
                            {optionText}
                          </span>
                        </div>
                        {showCorrect && isCorrectAnswer && (
                          <CheckCircle2 className="w-7 h-7 text-green-600 flex-shrink-0 animate-bounce" />
                        )}
                        {showCorrect && isSelected && !isCorrectAnswer && (
                          <XCircle className="w-7 h-7 text-red-600 flex-shrink-0 animate-pulse" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t-2 border-gray-100">
                {isCorrect === null ? (
                  <Button
                    onClick={handleAnswerSubmit}
                    disabled={!selectedAnswer || answerMutation.isPending}
                    size="lg"
                    className="w-full text-lg py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-xl hover:shadow-2xl transition-all"
                  >
                    {answerMutation.isPending ? (
                      <span className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Đang gửi...
                      </span>
                    ) : (
                      "Gửi câu trả lời"
                    )}
                  </Button>
                ) : (
                  <div className="space-y-3">
                    {isCorrect ? (
                      <div className="bg-green-50 border-2 border-green-500 rounded-xl p-4 mb-4">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-8 h-8 text-green-600" />
                          <div>
                            <p className="font-bold text-green-800 text-lg">Chính xác!</p>
                            <p className="text-green-700 text-sm">Bạn đã trả lời đúng. Tiếp tục học nhé!</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-red-50 border-2 border-red-500 rounded-xl p-4 mb-4">
                        <div className="flex items-center gap-3">
                          <XCircle className="w-8 h-8 text-red-600" />
                          <div>
                            <p className="font-bold text-red-800 text-lg">Chưa chính xác</p>
                            <p className="text-red-700 text-sm">
                              Đáp án đúng là: <span className="font-bold">{currentVideo?.videoQuestion?.answer}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        onClick={() => {
                          setOpenQuestionDialog(false);
                          setIsCorrect(null);
                          setSelectedAnswer("");
                        }}
                        variant="outline"
                        size="lg"
                        className="py-6 border-2 hover:bg-gray-50"
                      >
                        Xem lại hình ảnh
                      </Button>
                      {canGoNext && (
                        <Button
                          onClick={handleNext}
                          size="lg"
                          className="py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                        >
                          Tiếp theo →
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
