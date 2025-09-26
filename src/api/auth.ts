import { sendRequest } from "@/lib/api";
import { LoginRequest, LoginResponse } from "@/types/auth";

const authApiRequest = {
  login: (body: LoginRequest) =>
    sendRequest<LoginResponse>({
      url: "login/exchange",
      method: "POST",
      body,
    }),
};

export default authApiRequest;
