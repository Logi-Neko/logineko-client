export interface ApiResponse<T> {
  status: number;
  code: string;
  message: string;
  data: T;
  path: string;
  errors: string[];
  metadata: Record<string, unknown>;
  error: boolean;
  success: boolean;
}
