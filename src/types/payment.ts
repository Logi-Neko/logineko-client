export interface PaymentRequest {
  orderCode: number;
  amount: number;
  description: string;
}

export interface PaymentResponse {
  status: number;
  code: string;
  message: string;
  data: string;
  error: boolean;
  success: boolean;
}
