"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MessageSquare,
  MoreVertical,
  Building2,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  Pencil,
  Trash2,
  Eye,
} from "lucide-react";
import { Contact } from "../types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ContactGridProps {
  contacts: Contact[];
  onView: (contact: Contact) => void;
  onEdit: (contact: Contact) => void;
  onDelete: (contact: Contact) => void;
}

export function ContactGrid({ contacts, onView, onEdit, onDelete }: ContactGridProps) {
  const router = useRouter();

  const handleQuickChat = (contact: Contact, e: React.MouseEvent) => {
    e.stopPropagation();
    toast.info(`Opening chat with ${contact.name}...`);
    router.push(
      `/chat-inbox?contactId=${contact.id}&name=${encodeURIComponent(
        contact.name
      )}&phone=${encodeURIComponent(contact.phone)}`
    );
  };

  const getStatusBadge = (status: Contact["status"]) => {
    switch (status) {
      case "Customer":
        return <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/25 text-[11px]">Customer</Badge>;
      case "Active":
        return <Badge className="bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/25 text-[11px]">Active</Badge>;
      case "Lead":
        return <Badge className="bg-orange-500/15 text-[#ff6d00] border-orange-500/25 text-[11px]">Lead</Badge>;
      case "Prospect":
        return <Badge className="bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/25 text-[11px]">Prospect</Badge>;
      default:
        return <Badge variant="secondary" className="text-[11px]">{status}</Badge>;
    }
  };

  if (contacts.length === 0) {
    return (
      <div className="rounded-xl border border-border/80 bg-card p-12 text-center">
        <p className="text-base font-medium text-foreground">No contacts found</p>
        <p className="text-xs text-muted-foreground mt-1">Try adjusting your search filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {contacts.map((contact) => {
        const initials = contact.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .slice(0, 2)
          .toUpperCase();

        return (
          <div
            key={contact.id}
            onClick={() => onView(contact)}
            className="group rounded-xl border border-border/80 bg-card p-5 shadow-2xs hover:border-[#ff6d00]/50 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              {/* Card Header: Avatar, Name, Status, Menu */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Avatar
                    className="h-11 w-11 text-white font-semibold text-xs border border-border shrink-0 shadow-2xs"
                    style={{ backgroundColor: contact.avatarColor || "#ff6d00" }}
                  >
                    <AvatarFallback style={{ backgroundColor: contact.avatarColor || "#ff6d00" }} className="text-white">
                      {initials}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-semibold text-sm text-foreground group-hover:text-[#ff6d00] transition-colors truncate">
                        {contact.name}
                      </h4>
                      {contact.whatsappVerified && (
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 fill-emerald-500/20" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{contact.designation}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                  {getStatusBadge(contact.status)}
                  <DropdownMenu>
                    <DropdownMenuTrigger className="h-7 w-7 inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                      <MoreVertical className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem onClick={() => onView(contact)} className="gap-2 cursor-pointer">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                        <span>Details</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(contact)} className="gap-2 cursor-pointer">
                        <Pencil className="h-4 w-4 text-muted-foreground" />
                        <span>Edit</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => onDelete(contact)}
                        className="gap-2 cursor-pointer text-destructive focus:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Company & City */}
              <div className="mt-4 space-y-1.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Building2 className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  <span className="truncate font-medium text-foreground">{contact.company}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  <span className="truncate">
                    {contact.city}, {contact.state}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  <span className="font-mono text-foreground font-medium">{contact.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  <span className="truncate">{contact.email}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="mt-3 flex flex-wrap gap-1">
                {contact.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-muted text-muted-foreground font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer: Pipeline Deal Value & WhatsApp Action */}
            <div className="mt-4 pt-3 border-t border-border/70 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground block">
                  Pipeline
                </span>
                <span className="text-xs font-bold text-foreground">{contact.dealValue}</span>
              </div>

              <Button
                size="sm"
                variant="outline"
                className="h-8 gap-1.5 text-xs border-emerald-500/30 text-emerald-600 hover:bg-emerald-500/10 hover:text-emerald-700"
                onClick={(e) => handleQuickChat(contact, e)}
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>Chat</span>
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
