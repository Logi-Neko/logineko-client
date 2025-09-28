import { apiPost } from "@/lib/api";
import { ApiResponse } from "@/types/api";
import { SubscriptionData, SubscriptionResponse } from "@/types/subscription";

const subscriptionApiRequest = {
  subscription: (body: SubscriptionData) =>
    apiPost<ApiResponse<SubscriptionResponse>>("subscriptions", body),
};

export default subscriptionApiRequest;
