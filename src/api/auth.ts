import { apiGet, apiPost } from "@/lib/api";
import { ApiResponse } from "@/types/api";
import { LoginRequest, LoginResponse } from "@/types/auth";
import { User } from "@/types/user";

const authApiRequest = {
  me: () => apiGet<ApiResponse<User>>("userinfo"),
  login: (body: LoginRequest) => apiPost<LoginResponse>("login/exchange", body),
  loginGG: (idToken: string) =>
    apiPost<LoginResponse>(`login/google?id_token=${idToken}`),
};

export default authApiRequest;
