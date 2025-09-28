import subscriptionApiRequest from "@/api/subscription";
import { useMutation } from "@tanstack/react-query";

export const useSubscriptionMutation = () => {
  return useMutation({
    mutationFn: subscriptionApiRequest.subscription,
  });
};
