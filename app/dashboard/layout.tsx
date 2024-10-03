"use client";
import React, { useEffect, useState } from "react";
import SideNav from "./_component/SideNav";
import Header from "./_component/Header";
import axios from "axios";
import { useStore } from "@/store/store";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { GET_AI_CONTENT_RESPONSE, USER_PROFILE } from "@/data/constant";
import PuffLoader from "react-spinners/PuffLoader";

export const isTokenExpired = (token: any) => {
  try {
    if (!token) return true;

    const parts = token.split(".");
    if (parts.length !== 3) {
      return true;
    }

    const payload = JSON.parse(atob(parts[1]));
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return payload.exp < currentTime; // Check if token is expired
  } catch (error) {
    console.error("Failed to decode token:", error);
    return true; // Consider the token expired if it's invalid
  }
};
const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  const setAiResponseData = useStore(
    (state: { setAiResponseData: any }) => state.setAiResponseData
  );
  const setTotelUsage = useStore((state) => state.setTotelUsage);
  const setUser = useStore((state) => state.setUser);

  const [isLoading, setIsLoading] = useState(true);

  // Fetch user data
  const fetchUsageData = async (token:any) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}${GET_AI_CONTENT_RESPONSE}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const aiResponses = response?.data?.data;

      const totalWords = aiResponses?.reduce((acc: any, obj: any) => {
        if (obj.aiResponse) {
          return acc + obj.aiResponse.split(/\s+/).length;
        }
        return acc;
      }, 0);
      setAiResponseData(response.data.data);
      setTotelUsage(totalWords);
    } catch (error) {
      console.error("Error fetching API data:", error);
    }
  };

  const fetchUserData = async (token:any) => {
    console.log(`${process.env.NEXT_PUBLIC_BASE_URL}${USER_PROFILE}`);
    
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}${USER_PROFILE}`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response?.data);

      if (response?.data?.success) {
        setUser(response?.data?.data);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error response:", error.response);
        console.log("User profile not retrieved:", error.response?.data);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (isTokenExpired(token)) {
      router.push("/signin");
      return;
    } else {
      fetchUserData(token);
      fetchUsageData(token).finally(() => setIsLoading(false));
    }
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <PuffLoader />
      </div>
    );
  }

  return (
    <div className="bg-slate-100 h-screen">
      <div className="md:w-64 hidden md:block fixed">
        <SideNav />
      </div>
      <div className="md:ml-64 flex flex-col">
        <div>
          <Header />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
