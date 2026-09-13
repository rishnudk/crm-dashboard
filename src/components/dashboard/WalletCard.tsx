"use client";

import { useState } from "react";
import { Wallet, RefreshCw, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const creditPackages = [
  { credits: "+500", price: "₹5", rawCredits: 500, rawPrice: 5 },
  { credits: "+1,000", price: "₹10", rawCredits: 1000, rawPrice: 10 },
  { credits: "+2,500", price: "₹25", rawCredits: 2500, rawPrice: 25 },
  { credits: "+5,000", price: "₹50", rawCredits: 5000, rawPrice: 50 },
];

export function WalletCard() {
  const [balance, setBalance] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState(creditPackages[1]);
  const [rechargeModalOpen, setRechargeModalOpen] = useState(false);
  const [autoRechargeOpen, setAutoRechargeOpen] = useState(false);
  const [autoRechargeEnabled, setAutoRechargeEnabled] = useState(true);

  const handleAddCredits = () => {
    setBalance((prev) => prev + selectedPackage.rawCredits);
    toast.success(
      `Successfully added ${selectedPackage.credits.replace("+", "")} credits for ${selectedPackage.price}!`
    );
    setRechargeModalOpen(false);
  };

  return (
    <>
      <div className="rounded-xl border border-border/80 bg-card p-5 sm:p-6 shadow-sm space-y-5">
        {/* Header: Wallet icon & title + Healthy badge */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 dark:bg-orange-950/40 text-[#ff6d00]">
              <Wallet className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-base text-foreground">Wallet</h3>
          </div>

          <span className="inline-flex items-center rounded-md bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800">
            Healthy
          </span>
        </div>

        {/* Balance */}
        <div>
          <p className="text-xs text-muted-foreground font-medium">Available balance</p>
          <p className="text-3xl font-bold tracking-tight text-foreground mt-0.5">
            {balance.toLocaleString()} credits
          </p>
        </div>

        {/* Recent Activity */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-foreground">Recent activity</p>
          <div className="rounded-lg border border-border/70 bg-muted/25 py-5 px-4 text-center text-xs text-muted-foreground">
            No activity yet
          </div>
        </div>

        {/* Quick credit top-up packages */}
        <div className="grid grid-cols-4 gap-2">
          {creditPackages.map((pkg) => {
            const isSelected = selectedPackage.credits === pkg.credits;
            return (
              <button
                key={pkg.credits}
                type="button"
                onClick={() => setSelectedPackage(pkg)}
                className={`flex flex-col items-center justify-center rounded-lg border py-2 px-1 text-center transition-all ${
                  isSelected
                    ? "border-[#ff6d00] bg-orange-50/50 dark:bg-orange-950/30 text-[#ff6d00] shadow-sm"
                    : "border-border/70 bg-card hover:bg-muted/40 text-foreground"
                }`}
              >
                <span className="text-xs font-bold leading-tight">{pkg.credits}</span>
                <span className="text-[11px] text-muted-foreground font-normal">{pkg.price}</span>
              </button>
            );
          })}
        </div>

        {/* Primary CTA button */}
        <Button
          onClick={() => setRechargeModalOpen(true)}
          className="w-full bg-[#ff6d00] hover:bg-[#e05f00] text-white font-semibold rounded-xl py-2.5 shadow-sm transition-all flex items-center justify-center gap-1.5"
        >
          <Plus className="h-4 w-4" />
          Add credits
        </Button>

        {/* Auto-recharge row */}
        <div
          onClick={() => setAutoRechargeOpen(true)}
          className="flex items-center justify-between rounded-lg border border-border/70 p-2.5 text-xs hover:bg-muted/30 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2 text-foreground/80 font-medium">
            <RefreshCw className="h-3.5 w-3.5 text-muted-foreground" />
            <span>Auto-recharge</span>
          </div>

          <div className="flex items-center gap-1 font-medium text-emerald-600 dark:text-emerald-400">
            <span>{autoRechargeEnabled ? "On · +2,500" : "Off"}</span>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
          </div>
        </div>

        {/* View transactions link */}
        <div>
          <button
            type="button"
            onClick={() => toast.info("Opening transaction history...")}
            className="inline-flex items-center gap-1 text-xs font-medium text-[#ff6d00] hover:text-[#e05f00] hover:underline"
          >
            <span>View transactions</span>
            <ChevronRight className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Add Credits Confirmation Dialog */}
      <Dialog open={rechargeModalOpen} onOpenChange={setRechargeModalOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Add WhatsApp Messaging Credits</DialogTitle>
            <DialogDescription>
              Confirm your top-up package for WhatsApp conversation billing.
            </DialogDescription>
          </DialogHeader>

          <div className="rounded-xl border bg-muted/30 p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Selected Package</span>
              <span className="font-bold text-foreground">{selectedPackage.credits} Credits</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Price</span>
              <span className="font-bold text-emerald-600">{selectedPackage.price}</span>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground pt-1 border-t">
              <span>New Available Balance</span>
              <span>{(balance + selectedPackage.rawCredits).toLocaleString()} credits</span>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setRechargeModalOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-[#ff6d00] hover:bg-[#e05f00] text-white"
              onClick={handleAddCredits}
            >
              Confirm & Pay {selectedPackage.price}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Auto Recharge Settings Dialog */}
      <Dialog open={autoRechargeOpen} onOpenChange={setAutoRechargeOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Auto-Recharge Settings</DialogTitle>
            <DialogDescription>
              Automatically add credits whenever your balance falls below 500 credits to avoid message disruption.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-2">
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <p className="font-medium text-sm">Auto-recharge Status</p>
                <p className="text-xs text-muted-foreground">Refill +2,500 credits at ₹25</p>
              </div>
              <Button
                size="sm"
                variant={autoRechargeEnabled ? "default" : "outline"}
                className={autoRechargeEnabled ? "bg-emerald-600 hover:bg-emerald-700 text-white" : ""}
                onClick={() => setAutoRechargeEnabled(!autoRechargeEnabled)}
              >
                {autoRechargeEnabled ? "Enabled" : "Disabled"}
              </Button>
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={() => setAutoRechargeOpen(false)}>Done</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
