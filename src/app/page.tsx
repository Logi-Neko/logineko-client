"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/footer";
import {
  Star,
  BookOpen,
  Users,
  Award,
  Play,
  Shield,
  Gamepad2,
  X,
  Download,
  CheckCircle,
  Sparkles,
} from "lucide-react";

const mainFeatures = [
  {
    icon: BookOpen,
    title: "Bài Học Tương Tác Cùng Neko",
    description:
      "Tham gia những bài học sống động với giọng đọc và hoạt động tương tác hấp dẫn.",
    details: [
      "Hơn 50 bài học toàn diện",
      "Lồng tiếng chuyên nghiệp",
      "Tương tác cảm ứng thông minh",
      "Câu hỏi hiểu nội dung",
      "Luyện từ vựng phong phú",
    ],
    color: "from-red-400 to-pink-400",
  },
  {
    icon: Gamepad2,
    title: "Cuộc Thi Cùng Bạn Bè",
    description:
      "Tham gia cuộc thi học tập với bạn bè, nhận star từ bài học để mở khóa nhân vật.",
    details: [
      "Cuộc thi hàng tuần theo star",
      "Xếp hạng dựa trên star học được",
      "Tích lũy star từ từng bài học",
      "Phần thưởng hấp dẫn cho top xếp",
      "Tính toán điểm công bằng & minh bạch",
    ],
    color: "from-blue-400 to-cyan-400",
  },
  {
    icon: Award,
    title: "Bảng Xếp Hạng & Nhân Vật",
    description:
      "Xếp hạng theo star học được, mở khóa và sưu tầm hơn 50 nhân vật đặc biệt.",
    details: [
      "Bảng xếp hạng toàn cầu theo star",
      "Mở khóa nhân vật khi đạt star nhất định",
      "Nhân vật độc quyền & skin đặc biệt",
      "Hiển thị thành tích & huy hiệu",
      "Theo dõi tiến độ thu thập nhân vật",
    ],
    color: "from-yellow-400 to-orange-400",
  },
  {
    icon: Users,
    title: "Báo Cáo Cho Phụ Huynh",
    description:
      "Công cụ theo dõi toàn diện, giúp ba mẹ nắm bắt tiến độ học tập của con.",
    details: [
      "Báo cáo chi tiết hàng tuần",
      "Thống kê học tập thực tế",
      "Thông báo tiến độ tự động",
      "Phân tích điểm yếu & điểm mạnh",
      "Gợi ý cải thiện cá nhân hóa",
    ],
    color: "from-green-400 to-emerald-400",
  },
  {
    icon: Shield,
    title: "Cửa Hàng Nhân Vật & Vật Phẩm",
    description:
      "Mở khóa 50+ nhân vật độc quyền bằng cách hoàn thành bài học và tích lũy star.",
    details: [
      "50+ nhân vật đặc biệt để sưu tầm",
      "Mở khóa theo mức star đạt được",
      "Skin & theme độc quyền cho nhân vật",
      "Vật phẩm trang trí để sưu tầm",
      "Quà tặng hàng ngày miễn phí",
    ],
    color: "from-purple-400 to-indigo-400",
  },
  {
    icon: Shield,
    title: "Tương Thích Đa Thiết Bị",
    description: "Trải nghiệm liền mạch trên mọi thiết bị, mọi nơi mọi lúc.",
    details: [
      "Hỗ trợ iOS & Android",
      "Tối ưu cho máy tính bảng",
      "Đồng bộ đa nền tảng",
      "Truy cập nội dung offline",
      "Lưu tiến trình trên đám mây",
    ],
    color: "from-teal-400 to-blue-400",
  },
];

const premiumPlans = [
  {
    name: "Free",
    price: "Miễn phí",
    description: "Bắt đầu hành trình học tập",
    features: [
      "Truy cập một số bài học",
      "Tham gia cuộc thi cùng bạn bè",
      "Báo cáo tiến độ cơ bản",
    ],
    color: "from-blue-50 to-cyan-50",
    borderColor: "border-blue-200",
    highlighted: false,
  },
  {
    name: "Premium",
    price: "₫59,000",
    period: "/ tháng",
    description: "Trải nghiệm đầy đủ",
    features: [
      "Truy cập tất cả 50+ bài học",
      "Tham gia cuộc thi cùng bạn bè",
      "Báo cáo chi tiết cho phụ huynh",
      "Huy hiệu & phần thưởng độc quyền",
      "Hỗ trợ ưu tiên 24/7",
      "Cập nhật nội dung mới miễn phí",
    ],
    color: "from-purple-50 via-pink-50 to-purple-50",
    borderColor: "border-purple-300",
    highlighted: true,
    badge: "Phổ biến nhất",
  },
  {
    name: "Premium Năm",
    price: "₫549,000",
    period: "/ năm",
    description: "Tiết kiệm hơn cả năm",
    features: [
      "Tất cả tính năng Premium",
      "Tiết kiệm 20% so với theo tháng",
      "Truy cập tất cả 50+ bài học",
      "Tham gia cuộc thi cùng bạn bè",
      "Hỗ trợ ưu tiên 24/7",
      "Cập nhật nội dung mới miễn phí",
    ],
    color: "from-yellow-50 to-orange-50",
    borderColor: "border-orange-200",
    highlighted: true,
  },
];

const testimonials = [
  {
    name: "TS. Sarah Williams",
    role: "Chuyên Gia Phát Triển Trẻ Em",
    quote:
      "LogiNeko cân bằng hoàn hảo giữa giáo dục và giải trí. Trẻ em học mà không cảm thấy bị ép buộc!",
    rating: 5,
  },
  {
    name: "Hiệu Trưởng Mark Thompson",
    role: "Trường Tiểu Học Hope Hill",
    quote:
      "Chúng tôi luôn giới thiệu LogiNeko đến các bậc phụ huynh. Một công cụ hỗ trợ học tập tuyệt vời!",
    rating: 5,
  },
  {
    name: "Phụ huynh Jennifer Chen",
    role: "Giáo dục tại nhà",
    quote:
      "Ứng dụng này đã thay đổi hoàn toàn lịch học ở nhà và trên trường. Các con tôi mong đợi giờ học mới ngày!",
    rating: 5,
  },
];

export default function Home() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full">
                  🎉 Tính năng mới đã có sẵn!
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">
                    Learn & Play with
                  </span>
                  <span className="bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">
                    {" "}
                    Neko Mèo Con!
                  </span>
                  🐱
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Cùng Neko, người bạn mèo đáng yêu của bé, khám phá những cuộc
                  phiêu lưu học tập thú vị! Hoàn hảo cho trẻ em từ 5-10 tuổi với
                  những câu chuyện tương tác, trò chơi vui nhộn và hoạt động hấp
                  dẫn.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="cursor-pointer bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 text-white rounded-full px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:rotate-1"
                >
                  <Play className="w-5 h-5 mr-2 animate-pulse" />
                  Bắt đầu học ngay hôm nay
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="cursor-pointer rounded-full px-8 py-4 text-lg font-semibold border-2 border-pink-500 text-pink-600 hover:bg-gradient-to-r hover:from-pink-500 hover:to-violet-600 hover:text-white hover:border-transparent transform hover:scale-105 transition-all duration-300 hover:-rotate-1 hover:shadow-lg"
                  onClick={() => setShowVideo(true)}
                >
                  <Play className="w-5 h-5 mr-2" />
                  Xem video giới thiệu
                </Button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-semibold">4.9/5</span>
                  <span>App Store</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-5 h-5 text-blue-500" />
                  <span className="font-semibold">50K+</span>
                  <span>Bé yêu thích</span>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="bg-gradient-to-r from-pink-500 to-violet-600 rounded-3xl p-2 shadow-xl hover:shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-500 group-hover:scale-105">
                <div className="bg-white rounded-3xl p-6 space-y-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-100 to-violet-100 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <div className="flex items-center justify-between relative z-10">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
                      <span className="text-2xl">📚</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800 animate-pulse">
                      Trực tuyến
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 relative z-10 group-hover:text-pink-600 transition-colors duration-300">
                    Ứng dụng LogiNeko
                  </h3>
                  <p className="text-gray-600 relative z-10 group-hover:text-gray-700 transition-colors duration-300">
                    Học tập tương tác cho trẻ 5-10 tuổi
                  </p>
                  <div className="grid grid-cols-3 gap-4 relative z-10">
                    <div className="text-center transform group-hover:scale-110 transition-transform duration-300">
                      <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-yellow-200 transition-colors duration-300">
                        <span className="text-xl">📝</span>
                      </div>
                      <span className="text-xs text-gray-600">Chữ cái</span>
                    </div>
                    <div className="text-center transform group-hover:scale-110 transition-transform duration-300 delay-100">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-blue-200 transition-colors duration-300">
                        <span className="text-xl">🔢</span>
                      </div>
                      <span className="text-xs text-gray-600">Số học</span>
                    </div>
                    <div className="text-center transform group-hover:scale-110 transition-transform duration-300 delay-200">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-green-200 transition-colors duration-300">
                        <span className="text-xl">🎨</span>
                      </div>
                      <span className="text-xs text-gray-600">Nghệ thuật</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">
              Tại sao trẻ em yêu thích LogiNeko
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Được thiết kế cùng các chuyên gia phát triển trẻ em để làm cho
              việc học tập trở nên hấp dẫn, an toàn và hiệu quả
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-red-50 to-pink-50 transform hover:scale-105 hover:-rotate-1 group cursor-pointer">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-pink-600 transition-colors duration-300">
                  Học tập của Neko
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  Cùng Neko trong những cuộc phiêu lưu được minh họa tuyệt đẹp
                  với giọng kể chuyện chuyên nghiệp để cải thiện kỹ năng đọc và
                  nghe.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-cyan-50 transform hover:scale-105 hover:rotate-1 group cursor-pointer">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <Gamepad2 className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                  Thi cùng Neko
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  Cùng Neko trong những trò chơi giáo dục vui nhộn dạy toán học,
                  đọc viết và kỹ năng giải quyết vấn đề thông qua trò chơi tương
                  tác.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-green-50 to-emerald-50 transform hover:scale-105 hover:-rotate-1 group cursor-pointer">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-green-600 transition-colors duration-300">
                  Theo dõi tiến độ cùng Neko
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  Theo dõi sự phát triển của con bé cùng Neko! Báo cáo tiến độ
                  chi tiết và thành tích để an mừng những cột mốc học tập.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">
              Tính Năng Mạnh Mẽ Cho Việc Học Hiệu Quả
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Mọi tính năng đều được thiết kế cẩn thận để hỗ trợ sự phát triển
              và hành trình học tập của con bạn
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {mainFeatures.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <Card
                  key={feature.title}
                  className="rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border-0 overflow-hidden"
                >
                  <CardHeader className="relative">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mb-4`}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-800">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 text-lg">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {feature.details.map((detail, i) => (
                        <li key={i} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full inline-block">
              <Sparkles className="w-4 h-4 inline mr-2" />
              Gói Premium
            </Badge>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">
              Chọn Gói Phù Hợp Cho Con Bé
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nâng cấp để mở khóa tất cả tính năng và nội dung độc quyền
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {premiumPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-3xl shadow-lg transition-all duration-300 ${
                  plan.highlighted ? "md:scale-105 z-10 shadow-2xl" : ""
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full">
                      {plan.badge}
                    </Badge>
                  </div>
                )}

                <Card
                  className={`rounded-3xl border-2 h-full ${
                    plan.highlighted
                      ? `border-gradient-to-r ${plan.borderColor} bg-gradient-to-br ${plan.color}`
                      : `${plan.borderColor} bg-gradient-to-br ${plan.color}`
                  }`}
                >
                  <CardHeader className="text-center pb-2">
                    <CardTitle className="text-2xl font-bold text-gray-800 mb-2">
                      {plan.name}
                    </CardTitle>
                    <div className="space-y-2">
                      <p className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">
                        {plan.price}{" "}
                        {plan.period && (
                          <span className="text-sm text-gray-600">
                            {plan.period}
                          </span>
                        )}
                      </p>
                    </div>
                    <CardDescription className="text-gray-700 mt-2">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <Button
                      className={`w-full rounded-full py-3 text-lg font-semibold transition-all cursor-pointer duration-300 ${
                        plan.highlighted
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg text-white"
                          : "bg-white border-2 border-black text-gray-800 hover:bg-gray-50"
                      }`}
                    >
                      {plan.name === "Free"
                        ? "Bắt đầu miễn phí"
                        : "Nâng cấp ngay"}
                    </Button>

                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 text-sm">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">
              Được Các Chuyên Gia Tin Cậy
            </h2>
            <p className="text-xl text-gray-600">
              Xem các chuyên gia giáo dục nói gì về LogiNeko
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="rounded-3xl shadow-lg border-0 bg-white hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-violet-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">
              Sẵn Sàng Cho Hành Trình Học Tập Cùng Neko Chưa?
            </h2>
            <p className="text-xl text-white/90">
              Hàng ngàn gia đình đã tin tưởng LogiNeko để đồng hành cùng con
              trong giáo dục.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-gray-100 rounded-full px-8 py-4 text-lg font-semibold shadow-lg"
              >
                <Download className="w-5 h-5 mr-2" />
                Tải Ứng Dụng Miễn Phí
              </Button>
              <Button
                size="lg"
                className="bg-white/20 text-white hover:bg-white/30 border-2 border-white rounded-full px-8 py-4 text-lg font-semibold backdrop-blur-sm"
              >
                Nâng Cấp Premium
              </Button>
            </div>

            <div className="flex items-center justify-center space-x-8 text-white/80 flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>Tải miễn phí</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>Không quảng cáo</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>An toàn cho trẻ</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {showVideo && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
          <div className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-red-50 hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:rotate-90 group"
            >
              <X className="w-6 h-6 text-gray-600 group-hover:text-red-500 transition-colors duration-300" />
            </button>
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Video giới thiệu LogiNeko"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="rounded-2xl"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
