"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useState } from "react";
import Razorpay from "Razorpay";
import { Loader2Icon } from "lucide-react";
import { useStore } from "@/store/store";
import { CREATE_SUBSCRIPTION, SAVE_PAYEMENT } from "@/data/constant";
import { toast } from "react-toastify";
import Cookies from "js-cookie"; 
import { isTokenExpired } from "../layout";
import { useRouter } from "next/navigation";
const Billing = () => {
  const token = Cookies.get("token");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const setUser = useStore((state) => state.setUser);
  const user = useStore((state) => state.user);
  const createSubscription = async () => {
    setLoading(true);
    if (isTokenExpired(token)) {
      router.push("/signin");
      return;
    }
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}${CREATE_SUBSCRIPTION}`,
      {},
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  
  
    OnPayment(response?.data?.data?.id);
  };

  const OnPayment = (subId: any) => {
   

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      subscription_id: subId,
      name: "AI Content",
      description: "AI  Content monthly subscriptions",
      handler: async (resp: any) => {
      
        if (!resp?.razorpay_payment_id) {
          console.log("Payment ID not found in the response!");
          return;
        }
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}${SAVE_PAYEMENT}`,
            { paymentId: resp?.razorpay_payment_id },
            {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          
          if (response?.data?.success) {
            // setSubscription(true);
            toast.success(response?.data?.message)
            setUser(response?.data?.data)
          }
        } catch (error) {
          setLoading(false);
          console.log("Error while save payment data", error);
          toast.error("Payment failed")
        }
        setLoading(false);
      },
    };

    // @ts-ignore
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  return (
    <div>
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      <div className="flex flex-col items-center  mt-10 gap-5 bg-slate-100">
        <div>
          <h2 className="font-bold text-2xl">Upgrade with Unlimited Plan</h2>
        </div>
        <div className={`flex md:flex-row flex-col gap-10`}>
          <div
            className={`border border-slate-400 bg-white p-10 rounded-lg  flex flex-col gap-4 items-center ${
              user.active && "scale-90"
            }`}
          >
            <span className=" text-xl">Free</span>
            <h3 className="font-bold text-3xl">0₹</h3>

            <ul className="flex flex-col gap-2">
              <li>10,000 Words/Month</li>
              <li>50+ content Templates</li>
              <li>Unlimited copied & download </li>
              <li>History show</li>
            </ul>
            {!user.active && (
              <button className="border border-slate-700 bg-slate-800 text-center py-3 px-5 text-white rounded-3xl cursor-not-allowed" disabled={true}>
                Currently Active Plan
              </button>
            )}
          </div>
          <div
            className={`border border-slate-400 bg-white p-10 rounded-lg  flex flex-col gap-4 items-center ${
              !user.active && "scale-90"
            }`}
          >
            <span className="text-xl">Unlimited</span>
            <h3 className="font-bold text-3xl">9₹ Only</h3>

            <ul className="flex flex-col gap-2">
              <li>Unlimited words generates</li>
              <li>50+ content Templates</li>
              <li>Unlimited copied & download </li>
              <li>History show</li>
            </ul>

            <button
              disabled={loading || user.active}
              
              onClick={createSubscription}
              className={`border border-blue-700  text-center py-3 px-5 rounded-3xl flex gap-3 ${
                user.active ? "bg-slate-700 text-white cursor-not-allowed":"bg-white"
              }`}
            >
              {loading && <Loader2Icon className="animate-spin" />}{" "}
              {!user.active ? "Get Started" : "Currently Active Plan"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
