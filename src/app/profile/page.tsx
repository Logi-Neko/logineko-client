/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  User,
  Mail,
  Calendar,
  Star,
  Crown,
  Edit3,
  Save,
  X,
  LogOut,
  Shield,
} from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import logo from "../../assets/LOGO.jpg";

const ProfilePage = () => {
  const { profile, reset } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    fullName: profile?.fullName || "",
    email: profile?.email || "",
    dateOfBirth: profile?.dateOfBirth || "",
  });

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-violet-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <User className="w-16 h-16 text-gray-400 mb-4" />
            <p className="text-gray-600">
              Vui lòng đăng nhập để xem thông tin cá nhân
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSave = () => {
    console.log("Updating profile:", editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      fullName: profile?.fullName || "",
      email: profile?.email || "",
      dateOfBirth: profile?.dateOfBirth || "",
    });
    setIsEditing(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Chưa cập nhật";
    try {
      return format(new Date(dateString), "dd/MM/yyyy", { locale: vi });
    } catch {
      return "Ngày không hợp lệ";
    }
  };

  const isPremium = profile.premium && profile.premiumUntil;
  const isExpiredPremium =
    isPremium && new Date(profile.premiumUntil!) < new Date();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-violet-50 mt-8">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="mb-8 border-0 shadow-xl bg-gradient-to-r from-pink-500 to-violet-600 text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-black/10"></div>
          <CardContent className="relative p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl bg-white flex items-center justify-center">
                  {logo ? (
                    <img
                      src={logo.src}
                      alt="Logo"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xl font-bold text-pink-600 bg-gray-200 w-full h-full flex items-center justify-center">
                      {getInitials(profile.fullName)}
                    </span>
                  )}
                </div>
                {isPremium && !isExpiredPremium && (
                  <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-2 shadow-lg">
                    <Crown className="w-4 h-4 text-yellow-700" />
                  </div>
                )}
              </div>

              <div className="text-center md:text-left flex-1">
                <h1 className="text-3xl font-bold mb-2">{profile.fullName}</h1>
                <p className="text-white/80 text-lg mb-3">
                  @{profile.username}
                </p>

                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {isPremium && !isExpiredPremium && (
                    <Badge className="bg-yellow-400 text-yellow-900 hover:bg-yellow-300">
                      <Crown className="w-3 h-3 mr-1" />
                      Premium
                    </Badge>
                  )}
                  {isExpiredPremium && (
                    <Badge
                      variant="outline"
                      className="border-white/50 text-white"
                    >
                      <Shield className="w-3 h-3 mr-1" />
                      Premium Hết Hạn
                    </Badge>
                  )}
                  <Badge className="bg-white/20 text-white hover:bg-white/30">
                    <Star className="w-3 h-3 mr-1 fill-current" />
                    {profile.totalStar} sao
                  </Badge>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsEditing(true)}
                  className="border-white/50 text-white hover:bg-white/20"
                >
                  <Edit3 className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={reset}
                  className="border-white/50 text-white hover:bg-white/20"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <User className="w-5 h-5 text-pink-500" />
                Thông tin cá nhân
              </CardTitle>
              <CardDescription>
                Thông tin chi tiết về tài khoản của bạn
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <User className="w-4 h-4 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Tên đăng nhập</p>
                    <p className="font-semibold">{profile.username}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="w-4 h-4 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold">{profile.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="w-4 h-4 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Ngày sinh</p>
                    <p className="font-semibold">
                      {formatDate(profile.dateOfBirth ?? null)}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <Crown className="w-5 h-5 text-yellow-500" />
                Trạng thái Premium
              </CardTitle>
              <CardDescription>
                Thông tin về gói Premium của bạn
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isPremium && !isExpiredPremium ? (
                <div className="bg-gradient-to-r from-yellow-100 to-yellow-50 p-6 rounded-xl border border-yellow-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-yellow-400 rounded-full">
                      <Crown className="w-6 h-6 text-yellow-700" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-yellow-800">
                        Premium Active
                      </h3>
                      <p className="text-yellow-600">
                        Bạn đang sử dụng gói Premium
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-yellow-700">Hết hạn:</span>
                      <span className="font-semibold text-yellow-800">
                        {formatDate(profile.premiumUntil ?? null)}
                      </span>
                    </div>
                  </div>
                </div>
              ) : isExpiredPremium ? (
                <div className="bg-gradient-to-r from-gray-100 to-gray-50 p-6 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-gray-400 rounded-full">
                      <Shield className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">
                        Premium Hết Hạn
                      </h3>
                      <p className="text-gray-600">Gói Premium đã hết hạn</p>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Đã hết hạn:</span>
                      <span className="font-semibold text-gray-800">
                        {formatDate(profile.premiumUntil ?? null)}
                      </span>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700">
                    Gia hạn Premium
                  </Button>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-pink-100 to-violet-100 p-6 rounded-xl border border-pink-200">
                  <div className="text-center">
                    <Crown className="w-12 h-12 text-pink-400 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      Nâng cấp Premium
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Trải nghiệm tất cả tính năng cao cấp
                    </p>
                    <Button className="bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700">
                      Mua Premium
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-md bg-white border shadow-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit3 className="w-5 h-5" />
              Chỉnh sửa thông tin
            </DialogTitle>
            <DialogDescription>
              Cập nhật thông tin cá nhân của bạn
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="fullName">Họ tên</Label>
              <Input
                id="fullName"
                value={editData.fullName}
                onChange={(e) =>
                  setEditData({ ...editData, fullName: e.target.value })
                }
                placeholder="Nhập họ tên"
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={editData.email}
                onChange={(e) =>
                  setEditData({ ...editData, email: e.target.value })
                }
                placeholder="Nhập email"
              />
            </div>

            <div>
              <Label htmlFor="dateOfBirth">Ngày sinh</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={editData.dateOfBirth}
                onChange={(e) =>
                  setEditData({ ...editData, dateOfBirth: e.target.value })
                }
              />
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={handleSave} className="flex-1">
              <Save className="w-4 h-4 mr-2" />
              Lưu thay đổi
            </Button>
            <Button variant="outline" onClick={handleCancel}>
              <X className="w-4 h-4 mr-2" />
              Hủy
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfilePage;
