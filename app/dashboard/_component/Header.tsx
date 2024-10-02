import { useStore } from "@/store/store";
import { Cookie, Cross, CrossIcon, Search, X } from "lucide-react";
import Link from "next/link";
import Cookies from "js-cookie"; // Import js-cookie

import React, { useEffect, useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { LOGOUT, USER_PROFILE } from "@/data/constant";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import SideNav from "./SideNav";
import { isTokenExpired } from "../layout";
const Header = () => {
  const token = Cookies.get("token");
   
  const router = useRouter();
  const user = useStore((state) => state.user);
  const twoLetter = user?.username?.substring(0, 2)?.toUpperCase();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (event: any) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setSidebarOpen(false);
    }
  };

  useEffect(() => {

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const signOut = async () => {
    if (isTokenExpired(token)) {
      router.push("/signin");
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}${LOGOUT}`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        Cookies.remove("token");
        toast.success("Logout Successfully");
        router.push("/signin");
      }
    } catch (err) {
      console.log("Logout error", err);
    }
  };

  return (
    <div className="p-4 shadow-md border-b-2 flex justify-between items-center bg-white">
      <div className="md:hidden flex gap-2 items-center p-2  rounded-md mx-w-lg bg-white ">
        {/* <Search/>
        <input type="text" placeholder='Search...' className='outline-none' /> */}
        <button
          onClick={toggleSidebar}
          data-drawer-target="sidebar-multi-level-sidebar"
          data-drawer-toggle="sidebar-multi-level-sidebar"
          aria-controls="sidebar-multi-level-sidebar"
          type="button"
          className="inline-flex items-center  ms-3 text-sm text-primary rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <svg
            className="w-10 h-10"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clip-rule="evenodd"
              fill-rule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>

        <aside
          id="sidebar-multi-level-sidebar"
          ref={sidebarRef}
          className={`fixed top-0 left-0 z-40 w-70 h-screen bg-gray-800 transition-transform flex ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          aria-label="Sidebar"
        >
          <div className="relative w-64">
            <SideNav />
            {isSidebarOpen && (
              <button
                onClick={() => setSidebarOpen(false)}
                className=" text-3xl absolute top-6 right-[-50px]"
              >
                <X size={48} className="text-black" />
                {/* Close button */}
              </button>
            )}
          </div>
        </aside>
      </div>
      <div className="md:flex gap-2 items-center p-2  rounded-md mx-w-lg bg-white hidden"></div>
      <div className="flex gap-5 mx-5 items-center">
        {!user?.active && (
          <Link href={"/dashboard/billing"}>
            <h2 className="bg-primary p-1 rounded-full text-xs text-white">
              Join Membership just for $9/Month
            </h2>
          </Link>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger className="bg-green-700 border border-green-700 w-10 h-10 rounded-full text-white">
            {twoLetter}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="left-[-20px]">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>{user.username}</DropdownMenuItem>
            <DropdownMenuItem>{user.email}</DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => signOut()}
            >
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;
