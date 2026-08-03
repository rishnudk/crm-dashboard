"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Edit,
  Trash2,
  Clock,
  Mail,
  Phone,
  Building,
  Calendar,
  Star,
  FileText,
  User,
} from "lucide-react";
import { Customer } from "../types/customer";
import { STATUS_OPTIONS, StatusOption } from "../constants";

// ─── Sub-component (outside CustomerDetailDrawer to satisfy React rules) ─────
interface DetailRowProps {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
}

function DetailRow({ icon: Icon, label, value }: DetailRowProps) {
  return (
    <div className="flex items-start gap-3 py-3">
      <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-md bg-muted/60 shrink-0">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
          {label}
        </p>
        <div className="text-sm font-medium mt-0.5 break-all">{value}</div>
      </div>
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatDateDDMMYYYY(isoString: string): string {
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return isoString;
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

// ─── Main Component ───────────────────────────────────────────────────────────
interface CustomerDetailDrawerProps {
  customer: Customer | null;
  open: boolean;
  onClose: () => void;
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
  onUpdateContact: (id: string) => void;
  isUpdatingContact?: boolean;
}

export function CustomerDetailDrawer({
  customer,
  open,
  onClose,
  onEdit,
  onDelete,
  onUpdateContact,
  isUpdatingContact,
}: CustomerDetailDrawerProps) {
  if (!customer) return null;

  const statusOpt = STATUS_OPTIONS.find(
    (s: StatusOption) => s.value === customer.status
  );

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent side="right" className="w-full sm:max-w-lg flex flex-col p-0">
        {/* Header */}
        <SheetHeader className="px-6 pt-6 pb-4 border-b">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-lg shrink-0">
              {customer.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <SheetTitle className="text-xl font-bold leading-tight">
                {customer.name}
              </SheetTitle>
              <div className="flex items-center gap-2 mt-1.5">
                <Badge variant={statusOpt?.variant || "default"}>
                  {customer.status}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {customer.industry}
                </span>
              </div>
            </div>
          </div>
        </SheetHeader>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-6 py-2">
          {/* Contact Info */}
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mt-4 mb-1">
            Contact Information
          </p>
          <Separator className="mb-1" />
          <DetailRow icon={Mail} label="Email" value={customer.email} />
          <DetailRow icon={Phone} label="Phone" value={customer.phone} />

          {/* Company Info */}
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mt-4 mb-1">
            Company
          </p>
          <Separator className="mb-1" />
          <DetailRow icon={Building} label="Company" value={customer.company} />
          <DetailRow icon={User} label="Industry" value={customer.industry} />

          {/* Activity */}
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mt-4 mb-1">
            Activity
          </p>
          <Separator className="mb-1" />
          <DetailRow
            icon={Calendar}
            label="Last Contact Date"
            value={
              <span className="font-mono">
                {formatDateDDMMYYYY(customer.lastContact)}
              </span>
            }
          />
          <DetailRow
            icon={Clock}
            label="Created At"
            value={
              <span className="font-mono">
                {formatDateDDMMYYYY(customer.createdAt)}
              </span>
            }
          />
          <DetailRow
            icon={Star}
            label="Priority"
            value={
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 w-2 rounded-full ${
                      i < customer.priority ? "bg-primary" : "bg-muted"
                    }`}
                  />
                ))}
                <span className="ml-1 text-muted-foreground">
                  {customer.priority} / 5
                </span>
              </div>
            }
          />

          {/* Notes */}
          {customer.notes && (
            <>
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mt-4 mb-1">
                Notes
              </p>
              <Separator className="mb-1" />
              <DetailRow
                icon={FileText}
                label="Notes"
                value={
                  <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {customer.notes}
                  </p>
                }
              />
            </>
          )}
        </div>

        {/* Footer Actions */}
        <SheetFooter className="px-6 py-4 border-t flex-row gap-2 justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                onUpdateContact(customer.id);
                onClose();
              }}
              disabled={isUpdatingContact}
              className="gap-1.5"
            >
              <Clock className="h-3.5 w-3.5" />
              {isUpdatingContact ? "Updating..." : "Mark Contacted Today"}
            </Button>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-destructive border-destructive/40 hover:bg-destructive/10 gap-1.5"
              onClick={() => {
                onDelete(customer);
                onClose();
              }}
            >
              <Trash2 className="h-3.5 w-3.5" /> Delete
            </Button>
            <Button
              size="sm"
              onClick={() => {
                onEdit(customer);
                onClose();
              }}
              className="gap-1.5"
            >
              <Edit className="h-3.5 w-3.5" /> Edit Customer
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
