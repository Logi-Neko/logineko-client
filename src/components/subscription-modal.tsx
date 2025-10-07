import { useContext, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Crown, Check } from "lucide-react";
import { SubscriptionData } from "@/types/subscription";
import { useSubscriptionMutation } from "@/queries/useSubscription";
import { usePaymentMutation } from "@/queries/usePayment";
import { PaymentRequest } from "@/types/payment";
import { AuthContext } from "@/contexts/AuthContext";

interface SubscriptionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Plan {
  type: "month" | "year";
  price: number;
  originalPrice?: number;
  monthlyPrice: number;
  discount: number;
  popular: boolean;
}

export default function SubscriptionModal({
  open,
  onOpenChange,
}: SubscriptionModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<"month" | "year">("month");
  const subscriptionMutation = useSubscriptionMutation();
  const paymentMutation = usePaymentMutation();
  const { profile } = useContext(AuthContext);

  const getCurrentDate = (): string => {
    return new Date().toISOString().split("T")[0];
  };

  const getEndDate = (type: "month" | "year"): string => {
    const start = new Date();
    if (type === "month") {
      start.setMonth(start.getMonth() + 1);
    } else {
      start.setFullYear(start.getFullYear() + 1);
    }
    return start.toISOString().split("T")[0];
  };

  const plans: Record<"month" | "year", Plan> = {
    year: {
      type: "year",
      price: 549000,
      originalPrice: 700000,
      monthlyPrice: 45000,
      discount: 20,
      popular: true,
    },
    month: {
      type: "month",
      price: 59000,
      monthlyPrice: 59000,
      discount: 0,
      popular: false,
    },
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("vi-VN").format(price) + " đ";
  };

  const generateSubscriptionData = (): SubscriptionData => {
    const plan = plans[selectedPlan];
    return {
      accountId: profile!.id,
      type: selectedPlan,
      startDate: getCurrentDate(),
      endDate: getEndDate(selectedPlan),
      price: plan.price,
      subscriptionStatus: "ACTIVE",
    };
  };

  const handleUpgrade = async (): Promise<void> => {
    try {
      const subscriptionData: SubscriptionData = generateSubscriptionData();

      const subscriptionResponse = await subscriptionMutation.mutateAsync(
        subscriptionData
      );

      if (subscriptionResponse) {
        const subscriptionId = subscriptionResponse.data.id;
        const random = Math.floor(Math.random() * 1000);

        const orderCode = Number(`${subscriptionId}${random}`);
        const paymentRequest: PaymentRequest = {
          orderCode: orderCode,
          amount: subscriptionResponse.data.price,
          description: `Thanh toán gói ${subscriptionResponse.data.type}`,
        };
        const paymentResponse = await paymentMutation.mutateAsync(
          paymentRequest
        );

        if (paymentResponse.success && paymentResponse.data) {
          window.location.href = paymentResponse.data;
        }

        onOpenChange(false);
      } else {
        console.warn("Lỗi!");
      }
    } catch (error) {
      console.error("Upgrade failed:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl w-full max-h-[90vh] overflow-y-auto bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 border-0 rounded-2xl">
        <DialogHeader className="text-center space-y-4 pb-2">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-pink-400 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-2xl">🐱</span>
            </div>
          </div>

          <div>
            <DialogTitle className="text-2xl font-bold text-gray-800 mb-2">
              LogiNeko Premium
            </DialogTitle>
            <p className="text-gray-600 text-sm">
              Mở khóa tất cả các cấp độ và tính năng độc quyền
            </p>
          </div>

          <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold inline-block">
            Tiết kiệm 20% với gói hàng năm của chúng tôi!
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div
            className={`relative p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
              selectedPlan === "year"
                ? "border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg scale-105"
                : "border-gray-200 bg-white hover:border-purple-300 hover:shadow-md"
            }`}
            onClick={() => setSelectedPlan("year")}
          >
            <div className="absolute -top-2 left-4">
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                20% OFF
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-lg text-gray-800">1 năm</div>
                <div className="text-sm text-gray-600">
                  {formatPrice(plans.year.monthlyPrice)}/tháng
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-400 line-through">
                  {plans.year.originalPrice !== undefined
                    ? formatPrice(plans.year.originalPrice)
                    : ""}
                </div>
                <div className="text-xl font-bold text-red-500">
                  {formatPrice(plans.year.price)}
                </div>
              </div>
            </div>

            {selectedPlan === "year" && (
              <div className="absolute top-4 right-4">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              </div>
            )}
          </div>

          <div
            className={`relative p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
              selectedPlan === "month"
                ? "border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg scale-105"
                : "border-gray-200 bg-white hover:border-purple-300 hover:shadow-md"
            }`}
            onClick={() => setSelectedPlan("month")}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-lg text-gray-800">
                  1 tháng
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-blue-600">
                  {formatPrice(plans.month.price)}/tháng
                </div>
              </div>
            </div>

            {selectedPlan === "month" && (
              <div className="absolute top-4 right-4">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-gray-200">
          <div className="text-center text-sm text-gray-500">
            ✨ Tham gia để thấy sự tiến bộ với gói Plus
          </div>

          <Button
            onClick={() => handleUpgrade()}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 rounded-2xl text-lg shadow-lg transition-all duration-300 hover:shadow-xl transform hover:scale-105"
          >
            <Crown className="w-5 h-5 mr-2" />
            Nâng cấp lên gói Premium 👑
          </Button>

          <div className="text-center text-xs text-gray-400">
            Hủy bất cứ lúc nào. Thanh toán định kỳ
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
