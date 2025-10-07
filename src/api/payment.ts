import { sendRequest } from "@/lib/api";
import { PaymentRequest, PaymentResponse } from "@/types/payment";

const paymentApiRequest = {
  createPayment: (params: PaymentRequest) =>
    sendRequest<PaymentResponse>({
      url: "payment",
      method: "POST",
      queryParams: params,
    }),
};

export default paymentApiRequest;
