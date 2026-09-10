"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  Calendar,
  IndianRupee,
  MessageSquare,
  Pencil,
  Trash2,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";
import { Contact } from "../types";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ContactDetailDrawerProps {
  contact: Contact | null;
  open: boolean;
  onClose: () => void;
  onEdit: (contact: Contact) => void;
  onDelete: (contact: Contact) => void;
}

export function ContactDetailDrawer({
  contact,
  open,
  onClose,
  onEdit,
  onDelete,
}: ContactDetailDrawerProps) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  if (!contact) return null;

  const initials = contact.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(contact.phone);
    setCopied(true);
    toast.success("Phone copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenChat = () => {
    onClose();
    router.push(
      `/chat-inbox?contactId=${contact.id}&name=${encodeURIComponent(
        contact.name
      )}&phone=${encodeURIComponent(contact.phone)}`
    );
  };

  return (
    <Sheet open={open} onOpenChange={(val) => !val && onClose()}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto p-0 flex flex-col justify-between">
        <div>
          {/* Header Banner */}
          <div className="h-28 bg-gradient-to-r from-orange-500/20 via-pink-500/15 to-purple-500/20 relative p-6 flex items-end">
            <Avatar
              className="h-16 w-16 text-white font-bold text-base border-4 border-background absolute -bottom-8 left-6 shadow-md"
              style={{ backgroundColor: contact.avatarColor || "#ff6d00" }}
            >
              <AvatarFallback style={{ backgroundColor: contact.avatarColor || "#ff6d00" }} className="text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Profile Basic Info */}
          <div className="px-6 pt-10 pb-4 border-b border-border/80">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xl font-bold text-foreground">{contact.name}</h3>
                  {contact.whatsappVerified && (
                    <span title="Verified WhatsApp Number">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 fill-emerald-500/20" />
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground font-medium">{contact.designation}</p>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                  <Building2 className="h-3.5 w-3.5" />
                  <span>{contact.company}</span>
                </div>
              </div>

              <Badge
                className={
                  contact.status === "Customer"
                    ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                    : contact.status === "Active"
                    ? "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/20"
                    : contact.status === "Lead"
                    ? "bg-orange-500/15 text-[#ff6d00] border-orange-500/20"
                    : "bg-muted text-muted-foreground"
                }
              >
                {contact.status}
              </Badge>
            </div>

            {/* Quick WhatsApp Action Button */}
            <div className="mt-4 flex items-center gap-2">
              <Button
                onClick={handleOpenChat}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white gap-2 font-medium"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Start WhatsApp Chat</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => window.open(`tel:${contact.phone}`, "_self")}
                title="Call phone"
              >
                <Phone className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-6 space-y-6">
            {/* Contact Details Card */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Contact Information
              </h4>
              <div className="rounded-xl border border-border/80 bg-muted/20 p-4 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>Phone</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono font-medium text-foreground">
                    <span>{contact.phone}</span>
                    <button
                      onClick={handleCopyPhone}
                      className="p-1 hover:text-[#ff6d00] transition-colors"
                      title="Copy"
                    >
                      {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>Email</span>
                  </div>
                  <span className="font-medium text-foreground truncate max-w-[200px]">
                    {contact.email}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>Location</span>
                  </div>
                  <span className="font-medium text-foreground">
                    {contact.city}, {contact.state}
                  </span>
                </div>
              </div>
            </div>

            {/* Deal & Pipeline Info */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Commercials & Value
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl border border-border/80 bg-muted/20">
                  <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                    <IndianRupee className="h-3 w-3 text-amber-500" /> Deal Value
                  </span>
                  <div className="text-lg font-bold text-foreground mt-1">{contact.dealValue}</div>
                </div>
                <div className="p-3.5 rounded-xl border border-border/80 bg-muted/20">
                  <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-blue-500" /> Last Activity
                  </span>
                  <div className="text-xs font-semibold text-foreground mt-1">
                    {new Date(contact.lastContact).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Tags & Segments
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {contact.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Notes */}
            {contact.notes && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Account Notes
                </h4>
                <div className="p-3.5 rounded-xl border border-border/80 bg-muted/30 text-xs text-muted-foreground leading-relaxed">
                  {contact.notes}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-border/80 bg-background/95 flex items-center justify-between gap-3">
          <Button
            variant="destructive"
            size="sm"
            onClick={() => {
              onClose();
              onDelete(contact);
            }}
            className="gap-1.5"
          >
            <Trash2 className="h-4 w-4" />
            <span>Delete</span>
          </Button>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
            <Button
              size="sm"
              onClick={() => {
                onClose();
                onEdit(contact);
              }}
              className="bg-[#ff6d00] hover:bg-[#e65100] text-white gap-1.5"
            >
              <Pencil className="h-4 w-4" />
              <span>Edit Contact</span>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
