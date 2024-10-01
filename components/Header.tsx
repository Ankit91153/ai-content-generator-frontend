"use client";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  return (
    <div className="border-b-2 border-slate-100 bg-white">
      <div className="flex justify-between items-center mx-10 py-1">
        <div>
          <Link href={"/"}>
            <Image src={"/logo.png"} alt="logo" width={120} height={100} />
          </Link>
        </div>
        <div>
          <Button onClick={() => router.push("/dashboard")} className="bg-white text-black hover:bg-white">Get Started</Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
