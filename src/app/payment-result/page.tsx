import { useState, useEffect } from "react";
import {
  CheckCircle,
  XCircle,
  ArrowLeft,
  Download,
  RefreshCw,
  Home,
  Receipt,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaymentResultProps {
  status?: "success" | "failed";
  transactionData?: {
    orderId: string;
    amount: number;
    currency: string;
    transactionId: string;
    paymentMethod: string;
    timestamp: string;
    description: string;
  };
}

export default function PaymentResult({
  status = "success",
  transactionData = {
    orderId: "ORDER_20240928_001",
    amount: 1790000,
    currency: "VND",
    transactionId: "TXN_PAY_20240928_145630",
    paymentMethod: "QR_CODE",
    timestamp: new Date().toISOString(),
    description: "LogiNeko Premium - 1 năm",
  },
}: PaymentResultProps) {
  const [animate, setAnimate] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setAnimate(true);
    if (status === "success") {
      setTimeout(() => setShowConfetti(true), 500);
    }
  }, [status]);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("vi-VN").format(price) + " ₫";
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const isSuccess = status === "success";

  return (
    <div
      className={`min-h-screen relative overflow-hidden ${
        isSuccess
          ? "bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50"
          : "bg-gradient-to-br from-red-50 via-rose-50 to-pink-50"
      }`}
    >
      <div className="absolute inset-0 overflow-hidden">
        {showConfetti && isSuccess && (
          <>
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-3 h-3 ${
                  i % 4 === 0
                    ? "bg-yellow-400"
                    : i % 4 === 1
                    ? "bg-green-400"
                    : i % 4 === 2
                    ? "bg-blue-400"
                    : "bg-pink-400"
                } rounded-full animate-bounce`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random() * 2}s`,
                }}
              />
            ))}
          </>
        )}

        <div
          className={`absolute top-20 left-20 w-32 h-32 ${
            isSuccess ? "bg-green-200" : "bg-red-200"
          } rounded-full opacity-20 animate-pulse`}
        />
        <div
          className={`absolute bottom-20 right-20 w-24 h-24 ${
            isSuccess ? "bg-emerald-200" : "bg-rose-200"
          } rounded-full opacity-30 animate-pulse`}
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <div
          className={`w-full max-w-md bg-white rounded-3xl shadow-2xl border-0 overflow-hidden transform transition-all duration-1000 ${
            animate
              ? "translate-y-0 opacity-100 scale-100"
              : "translate-y-8 opacity-0 scale-95"
          }`}
        >
          <div
            className={`relative py-12 px-8 text-center ${
              isSuccess
                ? "bg-gradient-to-br from-green-500 to-emerald-600"
                : "bg-gradient-to-br from-red-500 to-rose-600"
            }`}
          >
            <div
              className={`inline-flex items-center justify-center w-24 h-24 mb-6 bg-white rounded-full shadow-lg transform transition-all duration-700 ${
                animate ? "scale-100 rotate-0" : "scale-0 rotate-180"
              }`}
            >
              {isSuccess ? (
                <CheckCircle className="w-12 h-12 text-green-500" />
              ) : (
                <XCircle className="w-12 h-12 text-red-500" />
              )}
            </div>

            <h1 className="text-3xl font-bold text-white mb-3">
              {isSuccess ? "Thanh toán thành công!" : "Thanh toán thất bại!"}
            </h1>

            <p className="text-white/90 text-lg">
              {isSuccess
                ? "Giao dịch của bạn đã được xử lý thành công"
                : "Có lỗi xảy ra trong quá trình thanh toán"}
            </p>

            <div className="absolute top-4 left-4 w-3 h-3 bg-white/30 rounded-full animate-ping" />
            <div className="absolute top-8 right-6 w-2 h-2 bg-white/40 rounded-full animate-pulse" />
            <div className="absolute bottom-6 left-8 w-4 h-4 bg-white/20 rounded-full animate-bounce" />
          </div>

          <div className="p-8 space-y-6">
            <div className="text-center pb-6 border-b border-gray-100">
              <p className="text-gray-600 text-sm mb-2">Số tiền</p>
              <p
                className={`text-4xl font-bold ${
                  isSuccess ? "text-green-600" : "text-red-600"
                }`}
              >
                {formatPrice(transactionData.amount)}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600 text-sm">Mã đơn hàng</span>
                <span className="font-mono text-sm font-semibold text-gray-800">
                  {transactionData.orderId}
                </span>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600 text-sm">Mã giao dịch</span>
                <span className="font-mono text-sm font-semibold text-gray-800">
                  {transactionData.transactionId}
                </span>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600 text-sm">Phương thức</span>
                <span className="text-sm font-semibold text-gray-800">
                  {transactionData.paymentMethod === "QR_CODE"
                    ? "Quét mã QR"
                    : "Thẻ ngân hàng"}
                </span>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600 text-sm">Thời gian</span>
                <span className="text-sm font-semibold text-gray-800">
                  {formatDate(transactionData.timestamp)}
                </span>
              </div>

              <div className="flex justify-between items-start py-2">
                <span className="text-gray-600 text-sm">Mô tả</span>
                <span className="text-sm font-semibold text-gray-800 text-right max-w-48">
                  {transactionData.description}
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-gray-50 space-y-3">
            {isSuccess ? (
              <>
                <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
                  <Home className="w-4 h-4 mr-2" />
                  Về trang chủ
                </Button>

                <Button
                  variant="outline"
                  className="w-full border-2 border-green-200 text-green-700 hover:bg-green-50 font-semibold py-3 rounded-xl transition-all duration-300"
                >
                  <Receipt className="w-4 h-4 mr-2" />
                  Tải hóa đơn
                </Button>
              </>
            ) : (
              <>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Thử lại thanh toán
                </Button>

                <Button
                  variant="outline"
                  className="w-full border-2 border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold py-3 rounded-xl transition-all duration-300"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Quay lại
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            {isSuccess
              ? "🎉 Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!"
              : "💡 Vui lòng kiểm tra lại thông tin và thử lại"}
          </p>
          <p className="text-gray-500 text-xs mt-2">Powered by PayOS</p>
        </div>
      </div>
    </div>
  );
}
