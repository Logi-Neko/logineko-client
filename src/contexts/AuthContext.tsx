"use client";

import { User } from "@/types/user";
import { createContext, useContext, useEffect, useState } from "react";
import { useAccountMe } from "@/queries/useAuth";
import { getProfileFromLS, setProfileToLS } from "@/lib/utils";

interface AuthContextInterface {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  profile: User | null;
  setProfile: (profile: User | null) => void;
  reset: () => void;
}

const initialAppContext: AuthContextInterface = {
  isAuthenticated: Boolean(getProfileFromLS()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
  reset: () => null,
};

export const AuthContext =
  createContext<AuthContextInterface>(initialAppContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    initialAppContext.isAuthenticated
  );

  const [profile, setProfileState] = useState<User | null>(
    initialAppContext.profile
  );

  const { data, isSuccess, isError } = useAccountMe();

  useEffect(() => {
    if (isSuccess && data.data) {
      handleSetProfile(data.data);
    }
    if (isError) {
      reset();
    }
  }, [data, isSuccess, isError]);

  const handleSetProfile = (profile: User | null) => {
    setProfileState(profile);
    setProfileToLS(profile);
    setIsAuthenticated(Boolean(profile));
  };

  const reset = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsAuthenticated(false);
    setProfileState(null);
    setProfileToLS(null);
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

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
