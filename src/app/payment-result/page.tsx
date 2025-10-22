"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowLeft,
  Sparkles,
  Gift,
  BookOpen,
  Play,
  Star,
  Link,
} from "lucide-react";

interface PaymentData {
  status: string;
  code: string;
  id: string;
  orderCode: string;
  cancel: boolean;
}

const PaymentResultContent = () => {
  const searchParams = useSearchParams();
  const [paymentData, setPaymentData] = useState<PaymentData>({
    status: "",
    code: "",
    id: "",
    orderCode: "",
    cancel: true,
  });

  useEffect(() => {
    setPaymentData({
      status: searchParams.get("status") || "PAID",
      code: searchParams.get("code") || "00",
      id: searchParams.get("id") || "1",
      orderCode: searchParams.get("orderCode") || "2",
      cancel: searchParams.get("cancel") === "true",
    });
  }, [searchParams]);

  const isSuccess = paymentData.status.toLowerCase() === "PAID";

  return (
    <div
      className={`min-h-screen ${
        paymentData.status === "PAID"
          ? "bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100"
          : paymentData.status === "CANCELLED"
          ? "bg-gradient-to-br from-red-50 via-rose-50 to-pink-100"
          : "bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-100"
      } relative overflow-hidden`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute top-20 left-10 ${
            paymentData.status === "PAID"
              ? "text-green-200"
              : paymentData.status === "CANCELLED"
              ? "text-red-200"
              : "text-orange-200"
          } opacity-20 animate-pulse`}
        >
          <Sparkles size={60} />
        </div>
        <div
          className={`absolute top-40 right-20 ${
            paymentData.status === "PAID"
              ? "text-green-200"
              : paymentData.status === "CANCELLED"
              ? "text-red-200"
              : "text-orange-200"
          } opacity-15 animate-bounce`}
        >
          <BookOpen size={80} />
        </div>
        <div
          className={`absolute bottom-20 left-1/4 ${
            paymentData.status === "PAID"
              ? "text-green-200"
              : paymentData.status === "CANCELLED"
              ? "text-red-200"
              : "text-orange-200"
          } opacity-10`}
        >
          <Gift size={120} />
        </div>
        <div
          className={`absolute top-60 left-1/3 ${
            paymentData.status === "PAID"
              ? "text-green-200"
              : paymentData.status === "CANCELLED"
              ? "text-red-200"
              : "text-orange-200"
          } opacity-20 animate-pulse`}
        >
          <Sparkles size={40} />
        </div>
        <div
          className={`absolute bottom-40 right-1/4 ${
            paymentData.status === "PAID"
              ? "text-green-200"
              : paymentData.status === "CANCELLED"
              ? "text-red-200"
              : "text-orange-200"
          } opacity-15`}
        >
          <Star size={50} />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 relative z-10">
        <div className=" gap-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/50">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-50 mb-6 shadow-lg">
                {paymentData.status === "PAID" ? (
                  <CheckCircle className="w-12 h-12 text-green-600" />
                ) : paymentData.status === "CANCELLED" ? (
                  <XCircle className="w-12 h-12 text-red-600" />
                ) : (
                  <AlertCircle className="w-12 h-12 text-orange-600" />
                )}
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                {paymentData.status === "PAID"
                  ? "Thanh toán thành công! 🎉"
                  : paymentData.status === "CANCELLED"
                  ? "Thanh toán thất bại"
                  : "Thanh toán đã bị hủy"}
              </h2>

              <p className="text-lg text-gray-600 mb-2">
                {paymentData.status === "PAID"
                  ? "Chúc mừng! Gói Premium đã được kích hoạt"
                  : paymentData.status === "CANCELLED"
                  ? "Rất tiếc, có lỗi xảy ra trong quá trình thanh toán"
                  : "Giao dịch đã được hủy bỏ"}
              </p>

              <p className="text-gray-500 leading-relaxed">
                {paymentData.status === "PAID"
                  ? "Bé đã chính thức trở thành thành viên Premium của Logineko!"
                  : paymentData.status === "CANCELLED"
                  ? "Đừng lo lắng! Hãy thử lại hoặc chọn phương thức thanh toán khác."
                  : "Bé vẫn có thể quay lại và tiếp tục thanh toán để mở khóa gói Premium bất cứ lúc nào!"}
              </p>
            </div>

            <div className="bg-gray-50/70 rounded-2xl p-6 mb-8 backdrop-blur-sm">
              <h3 className="font-semibold text-gray-700 mb-4 text-center flex items-center justify-center gap-2">
                <Gift className="w-5 h-5" />
                Chi tiết giao dịch
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Mã giao dịch:</span>
                  <span className="font-mono font-medium text-gray-800 bg-white px-2 py-1 rounded">
                    #{paymentData.orderCode}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Gói đã mua:</span>
                  <span className="font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                    ✨ Premium
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Thời hạn:</span>
                  <span className="font-medium text-gray-800">12 tháng</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Trạng thái:</span>
                  <span
                    className={`font-medium ${
                      paymentData.status === "PAID"
                        ? "text-green-600"
                        : paymentData.status === "CANCELLED"
                        ? "text-red-600"
                        : "text-orange-600"
                    } flex items-center gap-1`}
                  >
                    {paymentData.status === "cancelled"
                      ? "❌ Đã hủy"
                      : paymentData.status === "PAID"
                      ? "✅ Thành công"
                      : "❌ Thất bại"}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Link
                href="/"
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Về trang chủ Logineko
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg">
          <h3 className="font-semibold text-gray-800 mb-3">Cần hỗ trợ?</h3>
          <p className="text-gray-600 mb-4 text-sm">
            Đội ngũ Logineko luôn sẵn sàng hỗ trợ bé và gia đình 24/7
          </p>
          <div className="flex justify-center gap-4 text-sm">
            <button className="px-6 py-2 bg-purple-100 hover:bg-purple-200 text-purple-600 rounded-full font-medium transition-colors">
              💬 Chat với chúng tôi
            </button>
            <button className="px-6 py-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-full font-medium transition-colors">
              📞 Gọi hotline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PaymentResult: React.FC = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600">Đang tải kết quả thanh toán...</p>
          </div>
        </div>
      }
    >
      <PaymentResultContent />
    </Suspense>
  );
};

export default PaymentResult;
