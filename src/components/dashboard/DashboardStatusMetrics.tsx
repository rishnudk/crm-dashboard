"use client";

import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MetricItem {
  id: string;
  label: string;
  value: string;
  description: string;
}

const metrics: MetricItem[] = [
  {
    id: "quality-rating",
    label: "Quality Rating",
    value: "N/A",
    description: "Your WhatsApp Business account quality score based on recent messaging.",
  },
  {
    id: "message-limit",
    label: "Message Limit",
    value: "N/A",
    description: "The maximum number of business-initiated conversations allowed per 24-hour period.",
  },
  {
    id: "phone-status",
    label: "Phone no. status",
    value: "N/A",
    description: "Current connection and registration status of your business phone number.",
  },
  {
    id: "display-name-status",
    label: "Display name status",
    value: "N/A",
    description: "Meta verification status for your official WhatsApp display name.",
  },
];

export function DashboardStatusMetrics() {
  return (
    <div className="rounded-xl border border-border/80 bg-card p-4 sm:p-5 shadow-sm">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-border/60">
        {metrics.map((metric, idx) => (
          <div
            key={metric.id}
            className={`flex flex-col gap-2 ${
              idx > 0 ? "pt-3 sm:pt-0 sm:pl-5 lg:pl-6" : ""
            }`}
          >
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-foreground/80">
              <span>{metric.label}</span>
              <Tooltip>
                <TooltipTrigger
                  type="button"
                  className="text-muted-foreground/70 hover:text-foreground transition-colors inline-flex cursor-pointer"
                  aria-label={`Info for ${metric.label}`}
                >
                  <Info className="h-3.5 w-3.5" />
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs text-xs">
                  {metric.description}
                </TooltipContent>
              </Tooltip>
            </div>
            <div>
              <span className="inline-flex items-center justify-center rounded-md border border-border/80 bg-muted/50 px-3 py-0.5 text-xs font-medium text-muted-foreground">
                {metric.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
