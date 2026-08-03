"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, ChevronLeft, ChevronRight, Building2, Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Customers", href: "/customers", icon: Users },
];

interface NavLinksProps {
  pathname: string;
  collapsed?: boolean;
  mobileOpen?: boolean;
  onClick?: () => void;
}

function NavLinks({ pathname, collapsed, mobileOpen, onClick }: NavLinksProps) {
  return (
    <nav className="mt-6 flex flex-col gap-1">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClick}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              isActive
                ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 hover:text-sidebar-primary-foreground"
                : "text-sidebar-foreground/70"
            )}
          >
            <Icon className="h-5 w-5 shrink-0" />
            {(!collapsed || mobileOpen) && <span>{item.label}</span>}
          </Link>
        );
      })}
    </nav>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Drawer */}
      <div className="md:hidden fixed top-3 left-4 z-40">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger className="inline-flex h-9 w-9 items-center justify-center rounded-md border bg-background text-foreground shadow-sm hover:bg-accent">
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-4">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2 font-bold text-lg">
                <Building2 className="h-6 w-6 text-primary" /> NexusCRM
              </SheetTitle>
            </SheetHeader>
            <NavLinks pathname={pathname} mobileOpen={mobileOpen} onClick={() => setMobileOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden md:flex relative flex-col border-r bg-sidebar p-4 transition-all duration-300 min-h-screen text-sidebar-foreground",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex items-center justify-between gap-2 px-2 py-4">
          {!collapsed && (
            <div className="flex items-center gap-2 font-bold text-lg">
              <Building2 className="h-6 w-6 text-primary" />
              <span>NexusCRM</span>
            </div>
          )}
          {collapsed && <Building2 className="h-6 w-6 text-primary mx-auto" />}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        <NavLinks pathname={pathname} collapsed={collapsed} />
      </aside>
    </>
  );
}
