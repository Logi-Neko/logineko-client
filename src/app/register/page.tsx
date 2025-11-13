/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  UserCheck,
  CheckCircle,
  XCircle,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { useRegisterMutation } from "@/queries/useAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import logo from "../../assets/LOGO.jpg";
import { RegisterRequest } from "@/types/auth";
import { AuthContext } from "@/contexts/AuthContext";

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<RegisterRequest>({
    username: "",
    password: "",
    email: "",
    fullName: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<RegisterRequest>>({});
  const [success, setSuccess] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const router = useRouter();
  const { isAuthenticated } = useContext(AuthContext);

  const registerMutation = useRegisterMutation();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleInputChange =
    (field: keyof RegisterRequest) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));

      if (errors[field]) {
        setErrors((prev) => ({
          ...prev,
          [field]: undefined,
        }));
      }
    };

  const validateForm = (): boolean => {
    const newErrors: Partial<RegisterRequest> = {};

    if (!formData.username.trim()) {
      newErrors.username = "Tên đăng nhập là bắt buộc";
    } else if (formData.username.length < 3) {
      newErrors.username = "Tên đăng nhập phải có ít nhất 3 ký tự";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email là bắt buộc";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Vui lòng nhập email hợp lệ";
    }

    if (!formData.password) {
      newErrors.password = "Mật khẩu là bắt buộc";
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Họ và tên là bắt buộc";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      showNotification("error", "Vui lòng kiểm tra lại thông tin đăng ký");
      return;
    }

    try {
      const result = await registerMutation.mutateAsync(formData);

      console.log("Đăng ký thành công:", result);
      setSuccess(true);
      showNotification(
        "success",
        "🎉 Đăng ký thành công! Đang chuyển đến trang đăng nhập..."
      );

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error: any) {
      console.error("Lỗi đăng ký:", error);
      showNotification(
        "error",
        error?.message || "Đăng ký thất bại. Vui lòng thử lại!"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-600 p-4 relative overflow-hidden">
      {notification && (
        <div
          className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border-2 transform transition-all duration-300 animate-slide-in ${
            notification.type === "success"
              ? "bg-green-50 border-green-500 text-green-800"
              : "bg-red-50 border-red-500 text-red-800"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle className="w-6 h-6 flex-shrink-0" />
          ) : (
            <XCircle className="w-6 h-6 flex-shrink-0" />
          )}
          <p className="font-medium">{notification.message}</p>
        </div>
      )}

      <Card className="w-full max-w-3xl relative z-10 backdrop-blur-xl bg-white/95 shadow-2xl border-0 rounded-xl overflow-hidden">
        <CardHeader className="text-center pb-4 pt-8 px-8">
          <div className="mx-auto w-24 h-24 mb-4 bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-600 rounded-full flex items-center justify-center shadow-xl overflow-hidden relative group">
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
              Tạo Tài Khoản
              <Sparkles className="w-6 h-6 text-indigo-500" />
            </CardTitle>
            <CardDescription className="text-gray-600 text-base">
              Tham gia với chúng tôi! Điền thông tin để bắt đầu.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-5 px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label
                htmlFor="fullName"
                className="text-sm font-semibold text-gray-700 flex items-center gap-2"
              >
                <User className="w-4 h-4 text-pink-500" />
                Họ và tên
              </Label>
              <div className="relative group">
                <User className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-pink-500 transition-colors" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Nhập họ và tên của bạn"
                  value={formData.fullName}
                  onChange={handleInputChange("fullName")}
                  className={`pl-12 h-12 border-2 rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all ${
                    errors.fullName
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200"
                  }`}
                />
              </div>
              {errors.fullName && (
                <p className="text-sm text-red-600 flex items-center gap-1 animate-shake">
                  <XCircle className="w-4 h-4" />
                  {errors.fullName}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="username"
                className="text-sm font-semibold text-gray-700 flex items-center gap-2"
              >
                <UserCheck className="w-4 h-4 text-purple-500" />
                Tên đăng nhập
              </Label>
              <div className="relative group">
                <UserCheck className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Chọn tên đăng nhập"
                  value={formData.username}
                  onChange={handleInputChange("username")}
                  className={`pl-12 h-12 border-2 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all ${
                    errors.username
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200"
                  }`}
                />
              </div>
              {errors.username && (
                <p className="text-sm text-red-600 flex items-center gap-1 animate-shake">
                  <XCircle className="w-4 h-4" />
                  {errors.username}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-semibold text-gray-700 flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-indigo-500" />
                Địa chỉ Email
              </Label>
              <div className="relative group">
                <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Nhập email của bạn"
                  value={formData.email}
                  onChange={handleInputChange("email")}
                  className={`pl-12 h-12 border-2 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all ${
                    errors.email
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-600 flex items-center gap-1 animate-shake">
                  <XCircle className="w-4 h-4" />
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-semibold text-gray-700 flex items-center gap-2"
              >
                <Lock className="w-4 h-4 text-pink-500" />
                Mật khẩu
              </Label>
              <div className="relative group">
                <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-pink-500 transition-colors" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Tạo mật khẩu"
                  value={formData.password}
                  onChange={handleInputChange("password")}
                  className={`pl-12 pr-12 h-12 border-2 rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all ${
                    errors.password
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-pink-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-600 flex items-center gap-1 animate-shake">
                  <XCircle className="w-4 h-4" />
                  {errors.password}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={registerMutation.isPending || success}
              className="w-full h-12 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-600 hover:via-purple-700 hover:to-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 rounded-xl text-base"
            >
              {registerMutation.isPending ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  Đang tạo tài khoản...
                </div>
              ) : success ? (
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Đăng ký thành công!
                </div>
              ) : (
                <div className="cursor-pointer flex items-center justify-center gap-2">
                  <UserCheck className="w-5 h-5" />
                  Tạo Tài Khoản
                </div>
              )}
            </Button>
          </form>

          <div className="relative pt-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t-2 border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-gray-500 font-semibold">
                Đã có tài khoản?
              </span>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/login"
              className="cursor-pointer inline-flex items-center gap-2 text-base font-semibold text-transparent bg-gradient-to-r from-pink-600 to-indigo-600 bg-clip-text hover:from-pink-700 hover:to-indigo-700 transition-all duration-200 group"
            >
              Đăng nhập ngay
              <span className="transform group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          </div>
        </CardContent>
      </Card>

      <style jsx>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }

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

        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }

        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default RegisterPage;
