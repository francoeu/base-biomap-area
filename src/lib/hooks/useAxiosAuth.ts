"use client";
import { axiosAuth } from "@/lib/axios";
import { useRefreshToken } from "@/lib/hooks/useRefreshToken";
import { isBrowser } from "@/utils/ssr";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
const useAxiosAuth = () => {
  const { data: session } = useSession();
  
  const refreshToken = useRefreshToken();

  useEffect(() => {
    if (!isBrowser) {
      console.log('isBrowser', isBrowser)
      return () => undefined;
    }
    const requestIntercept = axiosAuth.interceptors.request.use(
      (config) => {
        // const token = isBrowser ? localStorage.getItem('next-auth.session-token') : null;
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${session?.user?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosAuth.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          await refreshToken();
          prevRequest.headers["Authorization"] = `Bearer ${session?.user.accessToken}`;
          return axiosAuth(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosAuth.interceptors.request.eject(requestIntercept);
      axiosAuth.interceptors.response.eject(responseIntercept);
    };
  }, [session, refreshToken]);

  return axiosAuth;
};

export default useAxiosAuth;
