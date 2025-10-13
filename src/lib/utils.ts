import { User } from "@/types/user";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getProfileFromLS = () => {
  if (typeof window === "undefined") return null;
  const result = localStorage.getItem("profile");
  return result ? JSON.parse(result) : null;
};
export const setProfileToLS = (profile: User | null) => {
  if (profile) {
    localStorage.setItem("profile", JSON.stringify(profile));
  } else {
    localStorage.removeItem("profile");
  }
};
