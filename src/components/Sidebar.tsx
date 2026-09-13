"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ChevronLeft,
  ChevronRight,
  Menu,
  MessagesSquare,
  Contact,
  Megaphone,
  Workflow,
  Bot,
  FolderArchive,
  Settings,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Customers", href: "/customers", icon: Users },
  { label: "Chat Inbox", href: "/chat-inbox", icon: MessagesSquare },
  { label: "Contacts", href: "/contacts", icon: Contact },
  { label: "Campaigns", href: "/campaigns", icon: Megaphone },
  { label: "Flows", href: "/flows", icon: Workflow },
  { label: "Bot", href: "/bot", icon: Bot },
  { label: "Conversation Assets", href: "/conversation-assets", icon: FolderArchive },
  { label: "Settings", href: "/settings", icon: Settings },
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
              "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              isActive
                ? "bg-orange-50 text-foreground font-medium dark:bg-orange-500/15 dark:text-foreground"
                : "text-sidebar-foreground/70"
            )}
          >
            <Icon
              className={cn(
                "h-5 w-5 shrink-0 transition-colors",
                isActive
                  ? "text-[#ff6d00]"
                  : "text-sidebar-foreground/70 group-hover:text-[#ff6d00]"
              )}
              style={isActive ? { color: "#ff6d00" } : undefined}
            />
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
              <SheetTitle className="flex items-center py-2">
                <Image
                  src="/logo.png"
                  alt="Transket"
                  width={160}
                  height={35}
                  className="h-8 w-auto object-contain dark:hidden"
                  priority
                />
                <Image
                  src="/logo-dark.png"
                  alt="Transket"
                  width={160}
                  height={35}
                  className="h-8 w-auto object-contain hidden dark:block"
                  priority
                />
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
          {!collapsed ? (
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Transket"
                width={160}
                height={35}
                className="h-8 w-auto max-w-[170px] object-contain dark:hidden"
                priority
              />
              <Image
                src="/logo-dark.png"
                alt="Transket"
                width={160}
                height={35}
                className="h-8 w-auto max-w-[170px] object-contain hidden dark:block"
                priority
              />
            </Link>
          ) : (
            <Link
              href="/"
              className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl transition-transform hover:scale-105"
              title="Transket"
            >
              <Image
                src="/logo-icon.png"
                alt="Transket"
                width={36}
                height={36}
                className="h-8 w-8 object-contain rounded-lg shadow-sm"
                priority
              />
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
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
