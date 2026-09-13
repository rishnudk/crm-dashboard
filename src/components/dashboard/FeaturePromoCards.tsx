"use client";

import { MessageCircle, Link as LinkIcon, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function FeaturePromoCards() {
  const [widgetModalOpen, setWidgetModalOpen] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {/* Card 1: WhatsApp Widget */}
        <div className="relative overflow-hidden rounded-xl border border-border/80 bg-card p-5 sm:p-6 shadow-sm flex flex-col justify-between group">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="max-w-[260px] space-y-2 z-10">
              <h3 className="text-base sm:text-lg font-bold text-foreground">
                WhatsApp Widget
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Create a custom WhatsApp widget, add it to your site, and start real-time chats instantly.
              </p>
              <div className="pt-2">
                <Button
                  onClick={() => setWidgetModalOpen(true)}
                  className="bg-[#ff6d00] hover:bg-[#e05f00] text-white font-medium px-4 py-2 rounded-lg text-xs sm:text-sm shadow-sm transition-all"
                >
                  Generate Button
                </Button>
              </div>
            </div>

            {/* Graphic Mockup Preview */}
            <div className="w-full sm:w-auto flex justify-center sm:justify-end mt-2 sm:mt-0">
              <div className="relative w-40 h-44 rounded-2xl bg-gradient-to-b from-amber-50/70 to-orange-50/40 dark:from-slate-900/80 dark:to-slate-950/80 p-2.5 flex items-center justify-center">
                {/* Mini Chat Widget Mockup */}
                <div className="w-32 rounded-xl overflow-hidden shadow-lg border border-border/60 bg-white dark:bg-slate-900">
                  {/* Widget Header */}
                  <div className="bg-[#005d4b] p-2 flex items-center gap-1.5 text-white">
                    <div className="h-5 w-5 rounded-full bg-emerald-500/30 flex items-center justify-center text-white">
                      <MessageCircle className="h-3 w-3 fill-white" />
                    </div>
                    <div className="leading-tight">
                      <p className="text-[10px] font-bold text-white">Transket</p>
                      <p className="text-[8px] text-emerald-300">online</p>
                    </div>
                  </div>

                  {/* Widget Body */}
                  <div className="p-2 bg-[#efeae2]/60 dark:bg-slate-800/60 min-h-[56px] flex flex-col justify-between">
                    <div className="bg-white dark:bg-slate-700/80 rounded-lg p-1.5 shadow-xs max-w-[85%] text-[9px] text-foreground">
                      <div className="h-1.5 w-16 bg-slate-200 dark:bg-slate-600 rounded-full mb-1" />
                      <div className="h-1.5 w-10 bg-emerald-200 dark:bg-emerald-700 rounded-full" />
                    </div>

                    {/* Floating trigger button */}
                    <div className="flex justify-end pt-2">
                      <div className="h-6 w-6 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-md">
                        <MessageCircle className="h-3.5 w-3.5 fill-white text-[#25D366]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: QR & Link Generator */}
        <div className="relative overflow-hidden rounded-xl border border-border/80 bg-card p-5 sm:p-6 shadow-sm flex flex-col justify-between group">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="max-w-[260px] space-y-2 z-10">
              <h3 className="text-base sm:text-lg font-bold text-foreground">
                QR & Link Generator
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Add your number, set a welcome message, and share the link or QR for easy WhatsApp access.
              </p>
              <div className="pt-2">
                <Button
                  onClick={() => setQrModalOpen(true)}
                  className="bg-[#ff6d00] hover:bg-[#e05f00] text-white font-medium px-4 py-2 rounded-lg text-xs sm:text-sm shadow-sm transition-all"
                >
                  Generate Now
                </Button>
              </div>
            </div>

            {/* Graphic Mockup Preview (3D Isometric Bezel QR Code) */}
            <div className="w-full sm:w-auto flex justify-center sm:justify-end mt-2 sm:mt-0">
              <div className="relative w-40 h-44 rounded-2xl bg-gradient-to-b from-amber-50/70 to-orange-50/40 dark:from-slate-900/80 dark:to-slate-950/80 p-2.5 flex items-center justify-center">
                {/* 3D Stylized QR Frame */}
                <div className="relative rounded-2xl p-2.5 bg-gradient-to-br from-fuchsia-600 via-purple-600 to-pink-600 shadow-xl shadow-purple-500/20 transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                  <div className="relative rounded-xl bg-white p-2 flex flex-col items-center justify-center">
                    {/* SVG QR Code */}
                    <svg
                      viewBox="0 0 100 100"
                      className="w-16 h-16 text-slate-900"
                      fill="currentColor"
                    >
                      {/* Top-left position marker */}
                      <rect x="0" y="0" width="28" height="28" rx="4" />
                      <rect x="5" y="5" width="18" height="18" fill="white" rx="2" />
                      <rect x="9" y="9" width="10" height="10" rx="1" />

                      {/* Top-right position marker */}
                      <rect x="72" y="0" width="28" height="28" rx="4" />
                      <rect x="77" y="5" width="18" height="18" fill="white" rx="2" />
                      <rect x="81" y="9" width="10" height="10" rx="1" />

                      {/* Bottom-left position marker */}
                      <rect x="0" y="72" width="28" height="28" rx="4" />
                      <rect x="5" y="77" width="18" height="18" fill="white" rx="2" />
                      <rect x="9" y="81" width="10" height="10" rx="1" />

                      {/* Grid Data Dots */}
                      <rect x="36" y="8" width="8" height="8" />
                      <rect x="52" y="8" width="8" height="8" />
                      <rect x="36" y="24" width="8" height="8" />
                      <rect x="8" y="36" width="8" height="8" />
                      <rect x="24" y="36" width="8" height="8" />
                      <rect x="8" y="52" width="8" height="8" />
                      <rect x="72" y="36" width="8" height="8" />
                      <rect x="88" y="52" width="8" height="8" />
                      <rect x="36" y="72" width="8" height="8" />
                      <rect x="52" y="84" width="8" height="8" />
                      <rect x="72" y="72" width="8" height="8" />
                      <rect x="84" y="84" width="8" height="8" />
                    </svg>

                    {/* Center badge with Link Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-md ring-2 ring-white">
                        <LinkIcon className="h-3 w-3" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Widget Generator Modal */}
      <Dialog open={widgetModalOpen} onOpenChange={setWidgetModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-[#ff6d00]" />
              Website WhatsApp Chat Widget
            </DialogTitle>
            <DialogDescription>
              Configure embeddable floating chat widget code to install on your website.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-2 text-xs">
            <div className="rounded-lg bg-muted p-3 font-mono text-[11px] text-muted-foreground break-all">
              {`<script src="https://cdn.transket.com/widget.js" data-phone="+919876543210" async></script>`}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setWidgetModalOpen(false)}>
              Close
            </Button>
            <Button
              className="bg-[#ff6d00] hover:bg-[#e05f00] text-white"
              onClick={() => {
                navigator.clipboard.writeText(
                  '<script src="https://cdn.transket.com/widget.js" data-phone="+919876543210" async></script>'
                );
                toast.success("Widget code snippet copied!");
                setWidgetModalOpen(false);
              }}
            >
              Copy Embed Code
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* QR & Link Generator Modal */}
      <Dialog open={qrModalOpen} onOpenChange={setQrModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[#ff6d00]" />
              WhatsApp Direct Link & QR Code
            </DialogTitle>
            <DialogDescription>
              Share this link or print your customized QR code for store counters and marketing materials.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-2 text-xs">
            <div className="rounded-lg bg-muted p-3 font-mono text-[11px] text-muted-foreground break-all">
              https://wa.me/919876543210?text=Hello%20Transket%20Team!
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setQrModalOpen(false)}>
              Close
            </Button>
            <Button
              className="bg-[#ff6d00] hover:bg-[#e05f00] text-white"
              onClick={() => {
                navigator.clipboard.writeText(
                  "https://wa.me/919876543210?text=Hello%20Transket%20Team!"
                );
                toast.success("Direct WhatsApp link copied to clipboard!");
                setQrModalOpen(false);
              }}
            >
              Copy Link
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
