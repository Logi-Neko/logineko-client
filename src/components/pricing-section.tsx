import React, { useState } from "react";
import { Sparkles, CheckCircle } from "lucide-react";

const PricingSection = () => {
  const [visibleCards, setVisibleCards] = useState<{ [key: number]: boolean }>(
    {}
  );

  React.useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll("[data-scroll-card]");
      elements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const isVisible =
          rect.top < window.innerHeight * 0.75 && rect.bottom > 0;
        setVisibleCards((prev) => ({ ...prev, [index]: isVisible }));
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      highlighted: false,
    },
  ];

  const getScrollAnimation = (index: number) => {
    if (!visibleCards[index]) {
      if (index === 0) return "opacity-0 -translate-x-12";
      if (index === 1) return "opacity-0 translate-y-12";
      if (index === 2) return "opacity-0 translate-x-12";
    }
    return "opacity-100 translate-x-0 translate-y-0";
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full">
            <Sparkles className="w-4 h-4 inline mr-2" />
            Gói Premium
          </div>
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
              data-scroll-card
              className={`relative rounded-3xl shadow-lg transition-all duration-[1500ms] ease-out ${
                plan.highlighted ? "md:scale-105 z-10 shadow-2xl" : ""
              } ${getScrollAnimation(index)}`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full">
                    {plan.badge}
                  </div>
                </div>
              )}

              <div
                className={`rounded-3xl border-2 h-full ${
                  plan.highlighted
                    ? `border-gradient-to-r ${plan.borderColor} bg-gradient-to-br ${plan.color}`
                    : `${plan.borderColor} bg-gradient-to-br ${plan.color}`
                }`}
              >
                <div className="text-center pb-2">
                  <div className="text-2xl font-bold text-gray-800 mb-2 p-8 pb-2">
                    {plan.name}
                  </div>
                  <div className="space-y-2 px-8">
                    <p className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">
                      {plan.price}{" "}
                      {plan.period && (
                        <span className="text-sm text-gray-600">
                          {plan.period}
                        </span>
                      )}
                    </p>
                  </div>
                  <p className="text-gray-700 mt-2 px-8 pb-4">
                    {plan.description}
                  </p>
                </div>

                <div className="px-8 pb-8 space-y-4">
                  <button
                    className={`w-full rounded-xl py-2 text-lg font-semibold transition-all cursor-pointer duration-300 ${
                      plan.name === "Free"
                        ? "bg-white border-2 border-black text-gray-800 hover:bg-gray-50"
                        : "bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg text-white"
                    }`}
                  >
                    {plan.name === "Free"
                      ? "Bắt đầu miễn phí"
                      : "Nâng cấp ngay"}
                  </button>

                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
