"use client";

import { useState } from "react";
import { ChatSidebar } from "@/features/chat/components/ChatSidebar";
import { ChatArea } from "@/features/chat/components/ChatArea";
import { NewChatDialog } from "@/features/chat/components/NewChatDialog";
import { Conversation } from "@/features/chat/types";
import { cn } from "@/lib/utils";
import { BarChart3, MessageSquare, TrendingUp, Users } from "lucide-react";

export default function ChatInboxPage() {
  const [activeTab, setActiveTab] = useState<"inbox" | "analytics">("inbox");
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [newChatDialogOpen, setNewChatDialogOpen] = useState(false);

  const selectedConversation =
    conversations.find((c) => c.id === selectedChatId) || null;

  const handleStartChat = (newConv: Conversation) => {
    setConversations((prev) => [newConv, ...prev]);
    setSelectedChatId(newConv.id);
  };

  const handleSendMessage = (conversationId: string, text: string) => {
    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: "user" as const,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === conversationId) {
          return {
            ...c,
            lastMessage: text,
            lastMessageTime: "Just now",
            messages: [...c.messages, newMsg],
          };
        }
        return c;
      })
    );
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6.5rem)] w-full">
      {/* Outer Card Container */}
      <div className="flex-1 flex flex-col rounded-2xl border border-border bg-card shadow-xs overflow-hidden">
        {/* Top Tab Bar: Inbox & Analytics */}
        <div className="flex items-center gap-6 px-6 pt-3 border-b border-border/80 bg-muted/20">
          <button
            onClick={() => setActiveTab("inbox")}
            className={cn(
              "relative pb-3 text-sm font-medium transition-colors",
              activeTab === "inbox"
                ? "text-[#ff6d00] font-semibold"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Inbox
            {activeTab === "inbox" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff6d00] rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab("analytics")}
            className={cn(
              "relative pb-3 text-sm font-medium transition-colors",
              activeTab === "analytics"
                ? "text-[#ff6d00] font-semibold"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Analytics
            {activeTab === "analytics" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff6d00] rounded-full" />
            )}
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "inbox" ? (
          <div className="flex-1 flex overflow-hidden">
            {/* Left Chat Inbox Sidebar */}
            <ChatSidebar
              conversations={conversations}
              selectedChatId={selectedChatId}
              onSelectChat={(chat) => setSelectedChatId(chat.id)}
              onOpenNewChat={() => setNewChatDialogOpen(true)}
              className={cn(selectedConversation ? "hidden md:flex" : "flex")}
            />

            {/* Right Chat Main Area */}
            <div
              className={cn(
                "flex-1 h-full",
                !selectedConversation ? "hidden md:flex" : "flex"
              )}
            >
              <ChatArea
                conversation={selectedConversation}
                onSendMessage={handleSendMessage}
                onBack={() => setSelectedChatId(null)}
              />
            </div>
          </div>
        ) : (
          /* Analytics Tab */
          <div className="p-6 md:p-8 space-y-6 overflow-y-auto">
            <h3 className="text-lg font-semibold text-foreground">Inbox Analytics</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-xl border border-border bg-card shadow-2xs">
                <div className="flex items-center justify-between text-muted-foreground mb-2">
                  <span className="text-xs font-medium">Total Conversations</span>
                  <MessageSquare className="h-4 w-4 text-[#ff6d00]" />
                </div>
                <div className="text-2xl font-bold">{conversations.length}</div>
                <p className="text-xs text-muted-foreground mt-1">+12% from last week</p>
              </div>

              <div className="p-5 rounded-xl border border-border bg-card shadow-2xs">
                <div className="flex items-center justify-between text-muted-foreground mb-2">
                  <span className="text-xs font-medium">Avg. Response Time</span>
                  <TrendingUp className="h-4 w-4 text-emerald-500" />
                </div>
                <div className="text-2xl font-bold">1m 42s</div>
                <p className="text-xs text-muted-foreground mt-1">98% within target</p>
              </div>

              <div className="p-5 rounded-xl border border-border bg-card shadow-2xs">
                <div className="flex items-center justify-between text-muted-foreground mb-2">
                  <span className="text-xs font-medium">Active Contacts</span>
                  <Users className="h-4 w-4 text-blue-500" />
                </div>
                <div className="text-2xl font-bold">60</div>
                <p className="text-xs text-muted-foreground mt-1">CRM integrated</p>
              </div>

              <div className="p-5 rounded-xl border border-border bg-card shadow-2xs">
                <div className="flex items-center justify-between text-muted-foreground mb-2">
                  <span className="text-xs font-medium">Resolution Rate</span>
                  <BarChart3 className="h-4 w-4 text-purple-500" />
                </div>
                <div className="text-2xl font-bold">94.8%</div>
                <p className="text-xs text-muted-foreground mt-1">+3.2% this month</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* New Chat Contact Selector Dialog */}
      <NewChatDialog
        open={newChatDialogOpen}
        onOpenChange={setNewChatDialogOpen}
        onStartChat={handleStartChat}
      />
    </div>
  );
}
