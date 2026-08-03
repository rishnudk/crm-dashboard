"use client";

import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Navbar() {
  const pathname = usePathname();
  const title = pathname === "/customers" ? "Customers" : "Dashboard";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 px-6 backdrop-blur">
      <h1 className="text-xl font-semibold tracking-tight">{title}</h1>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
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
