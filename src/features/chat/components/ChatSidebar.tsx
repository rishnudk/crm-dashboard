"use client";

import { useState, useRef } from "react";
import { Search, ChevronRight, Plus, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChatCategory, Conversation } from "../types";

interface ChatSidebarProps {
  conversations: Conversation[];
  selectedChatId: string | null;
  onSelectChat: (chat: Conversation) => void;
  onOpenNewChat: () => void;
  className?: string;
}

const categories: ChatCategory[] = ["All", "Inquiring", "Ongoing", "Resolved", "Broadcast"];

export function ChatSidebar({
  conversations,
  selectedChatId,
  onSelectChat,
  onOpenNewChat,
  className,
}: ChatSidebarProps) {
  const [activeCategory, setActiveCategory] = useState<ChatCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 100, behavior: "smooth" });
    }
  };

  const filteredConversations = conversations.filter((conv) => {
    const matchesCategory =
      activeCategory === "All" || conv.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch =
      conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={cn("w-full md:w-[360px] lg:w-[380px] shrink-0 border-r border-border flex flex-col bg-card/60 backdrop-blur-sm h-full", className)}>
      {/* Top Header: Title & New Chat button */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <h2 className="text-xl font-bold tracking-tight text-foreground">Inbox</h2>
        <button
          onClick={onOpenNewChat}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#ff8f3d]/70 text-[#ff6d00] hover:bg-orange-500/10 active:scale-95 text-xs font-semibold transition-all duration-200 shadow-xs"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>New chat</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="px-5 py-2 flex items-center gap-2">
        {/* Filter funnel icon button */}
        <button
          title="Filter conversations"
          className="h-10 w-10 shrink-0 rounded-lg border border-[#ff8f3d]/70 text-[#ff6d00] hover:bg-orange-500/10 flex items-center justify-center transition-colors"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current"
          >
            <path
              d="M2.5 4H13.5M4.5 8H11.5M6.5 12H9.5"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Search input */}
        <div className="relative flex-1 flex items-center rounded-lg border border-input bg-background/80 px-3 h-10 transition-colors focus-within:ring-1 focus-within:ring-ring focus-within:border-ring">
          <Search className="h-4 w-4 text-muted-foreground shrink-0 mr-2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="w-full bg-transparent text-sm placeholder:text-muted-foreground outline-none text-foreground"
          />
        </div>
      </div>

      {/* Filter Category Pills */}
      <div className="relative px-5 py-2 flex items-center gap-1.5 border-b border-border/50">
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-2 overflow-x-auto scroll-smooth py-1 pr-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-all",
                  isActive
                    ? "bg-[#ff6d00]/15 text-[#ff6d00] font-semibold border border-transparent shadow-2xs"
                    : "border border-border/80 text-muted-foreground hover:text-foreground hover:border-foreground/30"
                )}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Scroll right arrow */}
        <button
          onClick={scrollRight}
          className="absolute right-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-card/80 backdrop-blur-xs flex items-center justify-center text-[#ff6d00] hover:bg-muted transition-colors"
          title="Scroll tags"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Chat List / Empty State */}
      <div className="flex-1 overflow-y-auto min-h-[360px]">
        {filteredConversations.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center p-6 text-center">
            {/* Empty state icon box */}
            <div className="h-14 w-14 rounded-2xl bg-muted/70 dark:bg-muted/40 flex items-center justify-center text-muted-foreground/60 mb-3 shadow-2xs">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                <path d="M8 12h.01" />
                <path d="M12 12h.01" />
                <path d="M16 12h.01" />
              </svg>
            </div>

            <h3 className="font-semibold text-sm text-foreground">
              No conversations yet
            </h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-[220px] leading-relaxed">
              Your conversations will appear here once you start chatting with customers.
            </p>

            {/* + Add A Contact To Chat button */}
            <button
              onClick={onOpenNewChat}
              className="mt-5 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#ff8f3d]/80 text-[#ff6d00] hover:bg-orange-500/10 active:scale-95 text-xs font-semibold transition-all duration-200 shadow-xs"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add A Contact To Chat</span>
            </button>
          </div>
        ) : (
          <div className="divide-y divide-border/40">
            {filteredConversations.map((conv) => {
              const isSelected = selectedChatId === conv.id;
              const initials = conv.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();

              return (
                <div
                  key={conv.id}
                  onClick={() => onSelectChat(conv)}
                  className={cn(
                    "flex items-start gap-3 p-4 cursor-pointer transition-colors relative",
                    isSelected
                      ? "bg-[#ff6d00]/10 border-l-4 border-l-[#ff6d00]"
                      : "hover:bg-muted/40"
                  )}
                >
                  <Avatar className="h-10 w-10 shrink-0 bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-300 font-semibold border border-orange-200 dark:border-orange-800">
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-medium text-sm text-foreground truncate">
                        {conv.name}
                      </span>
                      <span className="text-[11px] text-muted-foreground shrink-0">
                        {conv.lastMessageTime}
                      </span>
                    </div>

                    <p className="text-xs text-muted-foreground truncate mt-1">
                      {conv.lastMessage}
                    </p>

                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                        {conv.category}
                      </span>
                      {conv.unreadCount > 0 && (
                        <span className="ml-auto bg-[#ff6d00] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                          {conv.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
