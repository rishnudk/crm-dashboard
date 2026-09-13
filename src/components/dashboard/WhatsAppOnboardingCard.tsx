"use client";

import { useState } from "react";
import { ExternalLink, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const steps = [
  { id: 1, label: "Connect WhatsApp", active: true },
  { id: 2, label: "Register", active: false },
  { id: 3, label: "Profile Completion", active: false },
  { id: 4, label: "FB Verification", active: false },
];

export function WhatsAppOnboardingCard() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleApply = () => {
    setDialogOpen(true);
  };

  return (
    <>
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-7 shadow-sm">
        {/* Stepper Header */}
        <div className="relative mb-8 px-2 sm:px-6">
          <div className="relative flex items-center justify-between">
            {/* Horizontal connecting background line */}
            <div
              className="absolute left-6 right-6 top-[7px] h-[2px] bg-slate-200 dark:bg-slate-700"
              style={{ zIndex: 0 }}
            />

            {steps.map((step) => (
              <div
                key={step.id}
                className="relative z-10 flex flex-col items-center group cursor-default"
              >
                {step.active ? (
                  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-background">
                    <span className="h-3 w-3 rounded-full bg-[#ff6d00] ring-4 ring-[#ff6d00]/30 animate-pulse" />
                  </div>
                ) : (
                  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-background">
                    <span className="h-3.5 w-3.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                  </div>
                )}
                <span
                  className={`mt-2.5 text-xs sm:text-sm whitespace-nowrap text-center ${
                    step.active
                      ? "font-semibold text-foreground"
                      : "font-normal text-muted-foreground/80"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-border/70 my-6" />

        {/* Card Body */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <h3 className="text-base sm:text-lg font-bold text-foreground">
              Connect WhatsApp
            </h3>
            <span className="inline-flex items-center rounded-md bg-amber-50 dark:bg-amber-950/50 px-2.5 py-0.5 text-xs font-semibold text-amber-700 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800">
              Action Required
            </span>
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground">
            Easily link your WhatsApp Business account to our platform.
          </p>

          <ul className="space-y-2 text-xs sm:text-sm text-foreground/85 pt-1">
            <li className="flex items-start gap-2.5">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground shrink-0" />
              <span>Authenticate securely with Facebook/Meta credentials.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground shrink-0" />
              <span>Select or create your WhatsApp Business Account.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground shrink-0" />
              <span>Verify your business phone number and set a display name.</span>
            </li>
          </ul>

          <div className="pt-2">
            <h4 className="text-xs sm:text-sm font-bold text-foreground">
              Why it matters
            </h4>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">
              Activates WhatsApp messaging for your business and connects your assets, setting the foundation for seamless communication.
            </p>
          </div>

          <div className="pt-2">
            <Button
              onClick={handleApply}
              className="bg-[#f04438] hover:bg-[#d92d20] text-white font-medium px-5 py-2.5 rounded-lg inline-flex items-center gap-2 shadow-sm transition-all hover:shadow"
            >
              <ExternalLink className="h-4 w-4" />
              Apply
            </Button>
          </div>
        </div>
      </div>

      {/* Connect WhatsApp Modal */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg">
              <CheckCircle2 className="h-5 w-5 text-[#ff6d00]" />
              Connect WhatsApp Business
            </DialogTitle>
            <DialogDescription>
              Launch Meta Embedded Signup to link your official WhatsApp Business number with Transket.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-3 text-sm text-muted-foreground">
            <div className="rounded-lg border bg-muted/40 p-3 space-y-2">
              <p className="font-medium text-foreground">Prerequisites:</p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>Meta Business Manager admin access</li>
                <li>Valid business legal name & website</li>
                <li>Phone number able to receive SMS or Voice OTP</li>
              </ul>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-[#ff6d00] hover:bg-[#e05f00] text-white"
              onClick={() => {
                setDialogOpen(false);
                toast.success("Redirecting to Meta Business Signup portal...");
              }}
            >
              Continue to Facebook Login
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
