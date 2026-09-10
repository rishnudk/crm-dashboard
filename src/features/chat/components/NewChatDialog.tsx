"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { initialCustomers } from "@/data/customers";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, UserPlus } from "lucide-react";
import { Conversation } from "../types";

interface NewChatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStartChat: (conversation: Conversation) => void;
}

export function NewChatDialog({ open, onOpenChange, onStartChat }: NewChatDialogProps) {
  const [search, setSearch] = useState("");

  const filteredCustomers = initialCustomers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  );

  const handleSelectCustomer = (customer: (typeof initialCustomers)[0]) => {
    const newConv: Conversation = {
      id: `chat-${customer.id}-${Date.now()}`,
      customerId: customer.id,
      name: customer.name,
      phone: customer.phone,
      category: "Inquiring",
      lastMessage: "Conversation started",
      lastMessageTime: "Just now",
      unreadCount: 0,
      messages: [
        {
          id: `msg-${Date.now()}`,
          sender: "user",
          text: `Hi ${customer.name}, thanks for contacting us! How can we assist you today?`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ],
    };

    onStartChat(newConv);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-[#ff6d00]" />
            Start New Chat
          </DialogTitle>
          <DialogDescription>
            Select a contact from your CRM to begin a conversation.
          </DialogDescription>
        </DialogHeader>

        <div className="relative my-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search contacts by name or phone..."
            className="pl-9 h-10"
          />
        </div>

        <div className="max-h-72 overflow-y-auto divide-y divide-border border rounded-lg">
          {filteredCustomers.length === 0 ? (
            <div className="py-8 text-center text-sm text-muted-foreground">
              No contacts found
            </div>
          ) : (
            filteredCustomers.slice(0, 15).map((customer) => {
              const initials = customer.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();

              return (
                <button
                  key={customer.id}
                  onClick={() => handleSelectCustomer(customer)}
                  className="w-full flex items-center gap-3 p-3 text-left hover:bg-muted/50 transition-colors"
                >
                  <Avatar className="h-9 w-9 bg-orange-100 text-orange-600 font-semibold text-xs border border-orange-200 dark:bg-orange-950 dark:border-orange-800 dark:text-orange-300">
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{customer.name}</div>
                    <div className="text-xs text-muted-foreground truncate">
                      {customer.company} • {customer.phone}
                    </div>
                  </div>
                  <span className="text-xs font-medium text-[#ff6d00] bg-orange-50 dark:bg-orange-950/40 px-2 py-1 rounded border border-orange-200 dark:border-orange-900">
                    Chat
                  </span>
                </button>
              );
            })
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
