import { FileClock, Home, SettingsIcon, WalletCards } from "lucide-react";

export const MenuList = [
    {
        name:"Home",
        icon:Home,
        path:"/dashboard"
    },
    {
        name:"History",
        icon:FileClock,
        path:"/dashboard/history"
    },
    {
        name:"Billing",
        icon:WalletCards,
        path:"/dashboard/billing"
    },
    // {
    //     name:"Setting",
    //     icon:SettingsIcon,
    //     path:"/dashboard/setting"
    // },
];
