"use client";
import { MenuList } from "@/data/menu-data";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";
import UserTrack from "./UserTrack";
import { useStore } from "@/store/store";

const SideNav = () => {
  const path = usePathname();
  const user = useStore((state) => state.user);


  return (
    <div className="h-screen relative p-5 shadow-sm border bg-white">
      <div className="flex justify-center">
        <img src={"/logo.png"} alt="logo" width={120} height={100} />
      </div>
      <hr className="my-6 border" />
      <div className="mt-3">
        {MenuList?.map((menu, index) => {
          return (
            <Link href={`${menu.path}`} key={menu.path}>
              <div
                className={`text-black flex gap-2 mb-2 p-3 hover:bg-primary hover:text-white rounded-lg cursor-pointer ${
                  path === menu.path && "bg-primary text-white"
                }`}
                key={index}
              >
                <menu.icon className="w-6 h-6" />
                <h2 className="text-lg">{menu.name}</h2>
              </div>
            </Link>
          );
        })}
      </div>
      {!user?.active && (
        <div className="absolute bottom-10 left-0 w-full">
          <UserTrack />
        </div>
      )}
    </div>
  );
};

export default SideNav;
