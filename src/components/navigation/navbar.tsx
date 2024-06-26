"use client";

import { SidebarNavItem } from "@/types/nav-types";
import { usePathname } from "next/navigation";
import React from "react";
import { Icons } from "../icons";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface DashboardNavProps {
  items: SidebarNavItem[];
}
const DashboardNav = ({ items }: DashboardNavProps) => {
  const path = usePathname();

  if (!items?.length) return null;

  return (
    <div>
      {items.map((item, index) => {
        const Icon = Icons[item?.icon || "list"];
        const isActive = path === item.href;

        return (
          <Link key={index} href={item.disabled ? "/" : item.href}>
            <span
              className={cn(
                "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                isActive ? "bg-accent" : "transparent",
                item.disabled
                  ? "cursor-not-allowed opacity-80"
                  : "cursor-pointer"
              )}
            >
              <Icon className="w-4 h-4 mr-2" />
              {item.title}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default DashboardNav;
