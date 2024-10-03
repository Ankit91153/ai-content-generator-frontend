

import { Button } from "@/components/ui/button";
import { useStore } from "@/store/store";
import { Link } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";

const UserTrack = () => {
  const router = useRouter();
  const MAX_CREDITS = 10000;
  const totelUsage = useStore((state) => state.totelUsage);
  

  const percentage=useMemo(()=>{
    let usages= totelUsage ?? 0;
    return Math.min(Math.floor((usages * 100) / MAX_CREDITS), 100);
  },[totelUsage])

  const handleUpgradeClick = () => {
    router.push("/dashboard/billing");
  };
  return (
    <div className="m-5">
      <div className="bg-primary text-white rounded-lg p-3">
        <h2 className="font-medium text-black">Credits</h2>
        <div className="h-2 bg-[#9981f9] w-full rounded-full">
          <div
            className="h-2 bg-white rounded-full"
            style={{ width: `${Math.min(percentage, 100)}%` }}
          ></div>
        </div>
        <h2 className="text-sm my-2">
          {Math.min(totelUsage || 0, MAX_CREDITS)} / {MAX_CREDITS} Credits Used
        </h2>
      </div>
      
      <Button className="w-full my-3 text-primary" variant={"secondary"} onClick={handleUpgradeClick}>
        Upgrade
      </Button>
   
    </div>
  );
};

export default UserTrack;
