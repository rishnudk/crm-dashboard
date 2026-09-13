"use client";

import { useState } from "react";
import { Building2, Check, Copy, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const organizations = [
  { id: "T-ORG-XTT5Z1", name: "my company", isCurrent: true },
  { id: "T-ORG-8K9B2P", name: "Transket Global", isCurrent: false },
  { id: "T-ORG-4M2L7Q", name: "Acme Enterprises", isCurrent: false },
];

export function DashboardOrgCard() {
  const [copied, setCopied] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState(organizations[0]);

  const copyOrgId = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(selectedOrg.id);
    setCopied(true);
    toast.success("Organization ID copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-foreground">Current Organization</h3>

      <DropdownMenu>
        <DropdownMenuTrigger className="w-full text-left outline-none cursor-pointer">
          <div className="group flex items-center justify-between gap-3 rounded-xl border border-border/80 bg-card p-3 shadow-sm hover:border-border transition-all">
            <div className="flex items-center gap-3 min-w-0">
              {/* Org Icon with pink/coral gradient matching mockup */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-rose-400 to-red-500 text-white shadow-sm">
                <Building2 className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <p className="font-semibold text-sm text-foreground truncate">
                  {selectedOrg.name}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span>Org ID: {selectedOrg.id}</span>
                  <button
                    type="button"
                    onClick={copyOrgId}
                    className="p-0.5 text-muted-foreground/80 hover:text-foreground transition-colors rounded"
                    title="Copy Org ID"
                  >
                    {copied ? (
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0 group-hover:text-foreground transition-colors" />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-64">
          <DropdownMenuLabel className="text-xs text-muted-foreground">
            Switch Organization
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {organizations.map((org) => (
            <DropdownMenuItem
              key={org.id}
              onClick={() => setSelectedOrg(org)}
              className="flex items-center justify-between cursor-pointer"
            >
              <div>
                <p className="font-medium text-sm">{org.name}</p>
                <p className="text-xs text-muted-foreground">{org.id}</p>
              </div>
              {selectedOrg.id === org.id && (
                <Check className="h-4 w-4 text-[#ff6d00]" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
