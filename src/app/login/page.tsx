/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect, useContext } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff, User, Lock, LogIn } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useLoginMutation, useLoginGGMutation } from "@/queries/useAuth";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "@/contexts/AuthContext";
import logo from "../../assets/LOGO.jpg";
import { GoogleLogin } from "@react-oauth/google";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const router = useRouter();
  const queryClient = useQueryClient();
  const { setIsAuthenticated } = useContext(AuthContext);

  const loginMutation = useLoginMutation();
  const loginGGMutation = useLoginGGMutation();

  // Username/password login
  useEffect(() => {
    if (loginMutation.isSuccess && loginMutation.data?.data?.access_token) {
      const { access_token, refresh_token } = loginMutation.data.data;
      localStorage.setItem("access_token", access_token);
      if (refresh_token) localStorage.setItem("refresh_token", refresh_token);

      setIsAuthenticated(true);
      queryClient.invalidateQueries({ queryKey: ["account-me"] });
      router.push("/");
    }
  }, [loginMutation, setIsAuthenticated, queryClient, router]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === "Enter" &&
      !loginMutation.isPending &&
      username.trim() &&
      password.trim()
    ) {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (!username.trim() || !password.trim()) return;
    loginMutation.mutate({
      username: username.trim(),
      password: password.trim(),
    });
  };

  // Google Login Success Handler
  const handleGoogleSuccess = (credentialResponse: any) => {
    console.log("Google credential response:", credentialResponse);

    const id_token = credentialResponse.credential;

    if (id_token) {
      console.log("ID Token:", id_token);

      loginGGMutation.mutate(id_token, {
        onSuccess: (res) => {
          console.log("Google login success:", res);
          const { access_token, refresh_token } = res.data;
          localStorage.setItem("access_token", access_token);
          if (refresh_token)
            localStorage.setItem("refresh_token", refresh_token);

          setIsAuthenticated(true);
          queryClient.invalidateQueries({ queryKey: ["account-me"] });
          router.push("/");
        },
        onError: (err) => {
          console.error("Login GG API failed:", err);
        },
      });
    }
  };

  const handleGoogleError = () => {
    console.error("Google login failed");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 to-violet-600 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <Card className="w-full max-w-md relative bg-white/95 backdrop-blur-sm shadow-2xl border-0">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto w-24 h-24 flex items-center justify-center rounded-full overflow-hidden border-2 border-black ">
            <img
              src={logo.src}
              alt="Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-br from-pink-600 to-violet-600 bg-clip-text text-transparent">
            Đăng nhập
          </CardTitle>
          <CardDescription className="text-gray-600 text-base">
            Nhập thông tin để truy cập hệ thống
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-6">
            {/* Error messages */}
            {loginMutation.isError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">
                  {loginMutation.error?.message ||
                    "Đăng nhập thất bại. Vui lòng thử lại!"}
                </p>
              </div>
            )}

            {loginGGMutation.isError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">
                  Google login failed: {loginGGMutation.error?.message}
                </p>
              </div>
            )}

            {/* Username */}
            <div className="space-y-2">
              <Label
                htmlFor="username"
                className="text-sm font-medium text-gray-700"
              >
                Tên đăng nhập
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Nhập tên đăng nhập"
                  className="pl-10 h-12 border-gray-200 focus:border-pink-400 focus:ring-pink-400 transition-all duration-200"
                  required
                  disabled={loginMutation.isPending}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Mật khẩu
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Nhập mật khẩu"
                  className="pl-10 pr-10 h-12 border-gray-200 focus:border-pink-400 focus:ring-pink-400 transition-all duration-200"
                  required
                  disabled={loginMutation.isPending}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={loginMutation.isPending}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Login button */}
            <Button
              onClick={handleSubmit}
              className="w-full h-12 cursor-pointer bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 text-white font-semibold text-base shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              disabled={
                loginMutation.isPending || !username.trim() || !password.trim()
              }
            >
              {loginMutation.isPending ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Đang đăng nhập...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <LogIn className="w-5 h-5" />
                  <span>Đăng nhập</span>
                </div>
              )}
            </Button>

            {/* Divider */}
            <div className="flex items-center my-4">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="px-3 text-sm text-gray-500">
                hoặc đăng nhập với
              </span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Google login */}
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                theme="outline"
                size="large"
                text="continue_with"
                width="100%"
                logo_alignment="left"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
