"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MessageSquare,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  Phone,
  Copy,
  Check,
  ArrowUpDown,
  CheckCircle2,
  Building2,
  MapPin,
} from "lucide-react";
import { toast } from "sonner";
import { Contact, ContactSortColumn, ContactSortConfig } from "../types";
import { cn } from "@/lib/utils";

interface ContactTableProps {
  contacts: Contact[];
  sort: ContactSortConfig;
  onSort: (column: ContactSortColumn) => void;
  onView: (contact: Contact) => void;
  onEdit: (contact: Contact) => void;
  onDelete: (contact: Contact) => void;
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
}

export function ContactTable({
  contacts,
  sort,
  onSort,
  onView,
  onEdit,
  onDelete,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
}: ContactTableProps) {
  const router = useRouter();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyPhone = (id: string, phone: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(phone);
    setCopiedId(id);
    toast.success(`Copied ${phone} to clipboard`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleQuickChat = (contact: Contact, e: React.MouseEvent) => {
    e.stopPropagation();
    toast.info(`Opening chat with ${contact.name}...`);
    router.push(`/chat-inbox?contactId=${contact.id}&name=${encodeURIComponent(contact.name)}&phone=${encodeURIComponent(contact.phone)}`);
  };

  const allSelected = contacts.length > 0 && selectedIds.length === contacts.length;
  const someSelected = selectedIds.length > 0 && !allSelected;

  const getStatusBadge = (status: Contact["status"]) => {
    switch (status) {
      case "Customer":
        return <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/25">Customer</Badge>;
      case "Active":
        return <Badge className="bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/25">Active</Badge>;
      case "Lead":
        return <Badge className="bg-orange-500/15 text-[#ff6d00] border-orange-500/25">Lead</Badge>;
      case "Prospect":
        return <Badge className="bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/25">Prospect</Badge>;
      case "Inactive":
        return <Badge variant="secondary">Inactive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="rounded-xl border border-border/80 bg-card overflow-hidden shadow-2xs">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/40 text-xs font-semibold uppercase text-muted-foreground tracking-wider">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-12 px-4">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(input) => {
                    if (input) input.indeterminate = someSelected;
                  }}
                  onChange={onToggleSelectAll}
                  className="rounded border-border/80 h-4 w-4 text-[#ff6d00] focus:ring-[#ff6d00] cursor-pointer"
                  aria-label="Select all contacts"
                />
              </TableHead>

              <TableHead
                className="cursor-pointer select-none hover:text-foreground transition-colors min-w-[220px]"
                onClick={() => onSort("name")}
              >
                <div className="flex items-center gap-1.5">
                  <span>Contact</span>
                  <ArrowUpDown className="h-3.5 w-3.5" />
                </div>
              </TableHead>

              <TableHead className="min-w-[180px]">Contact Info</TableHead>

              <TableHead
                className="cursor-pointer select-none hover:text-foreground transition-colors min-w-[190px]"
                onClick={() => onSort("company")}
              >
                <div className="flex items-center gap-1.5">
                  <span>Company & Location</span>
                  <ArrowUpDown className="h-3.5 w-3.5" />
                </div>
              </TableHead>

              <TableHead
                className="cursor-pointer select-none hover:text-foreground transition-colors min-w-[110px]"
                onClick={() => onSort("status")}
              >
                <div className="flex items-center gap-1.5">
                  <span>Status</span>
                  <ArrowUpDown className="h-3.5 w-3.5" />
                </div>
              </TableHead>

              <TableHead
                className="cursor-pointer select-none hover:text-foreground transition-colors min-w-[120px]"
                onClick={() => onSort("dealValueRaw")}
              >
                <div className="flex items-center gap-1.5">
                  <span>Pipeline Value</span>
                  <ArrowUpDown className="h-3.5 w-3.5" />
                </div>
              </TableHead>

              <TableHead
                className="cursor-pointer select-none hover:text-foreground transition-colors min-w-[120px]"
                onClick={() => onSort("lastContact")}
              >
                <div className="flex items-center gap-1.5">
                  <span>Last Activity</span>
                  <ArrowUpDown className="h-3.5 w-3.5" />
                </div>
              </TableHead>

              <TableHead className="w-28 text-right px-4">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {contacts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-44 text-center">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <p className="text-base font-medium">No contacts found</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Try adjusting your search or clear your filters.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              contacts.map((contact) => {
                const isSelected = selectedIds.includes(contact.id);
                const initials = contact.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase();

                const formattedDate = new Date(contact.lastContact).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                });

                return (
                  <TableRow
                    key={contact.id}
                    className={cn(
                      "group hover:bg-muted/40 transition-colors cursor-pointer",
                      isSelected && "bg-muted/60"
                    )}
                    onClick={() => onView(contact)}
                  >
                    {/* Checkbox */}
                    <TableCell
                      className="px-4"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSelect(contact.id);
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onToggleSelect(contact.id)}
                        className="rounded border-border/80 h-4 w-4 text-[#ff6d00] focus:ring-[#ff6d00] cursor-pointer"
                        aria-label={`Select ${contact.name}`}
                      />
                    </TableCell>

                    {/* Contact Profile (Avatar + Name + Designation) */}
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar
                          className="h-10 w-10 text-white font-semibold text-xs border border-border shrink-0 shadow-2xs"
                          style={{ backgroundColor: contact.avatarColor || "#ff6d00" }}
                        >
                          <AvatarFallback style={{ backgroundColor: contact.avatarColor || "#ff6d00" }} className="text-white">
                            {initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-sm text-foreground hover:text-[#ff6d00] transition-colors truncate">
                              {contact.name}
                            </span>
                            {contact.whatsappVerified && (
                              <span title="WhatsApp Verified" className="text-emerald-500 shrink-0">
                                <CheckCircle2 className="h-3.5 w-3.5 fill-emerald-500/20" />
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground truncate">
                            {contact.designation}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    {/* Contact Info (Phone + Email) */}
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-mono text-foreground font-medium">
                            {contact.phone}
                          </span>
                          <button
                            onClick={(e) => handleCopyPhone(contact.id, contact.phone, e)}
                            className="text-muted-foreground hover:text-foreground p-0.5 rounded transition-colors"
                            title="Copy phone"
                          >
                            {copiedId === contact.id ? (
                              <Check className="h-3 w-3 text-emerald-500" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </button>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{contact.email}</p>
                      </div>
                    </TableCell>

                    {/* Company & Location */}
                    <TableCell>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-foreground">
                          <Building2 className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                          <span className="truncate">{contact.company}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                          <MapPin className="h-3 w-3 shrink-0" />
                          <span>
                            {contact.city}, {contact.state}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Status */}
                    <TableCell>{getStatusBadge(contact.status)}</TableCell>

                    {/* Deal Value */}
                    <TableCell>
                      <div className="text-xs font-semibold text-foreground">
                        {contact.dealValue}
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {contact.tags.slice(0, 1).map((t) => (
                          <span
                            key={t}
                            className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-medium"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </TableCell>

                    {/* Last Activity */}
                    <TableCell>
                      <span className="text-xs text-muted-foreground">{formattedDate}</span>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right px-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1">
                        {/* Quick WhatsApp Chat Button */}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-500/10"
                          onClick={(e) => handleQuickChat(contact, e)}
                          title="Chat in Inbox"
                        >
                          <MessageSquare className="h-4 w-4" />
                        </Button>

                        {/* Dropdown Menu */}
                        <DropdownMenu>
                          <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors">
                            <MoreHorizontal className="h-4 w-4" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-44">
                            <DropdownMenuItem onClick={() => onView(contact)} className="gap-2 cursor-pointer">
                              <Eye className="h-4 w-4 text-muted-foreground" />
                              <span>View Details</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={(e) => handleQuickChat(contact, e as unknown as React.MouseEvent)}
                              className="gap-2 cursor-pointer text-emerald-600"
                            >
                              <MessageSquare className="h-4 w-4" />
                              <span>Chat on WhatsApp</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => window.open(`tel:${contact.phone}`, "_self")}
                              className="gap-2 cursor-pointer"
                            >
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <span>Call Contact</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onEdit(contact)} className="gap-2 cursor-pointer">
                              <Pencil className="h-4 w-4 text-muted-foreground" />
                              <span>Edit Contact</span>
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
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
