"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  Phone, 
  PhoneCall,
  Megaphone,
  CreditCard
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard
  },
  {
    name: "Agents",
    href: "/agents",
    icon: Users
  },
  {
    name: "Calls",
    href: "/calls",
    icon: PhoneCall
  },
  {
    name: "Phone Numbers",
    href: "/phone-numbers",
    icon: Phone
  },
  {
    name: "Campaigns",
    href: "/campaigns",
    icon: Megaphone
  },
  {
    name: "Billing",
    href: "/billing",
    icon: CreditCard
  }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-64 bg-[#0F172A] min-h-screen p-4">
      <div className="flex items-center gap-2 px-2 mb-8">
        <div className="text-2xl font-bold text-white">VoAgents</div>
        <div className="w-6 h-6 bg-purple-600 rounded-sm"></div>
      </div>
      
      <nav className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                pathname === item.href 
                  ? "bg-purple-600 text-white" 
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}