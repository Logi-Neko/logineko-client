export interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  premiumUntil?: string | null;
  premium?: boolean | null;
  totalStar: number;
  dateOfBirth?: string | null;
  avatarUrl: string | null;
}
