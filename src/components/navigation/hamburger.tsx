"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);

  return (
    <section className="flex flex-col md:hidden">
      <DropdownMenu onOpenChange={() => setOpen((prev) => !prev)}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-6 w-6 p-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={open ? "block h-8 w-8" : "hidden"}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={open ? "hidden" : "block h-8 w-8"}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem asChild>
            <Link href="/view-forms" className="flex hover:underline">
              My Forms
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link className="hover:underline" href={"/results"}>
              Results
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link className="hover:underline" href={"/analytics"}>
              Analytics
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link className="hover:underline" href={"/charts"}>
              Charts
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link className="hover:underline" href={"/settings"}>
              Settings
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  );
}
