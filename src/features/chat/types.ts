export type ChatCategory = "All" | "Inquiring" | "Ongoing" | "Resolved" | "Broadcast";

export interface ChatMessage {
  id: string;
  sender: "user" | "customer";
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  customerId?: string;
  name: string;
  avatar?: string;
  phone?: string;
  category: "Inquiring" | "Ongoing" | "Resolved" | "Broadcast";
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: ChatMessage[];
}
