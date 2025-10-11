/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useContext, useEffect, useState } from "react";
import { Eye, EyeOff, User, Mail, Lock, UserCheck } from "lucide-react";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
  const router = useRouter();
  const { isAuthenticated } = useContext(AuthContext);

  const registerMutation = useRegisterMutation();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

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

    if (!validateForm()) return;

    try {
      const result = await registerMutation.mutateAsync(formData);

      console.log("Đăng ký thành công:", result);
      setSuccess(true);

      setTimeout(() => {
        setFormData({
          username: "",
          password: "",
          email: "",
          fullName: "",
        });
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 to-violet-600 p-4">
      <Card className="w-full max-w-md relative z-10 backdrop-blur-sm bg-white/95 shadow-2xl border-0">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-20 h-20 mb-4 bg-gradient-to-br from-pink-500 to-violet-600 rounded-full flex items-center justify-center shadow-lg overflow-hidden">
            <img
              src={logo.src}
              alt="Logo"
              className="w-16 h-16 object-cover rounded-full"
            />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-violet-600 bg-clip-text text-transparent">
            Tạo Tài Khoản
          </CardTitle>
          <CardDescription className="text-gray-600">
            Tham gia với chúng tôi! Điền thông tin để bắt đầu.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="fullName"
                className="text-sm font-medium text-gray-700"
              >
                Họ và tên
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Nhập họ và tên của bạn"
                  value={formData.fullName}
                  onChange={handleInputChange("fullName")}
                  className={`pl-10 border-gray-200 focus:border-pink-500 focus:ring-pink-500 ${
                    errors.fullName ? "border-red-500" : ""
                  }`}
                />
              </div>
              {errors.fullName && (
                <p className="text-sm text-red-500">{errors.fullName}</p>
              )}
            </div>

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
                  placeholder="Chọn tên đăng nhập"
                  value={formData.username}
                  onChange={handleInputChange("username")}
                  className={`pl-10 border-gray-200 focus:border-pink-500 focus:ring-pink-500 ${
                    errors.username ? "border-red-500" : ""
                  }`}
                />
              </div>
              {errors.username && (
                <p className="text-sm text-red-500">{errors.username}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Địa chỉ Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Nhập email của bạn"
                  value={formData.email}
                  onChange={handleInputChange("email")}
                  className={`pl-10 border-gray-200 focus:border-pink-500 focus:ring-pink-500 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
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
                  placeholder="Tạo mật khẩu"
                  value={formData.password}
                  onChange={handleInputChange("password")}
                  className={`pl-10 pr-10 border-gray-200 focus:border-pink-500 focus:ring-pink-500 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={registerMutation.isPending}
              className="w-full h-11 bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 text-white font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              {registerMutation.isPending ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Đang tạo tài khoản...
                </div>
              ) : (
                "Tạo Tài Khoản"
              )}
            </Button>
          </form>

          <div className="text-center pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-600">
              Đã có tài khoản?{" "}
              <Link
                href="/login"
                className="text-pink-600 hover:text-pink-700 font-medium hover:underline transition-colors cursor-pointer"
              >
                Đăng nhập
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
      <AlertDialog open={success} onOpenChange={setSuccess}>
        <AlertDialogContent className="sm:max-w-md">
          <AlertDialogHeader>
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <UserCheck className="w-8 h-8 text-green-600" />
            </div>
            <AlertDialogTitle className="text-center text-xl font-semibold text-gray-900">
              Đăng ký thành công!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-gray-600">
              Chào mừng bạn đến với chúng tôi! Tài khoản của bạn đã được tạo
              thành công. 🎉
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setSuccess(false)}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Đóng
            </Button>
            <AlertDialogAction
              onClick={() => {
                router.push("/login");
                setSuccess(false);
              }}
              className="bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 text-white"
            >
              Đăng nhập ngay
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default RegisterPage;
