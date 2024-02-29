"use client";

import API from "@/api";
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

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("accessToken"));
  }, []);

  useEffect(() => {
    let timerId: number | undefined; //타이머의 식별자

    const refreshToken = async () => {
      try {
        const newAccessToken = await API.auth.refresh();
        if (newAccessToken) {
          API.setAccessToken(newAccessToken); //헤더에 넣고
          localStorage.setItem("accessToken", newAccessToken); //로컬에 저장하기
        }
      } catch (e) {
        console.log("리프레쉬 토큰 저장 에러");
        logOut();
      }
    };

    if (isLoggedIn) {
      timerId = window.setInterval(refreshToken, 1000 * 60 * 4.5);
    }

    return () => {
      if (timerId) window.clearInterval(timerId);
    };
  }, [isLoggedIn]);

  const logIn = (accessToken: string) => {
    console.log(1);
    setIsLoggedIn(true);
    console.log(2);
    API.setAccessToken(accessToken);
    console.log(3);
  };

  const logOut = () => {
    setIsLoggedIn(false);
    API.removeAccessToken();
  };

  const value: AuthContextValue = { isLoggedIn, logIn, logOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>; //값을 내려준다.
}
