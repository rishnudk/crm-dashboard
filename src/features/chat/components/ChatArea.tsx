"use client";

import { useState } from "react";
import { Send, Phone, User, CheckCheck, Paperclip, Smile, ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Conversation, ChatMessage } from "../types";

interface ChatAreaProps {
  conversation: Conversation | null;
  onSendMessage: (conversationId: string, text: string) => void;
  onBack?: () => void;
}

export function ChatArea({ conversation, onSendMessage, onBack }: ChatAreaProps) {
  const [inputText, setInputText] = useState("");

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || !conversation) return;
    onSendMessage(conversation.id, inputText.trim());
    setInputText("");
  };

  return (
    <div className="flex-1 flex flex-col h-full relative overflow-hidden bg-background">
      {/* Subtle Doodle Pattern Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] dark:opacity-[0.025]"
        style={{
          backgroundImage: `radial-gradient(#ff6d00 1.2px, transparent 1.2px), radial-gradient(#ff6d00 1.2px, #fafafa 1.2px)`,
          backgroundSize: "32px 32px",
          backgroundPosition: "0 0, 16px 16px",
        }}
      />

      {/* SVG Doodle Vector Overlay */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.06] dark:opacity-[0.035]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="crm-doodle" width="160" height="160" patternUnits="userSpaceOnUse">
            {/* Chat Bubble Doodle */}
            <path
              d="M20 30 C 20 20, 50 20, 50 30 C 50 40, 35 40, 30 45 L 28 40 C 22 40, 20 36, 20 30 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            {/* Heart */}
            <path
              d="M100 30 C 95 20, 85 25, 90 35 L 100 45 L 110 35 C 115 25, 105 20, 100 30 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            {/* Star */}
            <polygon
              points="30,110 33,118 42,118 35,123 37,131 30,126 23,131 25,123 18,118 27,118"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            {/* Coffee cup */}
            <path
              d="M110 110 L 110 125 C 110 130, 130 130, 130 125 L 130 110 Z M 130 115 C 135 115, 135 122, 130 122"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            {/* Checkmark in circle */}
            <circle cx="70" cy="80" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M66 80 L 69 83 L 75 77" fill="none" stroke="currentColor" strokeWidth="1.5" />
            {/* Speech lines */}
            <line x1="26" y1="28" x2="44" y2="28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="26" y1="33" x2="38" y2="33" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#crm-doodle)" />
      </svg>

      {!conversation ? (
        /* Welcome / Empty State Screen (Matches Screenshot) */
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center z-10">
          {/* Orange rounded square icon container */}
          <div className="h-20 w-20 rounded-2xl bg-orange-100 dark:bg-orange-950/40 border border-orange-200/70 dark:border-orange-800/40 flex items-center justify-center text-[#ff6d00] shadow-sm mb-4">
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#ff6d00]"
            >
              <rect
                x="3"
                y="3"
                width="15"
                height="13"
                rx="3"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 16L7 19V16H4"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 8H18C19.1046 8 20 8.89543 20 10V16C20 17.1046 19.1046 18 18 18H17V20L14 18"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Welcome To Your Inbox
          </h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-md leading-relaxed">
            Start conversations with your customers. All your chats will appear here once you begin engaging with them.
          </p>
        </div>
      ) : (
        /* Active Conversation Screen */
        <div className="flex-1 flex flex-col h-full z-10">
          {/* Chat Header */}
          <div className="h-16 border-b border-border/80 px-4 md:px-6 flex items-center justify-between bg-card/80 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              {onBack && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden h-8 w-8 -ml-1 text-muted-foreground"
                  onClick={onBack}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              <Avatar className="h-10 w-10 bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-300 font-semibold border border-orange-200 dark:border-orange-800">
                <AvatarFallback>
                  {conversation.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm text-foreground">
                    {conversation.name}
                  </h3>
                  <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-300">
                    {conversation.category}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {conversation.phone || "Active Customer"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-foreground border-border"
              >
                <Phone className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Call</span>
              </Button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
            <div className="text-center my-2">
              <span className="text-[11px] font-medium bg-muted/60 text-muted-foreground px-3 py-1 rounded-full border border-border/40">
                Beginning of message history
              </span>
            </div>

            {conversation.messages.map((msg) => {
              const isUser = msg.sender === "user";
              return (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2 ${
                    isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  {!isUser && (
                    <Avatar className="h-7 w-7 text-[10px] shrink-0 bg-muted">
                      <AvatarFallback>
                        {conversation.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm shadow-xs ${
                      isUser
                        ? "bg-[#ff6d00] text-white rounded-br-xs"
                        : "bg-card border border-border text-card-foreground rounded-bl-xs"
                    }`}
                  >
                    <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    <div
                      className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${
                        isUser ? "text-orange-100" : "text-muted-foreground"
                      }`}
                    >
                      <span>{msg.timestamp}</span>
                      {isUser && <CheckCheck className="h-3 w-3" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Message Input Footer */}
          <form
            onSubmit={handleSend}
            className="p-3 md:p-4 border-t border-border/80 bg-card/80 backdrop-blur-sm flex items-center gap-2"
          >
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-muted-foreground hover:text-foreground shrink-0"
              title="Attach file"
            >
              <Paperclip className="h-4 w-4" />
            </Button>

            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 h-10 bg-background/90"
            />

            <Button
              type="submit"
              disabled={!inputText.trim()}
              className="h-10 px-4 bg-[#ff6d00] hover:bg-[#ff6d00]/90 text-white font-medium gap-1.5 shadow-sm"
            >
              <Send className="h-4 w-4" />
              <span className="hidden sm:inline">Send</span>
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
