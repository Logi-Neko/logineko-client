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
import {
  Eye,
  EyeOff,
  User,
  Lock,
  LogIn,
  CheckCircle,
  XCircle,
  Sparkles,
  ArrowRight,
} from "lucide-react";
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
  const [notification, setNotification] = useState<{
    type: "success" | "error" | "info";
    message: string;
  } | null>(null);

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

  const showNotification = (
    type: "success" | "error" | "info",
    message: string
  ) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  useEffect(() => {
    if (loginMutation.isError) {
      showNotification(
        "error",
        loginMutation.error?.message || "Đăng nhập thất bại. Vui lòng thử lại!"
      );
    }
  }, [loginMutation.isError, loginMutation.error]);

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
    if (!username.trim() || !password.trim()) {
      showNotification("error", "Vui lòng nhập đầy đủ thông tin đăng nhập");
      return;
    }

    loginMutation.mutate(
      {
        username: username.trim(),
        password: password.trim(),
      },
      {
        onSuccess: (res: any) => {
          const { access_token, refresh_token } = res.data;
          localStorage.setItem("access_token", access_token);
          if (refresh_token)
            localStorage.setItem("refresh_token", refresh_token);

          setIsAuthenticated(true);
          queryClient.invalidateQueries({ queryKey: ["account-me"] });

          showNotification(
            "success",
            "🎉 Đăng nhập thành công! Đang chuyển đến trang chủ..."
          );

          setTimeout(() => {
            router.push("/");
          }, 1500);
        },
        onError: (err: any) => {
          console.error("Login failed:", err);
          showNotification(
            "error",
            err?.message || "Đăng nhập thất bại. Vui lòng thử lại!"
          );
        },
      }
    );
  };

  const handleGoogleSuccess = (credentialResponse: any) => {
    const id_token = credentialResponse.credential;

    if (id_token) {
      loginGGMutation.mutate(id_token, {
        onSuccess: (res: any) => {
          const { access_token, refresh_token } = res.data;
          localStorage.setItem("access_token", access_token);
          if (refresh_token)
            localStorage.setItem("refresh_token", refresh_token);

          setIsAuthenticated(true);
          queryClient.invalidateQueries({ queryKey: ["account-me"] });

          showNotification("success", "🎉 Đăng nhập Google thành công!");

          setTimeout(() => {
            router.push("/");
          }, 1500);
        },
        onError: (err: any) => {
          console.error("Login GG API failed:", err);
          showNotification(
            "error",
            "Đăng nhập Google thất bại. Vui lòng thử lại!"
          );
        },
      });
    }
  };

  const handleGoogleError = () => {
    console.error("Google login failed");
    showNotification("error", "Đăng nhập Google thất bại");
  };

  const handleRegisterClick = () => {
    router.push("/register");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-600 flex items-center justify-center p-4 relative overflow-hidden">
      {notification && (
        <div
          className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border-2 transform transition-all duration-300 animate-slide-in ${
            notification.type === "success"
              ? "bg-green-50 border-green-500 text-green-800"
              : notification.type === "error"
              ? "bg-red-50 border-red-500 text-red-800"
              : "bg-blue-50 border-blue-500 text-blue-800"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle className="w-6 h-6 flex-shrink-0" />
          ) : notification.type === "error" ? (
            <XCircle className="w-6 h-6 flex-shrink-0" />
          ) : (
            <Sparkles className="w-6 h-6 flex-shrink-0" />
          )}
          <p className="font-medium">{notification.message}</p>
        </div>
      )}

      <Card className="w-full max-w-3xl relative bg-white/95 backdrop-blur-xl shadow-2xl border-0 rounded-3xl overflow-hidden">
        <CardHeader className="text-center pb-4 pt-8 px-8">
          <div className="mx-auto w-24 h-24 mb-6 bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-600 rounded-full flex items-center justify-center shadow-xl overflow-hidden relative group">
            <img
              src={logo.src}
              alt="Logo"
              className="w-20 h-20 object-cover rounded-full transform group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 to-indigo-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          <div className="relative">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2 flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 text-pink-500" />
              Đăng Nhập
              <Sparkles className="w-6 h-6 text-indigo-500" />
            </CardTitle>
            <CardDescription className="text-gray-600 text-base">
              Nhập thông tin để truy cập hệ thống
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 px-8 pb-8">
          <div className="space-y-5">
            <div className="space-y-2">
              <Label
                htmlFor="username"
                className="text-sm font-semibold text-gray-700 flex items-center gap-2"
              >
                <User className="w-4 h-4 text-pink-500" />
                Tên đăng nhập
              </Label>
              <div className="relative group">
                <User className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-pink-500 transition-colors" />
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Nhập tên đăng nhập"
                  className="pl-12 h-12 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all duration-200"
                  disabled={loginMutation.isPending}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-semibold text-gray-700 flex items-center gap-2"
              >
                <Lock className="w-4 h-4 text-purple-500" />
                Mật khẩu
              </Label>
              <div className="relative group">
                <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Nhập mật khẩu"
                  className="pl-12 pr-12 h-12 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                  disabled={loginMutation.isPending}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-purple-600 transition-colors"
                  disabled={loginMutation.isPending}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <Button
              onClick={() => handleSubmit()}
              className="w-full h-12 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-600 hover:via-purple-700 hover:to-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 rounded-xl text-base"
              disabled={
                loginMutation.isPending || !username.trim() || !password.trim()
              }
            >
              {loginMutation.isPending ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Đang đăng nhập...
                </div>
              ) : (
                <div className="cursor-pointer flex items-center justify-center gap-2">
                  <LogIn className="w-5 h-5" />
                  Đăng nhập
                </div>
              )}
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t-2 border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-gray-500 font-semibold">
                hoặc đăng nhập với
              </span>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <div className=" transform hover:scale-105 transition-transform duration-200">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                theme="outline"
                size="large"
                text="signin_with"
                logo_alignment="left"
              />
            </div>
          </div>

          <div className="relative pt-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t-2 border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-gray-500 font-semibold">
                Chưa có tài khoản?
              </span>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={handleRegisterClick}
              className="cursor-pointer inline-flex items-center gap-2 text-base font-semibold text-transparent bg-gradient-to-r from-pink-600 to-indigo-600 bg-clip-text hover:from-pink-700 hover:to-indigo-700 transition-all duration-200 group"
            >
              Đăng ký ngay
              <span className="transform group-hover:translate-x-1 transition-transform">
                →
              </span>
            </button>
          </div>
        </CardContent>
      </Card>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
