"use client";

import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Sparkles } from "lucide-react";

export default function ShopComingSoon() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-pink-50 via-purple-50 to-blue-100">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center flex-grow px-6 py-24">
        <div className="max-w-4xl space-y-8">
          <div className="inline-flex items-center justify-center bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full px-5 py-2 font-semibold shadow-md mb-2">
            <Sparkles className="w-5 h-5 mr-2" />
            Tính năng mới sắp ra mắt!
          </div>

          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">
            Cửa Hàng Neko 🛍️
          </h1>

          <p className="text-lg text-gray-700 leading-relaxed">
            Nơi bạn có thể tìm thấy các bộ học liệu, vở bài tập, sách, và gói
            học tập độc quyền của{" "}
            <span className="font-semibold text-purple-600">LogiNeko</span>.
            <br />
            Chúng tôi đang hoàn thiện trải nghiệm mua sắm để mang đến cho bé
            những hành trình học tập đầy cảm hứng! ✨
          </p>

          <Button className="mt-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full px-8 py-4 font-semibold shadow-md hover:opacity-90 transition-all">
            Nhận thông báo khi Shop mở
          </Button>

          <div className="flex justify-center mt-8">
            <div className="bg-white p-6 rounded-2xl shadow-md inline-flex items-center space-x-4">
              <ShoppingBag className="w-10 h-10 text-pink-500" />
              <p className="text-gray-700 text-base">
                <strong>“Cửa hàng Neko”</strong> – Khám phá, học hỏi, và vui
                chơi cùng Neko sắp có mặt!
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
