// Video Type Definitions

export interface VideoQuestionDTO {
  id: number;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  answer: string;
}

export interface VideoDTO {
  id: number;
  title: string;
  videoUrl: string;
  videoPublicId: string;
  thumbnailUrl: string;
  thumbnailPublicId: string;
  duration: number;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  videoQuestion: VideoQuestionDTO;
}

export interface VideoRequest {
  lessonId: number;
  title: string;
  order: number;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  answer: string;
  isActive?: boolean;
}
