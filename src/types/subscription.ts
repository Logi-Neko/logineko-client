export interface SubscriptionData {
  accountId: number;
  type: "month" | "year";
  startDate: string;
  endDate: string;
  price: number;
  subscriptionStatus: "ACTIVE";
}

export interface SubscriptionResponse {
  id: number;
  accountId: number;
  accountEmail: string;
  type: string;
  startDate: string;
  endDate: string;
  price: number;
  subscriptionStatus: "ACTIVE" | "INACTIVE" | "PENDING";
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  daysRemaining: number;
}
