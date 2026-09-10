"use client";

import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggle } from "./ThemeToggle";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

export function Navbar() {
  const pathname = usePathname();
  const [greeting, setGreeting] = useState("Good Evening, rishnu dk! 🌇");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning, rishnu dk! 🌅");
    else if (hour < 17) setGreeting("Good Afternoon, rishnu dk! ☀️");
    else setGreeting("Good Evening, rishnu dk! 🌇");
  }, []);

  const title =
    pathname === "/customers"
      ? "Customers"
      : greeting;

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 pl-14 pr-4 md:px-6 backdrop-blur">
      <h1 className="text-xl font-semibold tracking-tight text-foreground">{title}</h1>

      <div className="flex items-center gap-4">
        {/* Search icon */}
        <button
          className="h-9 w-9 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          title="Search"
        >
          <Search className="h-4 w-4" />
        </button>

        {/* Light/Dark Mode Switcher */}
        <ThemeToggle />

        {/* User Profile */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-border">
          <div className="relative">
            <Avatar className="h-8 w-8 bg-[#e11d48] text-white font-medium text-xs">
              <AvatarFallback className="bg-[#e11d48] text-white">RD</AvatarFallback>
            </Avatar>
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-background" />
          </div>
          <div className="hidden md:block text-sm">
            <p className="font-medium leading-none text-foreground">rishnu dk</p>
          </div>
        </div>
      </div>
    </header>
  );
}

