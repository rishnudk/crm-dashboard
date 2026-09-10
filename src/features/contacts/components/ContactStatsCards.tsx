"use client";

import { Users, MessageSquare, Award, IndianRupee } from "lucide-react";
import { Contact } from "../types";

interface ContactStatsCardsProps {
  contacts: Contact[];
}

export function ContactStatsCards({ contacts }: ContactStatsCardsProps) {
  const total = contacts.length;
  const whatsappVerified = contacts.filter((c) => c.whatsappVerified).length;
  const vips = contacts.filter((c) => c.tags.includes("VIP") || c.tags.includes("High Value")).length;
  const totalValueNum = contacts.reduce((acc, c) => acc + (c.dealValueRaw || 0), 0);
  const totalValueInCr = (totalValueNum / 10000000).toFixed(2); // In Crores

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Contacts */}
      <div className="p-4 rounded-xl border border-border/80 bg-card shadow-2xs hover:border-border transition-all">
        <div className="flex items-center justify-between text-muted-foreground mb-2">
          <span className="text-xs font-medium uppercase tracking-wider">Total Contacts</span>
          <div className="h-8 w-8 rounded-lg bg-orange-500/10 text-[#ff6d00] flex items-center justify-center">
            <Users className="h-4 w-4" />
          </div>
        </div>
        <div className="text-2xl font-bold tracking-tight text-foreground">{total}</div>
        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
          <span className="text-emerald-600 dark:text-emerald-400 font-medium">100%</span> verified records
        </p>
      </div>

      {/* WhatsApp Verified */}
      <div className="p-4 rounded-xl border border-border/80 bg-card shadow-2xs hover:border-border transition-all">
        <div className="flex items-center justify-between text-muted-foreground mb-2">
          <span className="text-xs font-medium uppercase tracking-wider">WhatsApp Active</span>
          <div className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <MessageSquare className="h-4 w-4" />
          </div>
        </div>
        <div className="text-2xl font-bold tracking-tight text-foreground">{whatsappVerified}</div>
        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
          <span className="text-emerald-600 dark:text-emerald-400 font-medium">
            {total > 0 ? Math.round((whatsappVerified / total) * 100) : 0}%
          </span>{" "}
          opt-in broadcast ready
        </p>
      </div>

      {/* High Value / VIPs */}
      <div className="p-4 rounded-xl border border-border/80 bg-card shadow-2xs hover:border-border transition-all">
        <div className="flex items-center justify-between text-muted-foreground mb-2">
          <span className="text-xs font-medium uppercase tracking-wider">Enterprise & VIPs</span>
          <div className="h-8 w-8 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <Award className="h-4 w-4" />
          </div>
        </div>
        <div className="text-2xl font-bold tracking-tight text-foreground">{vips}</div>
        <p className="text-xs text-muted-foreground mt-1 text-muted-foreground">
          C-suite & key decision makers
        </p>
      </div>

      {/* Total Deal Pipeline */}
      <div className="p-4 rounded-xl border border-border/80 bg-card shadow-2xs hover:border-border transition-all">
        <div className="flex items-center justify-between text-muted-foreground mb-2">
          <span className="text-xs font-medium uppercase tracking-wider">Pipeline Value</span>
          <div className="h-8 w-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <IndianRupee className="h-4 w-4" />
          </div>
        </div>
        <div className="text-2xl font-bold tracking-tight text-foreground">₹{totalValueInCr} Cr</div>
        <p className="text-xs text-muted-foreground mt-1 text-muted-foreground">
          Across all active accounts
        </p>
      </div>
    </div>
  );
}
