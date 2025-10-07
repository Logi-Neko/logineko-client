export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  status: number;
  message: string;
  data: {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    refresh_expires_in: number;
    token_type: string;
    id_token?: string;
    scope: string;
  };
  error: boolean;
  success: boolean;
}

export interface ApiErrorResponse {
  statusCode: number;
  message: string;
  error: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  email: string;
  fullName: string;
}
