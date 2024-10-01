"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useStore } from "@/store/store";
import axios from "axios";
import { GET_AI_CONTENT_RESPONSE } from "@/data/constant";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; 
import { isTokenExpired } from "../layout";
import PuffLoader from "react-spinners/PuffLoader";

const History = () => {
  const token = Cookies.get("token");
   
  const router = useRouter();
  const { aiResponseData } = useStore((state) => state);
  const setAiResponseData = useStore((state) => state.setAiResponseData);
  const [copyStatus, setCopyStatus] = useState<{ [key: number]: boolean }>({}); 
  const [loading,setLoading]=useState(false);

  const handleCopy = async (aiResponse: string, index: number) => {
    try {
      await navigator.clipboard.writeText(aiResponse);
      setCopyStatus((prev) => ({ ...prev, [index]: true })); 
      setTimeout(() => {
        setCopyStatus((prev) => ({ ...prev, [index]: false })); 
      }, 800);
    } catch (error) {
      console.error("Failed to copy: ", error);
    }
  };

  const fetchLatestData = async () => {
    setLoading(true);
    if (isTokenExpired(token)) {
      router.push("/signin");
      return;
    }
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}${GET_AI_CONTENT_RESPONSE}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const aiResponses = response?.data?.data;
      setAiResponseData(aiResponses); 
    } catch (error) {
      console.error("Error fetching latest data:", error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        console.log("Unauthorized! Redirecting to sign-in.");
        router.push("/signin");
      }
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestData(); 
  }, []);
  return (
    <div>
      <div className="flex flex-col gap-4 bg-white mt-5 ml-5 p-5">
        <div>
          <h2 className="font-bold text-xl text-black">History</h2>
          <p className="text-sm font-medium text-slate-500">
            Search your previous AI Contents
          </p>
        </div>

        <div>
        {loading ? (
            <div className="flex justify-center items-center h-full">
              <PuffLoader />
            </div>
          ) : (
          <Table>
            <TableCaption>A list of your Contents</TableCaption>
            <TableHeader className="bg-slate-200 text-black">
              <TableRow>
                <TableHead className=" text-black font-bold uppercase">
                  Template Name
                </TableHead>
                <TableHead className="text-black font-bold  uppercase">
                  AI Resp
                </TableHead>
                <TableHead className="text-black font-bold uppercase">
                  Date
                </TableHead>
                <TableHead className="text-black font-bold uppercase">
                  Words
                </TableHead>
                <TableHead className="text-black font-bold uppercase">
                  Copy
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              { aiResponseData?.map(
                (item: any, index: number) => {
                 

                  return (
                    // <div key={index}>
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {item?.templateSlugName}
                      </TableCell>
                      <TableCell>
                        {(item?.aiResponse).substring(0, 51)}...
                      </TableCell>
                      <TableCell>
                        {new Date(item?.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="">
                        {(item?.aiResponse).split(" ").length}
                      </TableCell>
                      <TableCell className="cursor-pointer text-primary" onClick={() => handleCopy(item?.aiResponse, index)}>
                        {copyStatus[index]?"copied":"copy"}
                      </TableCell>
                    </TableRow>
                    // </div>
                  );
                }
              )}
            </TableBody>
          </Table>)}
        </div>
      </div>
    </div>
  );
};

export default History;
