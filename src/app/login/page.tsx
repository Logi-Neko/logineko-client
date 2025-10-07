/* eslint-disable @next/next/no-img-element */
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
import { Alert, AlertDescription } from "@/components/ui/alert";
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
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const loginMutation = useLoginMutation();
  const loginGGMutation = useLoginGGMutation();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

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

  const handleGoogleSuccess = (credentialResponse: any) => {
    console.log("Google credential response:", credentialResponse);

    const id_token = credentialResponse.credential;

    if (id_token) {
      console.log("ID Token:", id_token);

      loginGGMutation.mutate(id_token, {
        onSuccess: (res: any) => {
          console.log("Google login success:", res);
          const { access_token, refresh_token } = res.data;
          localStorage.setItem("access_token", access_token);
          if (refresh_token)
            localStorage.setItem("refresh_token", refresh_token);

          setIsAuthenticated(true);
          queryClient.invalidateQueries({ queryKey: ["account-me"] });
          router.push("/");
        },
        onError: (err: any) => {
          console.error("Login GG API failed:", err);
        },
      });
    }
  };

  const handleGoogleError = () => {
    console.error("Google login failed");
  };

  const handleRegisterClick = () => {
    router.push("/register");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 to-violet-600 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <Card className="w-full max-w-md relative bg-white/95 backdrop-blur-sm shadow-2xl border-0">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-20 h-20 mb-4 bg-gradient-to-br from-pink-500 to-violet-600 rounded-full flex items-center justify-center shadow-lg overflow-hidden">
            <img
              src={logo.src}
              alt="Logo"
              className="w-16 h-16 object-cover rounded-full"
            />
          </div>

          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-violet-600 bg-clip-text text-transparent mb-2">
            Đăng Nhập
          </CardTitle>
          <CardDescription className="text-gray-600">
            Nhập thông tin để truy cập hệ thống
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {loginMutation.isError && (
            <Alert className="border-red-200 bg-red-50">
              <AlertDescription className="text-red-700">
                {loginMutation.error?.message ||
                  "Đăng nhập thất bại. Vui lòng thử lại!"}
              </AlertDescription>
            </Alert>
          )}

          {loginGGMutation.isError && (
            <Alert className="border-red-200 bg-red-50">
              <AlertDescription className="text-red-700">
                Đăng nhập Google thất bại: {loginGGMutation.error?.message}
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="username"
                className="text-sm font-medium text-gray-700"
              >
                Tên đăng nhập
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Nhập tên đăng nhập"
                  className="pl-10 h-11 border-gray-200 focus:border-pink-500 focus:ring-pink-500 transition-all duration-200"
                  disabled={loginMutation.isPending}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Mật khẩu
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Nhập mật khẩu"
                  className="pl-10 pr-10 h-11 border-gray-200 focus:border-pink-500 focus:ring-pink-500 transition-all duration-200"
                  disabled={loginMutation.isPending}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={loginMutation.isPending}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              className="w-full h-11 bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 text-white font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              disabled={
                loginMutation.isPending || !username.trim() || !password.trim()
              }
            >
              {loginMutation.isPending ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Đang đăng nhập...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <LogIn className="w-4 h-4 mr-2" />
                  Đăng nhập
                </div>
              )}
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-900">
                hoặc đăng nhập với
              </span>
            </div>
          </div>

          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              theme="outline"
              size="large"
              text="signin_with"
              width="100%"
              logo_alignment="left"
            />
          </div>

          <div className="text-center border-t border-gray-100">
            <p className="text-sm text-gray-600">
              Chưa có tài khoản?{" "}
              <button
                onClick={handleRegisterClick}
                className="text-pink-600 hover:text-pink-700 font-medium hover:underline transition-colors cursor-pointer"
              >
                Đăng ký ngay
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
