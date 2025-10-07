"use client";

import { User } from "@/types/user";
import { createContext, useEffect, useState } from "react";
import { useAccountMe } from "@/queries/useAuth";
import { setProfileToLS } from "@/lib/utils";

interface AuthContextInterface {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  profile: User | null;
  setProfile: (profile: User | null) => void;
  reset: () => void;
}

const initialAppContext: AuthContextInterface = {
  isAuthenticated: false,
  setIsAuthenticated: () => null,
  profile: null,
  setProfile: () => null,
  reset: () => null,
};

export const AuthContext =
  createContext<AuthContextInterface>(initialAppContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      return Boolean(token);
    }
    return false;
  });

  const [profile, setProfileState] = useState<User | null>(
    initialAppContext.profile
  );

  const { data, isSuccess, isError, refetch } = useAccountMe();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token && !profile && !isError) {
      setIsAuthenticated(true);
      if (!data) {
        refetch();
      }
    }
  }, [profile, isError, data, refetch]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token && isSuccess && data) {
      handleSetProfile(data.data);
    } else if (isError) {
      reset();
    }
  }, [data, isSuccess, isError]);

  const handleSetProfile = (profile: User | null) => {
    setProfileState(profile);
    setProfileToLS(profile);
    setIsAuthenticated(Boolean(profile));
  };

  const reset = () => {
    setIsAuthenticated(false);
    setProfileState(null);
    setProfileToLS(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile: handleSetProfile,
        reset,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
