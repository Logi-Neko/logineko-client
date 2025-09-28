import { apiPost } from "@/lib/api";
import { ApiResponse } from "@/types/api";
import { PaymentRequest, PaymentResponse } from "@/types/payment";

const paymentApiRequest = {
  createPayment: (params: PaymentRequest) =>
    apiPost<PaymentResponse>("payment", { params }),
};

export default paymentApiRequest;
