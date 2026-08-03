"use client";

import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const pathname = usePathname();
  const title = pathname === "/customers" ? "Customers" : "Dashboard";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 pl-14 pr-4 md:px-6 backdrop-blur">
      <h1 className="text-xl font-semibold tracking-tight">{title}</h1>

      <div className="flex items-center gap-3">
        {/* Light/Dark Mode Switcher */}
        <ThemeToggle />

        <div className="flex items-center gap-3 pl-2 border-l">
          <Avatar className="h-9 w-9">
            <AvatarImage src="https://github.com/shadcn.png" alt="Admin" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div className="hidden md:block text-sm">
            <p className="font-medium leading-none">Admin User</p>
            <p className="text-xs text-muted-foreground">admin@nexuscrm.com</p>
          </div>
        </div>
      </div>
    </header>
  );
}
