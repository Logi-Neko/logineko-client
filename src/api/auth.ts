import { apiGet, apiPost, sendRequest } from "@/lib/api";
import { ApiResponse } from "@/types/api";
import { LoginRequest, LoginResponse } from "@/types/auth";
import { User } from "@/types/user";

const authApiRequest = {
  me: () => apiGet<ApiResponse<User>>("userinfo"),
  login: (body: LoginRequest) => apiPost<LoginResponse>("login/exchange", body),
};

export default authApiRequest;
