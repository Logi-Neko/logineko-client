import paymentApiRequest from "@/api/payment";
import { useMutation } from "@tanstack/react-query";

export const usePaymentMutation = () => {
  return useMutation({
    mutationFn: paymentApiRequest.createPayment,
  });
};
