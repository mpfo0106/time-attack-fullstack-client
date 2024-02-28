"use client";

import api from "@/api";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextValue = {
  isLoggedIn: boolean;
  logIn: (accessToken: string) => void;
  logOut: () => void;
};

const initialValue: AuthContextValue = {
  isLoggedIn: false,
  logIn: () => {},
  logOut: () => {},
};

const AuthContext = createContext<AuthContextValue>(initialValue); //생성한다

export const useAuth = () => useContext(AuthContext); //사용한다

export function AuthProvider({ children }: { children: React.ReactNode }) {
  //범위를 내려준다
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const logIn = (accessToken: string) => {
    setIsLoggedIn(true);
    api.setAccessToken(accessToken);
  };

  const logOut = () => {
    setIsLoggedIn(false);
    api.removeAccessToken();
  };

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/");
    }
  }, [router, isLoggedIn]);

  const value: AuthContextValue = { isLoggedIn, logIn, logOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>; //값을 내려준다.
}
