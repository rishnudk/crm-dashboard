"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Campaign } from "../types";
import { toast } from "sonner";
import { Megaphone, MessageSquare, Mail, Smartphone, Sparkles } from "lucide-react";

interface CreateCampaignDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateCampaign: (campaign: Campaign) => void;
}

export function CreateCampaignDialog({
  open,
  onOpenChange,
  onCreateCampaign,
}: CreateCampaignDialogProps) {
  const [name, setName] = useState("");
  const [channel, setChannel] = useState<"whatsapp" | "email" | "sms">("whatsapp");
  const [category, setCategory] = useState("Promotional");
  const [audience, setAudience] = useState("All Customers");
  const [content, setContent] = useState("");
  const [schedule, setSchedule] = useState("now");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter a campaign name");
      return;
    }

    const newCampaign: Campaign = {
      id: `camp-${Date.now()}`,
      name: name.trim(),
      type: "my_campaign",
      channel,
      category,
      status: schedule === "now" ? "active" : "scheduled",
      audience,
      recipientsCount: audience === "All Customers" ? 1240 : 450,
      createdAt: new Date().toISOString(),
      content: content.trim(),
    };

    onCreateCampaign(newCampaign);
    toast.success(`Campaign "${name}" created successfully!`);
    onOpenChange(false);
    // Reset form
    setName("");
    setContent("");
    setChannel("whatsapp");
    setCategory("Promotional");
    setAudience("All Customers");
    setSchedule("now");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <span className="p-2 rounded-lg bg-orange-100 dark:bg-orange-950/50 text-[#ff6d00]">
              <Megaphone className="h-5 w-5" />
            </span>
            Create New Campaign
          </DialogTitle>
          <DialogDescription>
            Launch a targeted marketing broadcast or scheduled workflow across your audience.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {/* Campaign Name */}
          <div className="space-y-1.5">
            <Label htmlFor="camp-name">Campaign Name *</Label>
            <Input
              id="camp-name"
              placeholder="e.g. Festive Flash Sale, Product Launch Announcement"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Channel selection */}
          <div className="space-y-1.5">
            <Label>Broadcast Channel</Label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setChannel("whatsapp")}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-medium transition-all ${
                  channel === "whatsapp"
                    ? "border-[#ff6d00] bg-orange-50/50 dark:bg-orange-950/30 text-[#ff6d00] font-semibold"
                    : "border-border hover:border-border/80 text-muted-foreground"
                }`}
              >
                <MessageSquare className="h-4 w-4 mb-1" />
                WhatsApp
              </button>
              <button
                type="button"
                onClick={() => setChannel("email")}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-medium transition-all ${
                  channel === "email"
                    ? "border-[#ff6d00] bg-orange-50/50 dark:bg-orange-950/30 text-[#ff6d00] font-semibold"
                    : "border-border hover:border-border/80 text-muted-foreground"
                }`}
              >
                <Mail className="h-4 w-4 mb-1" />
                Email
              </button>
              <button
                type="button"
                onClick={() => setChannel("sms")}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-medium transition-all ${
                  channel === "sms"
                    ? "border-[#ff6d00] bg-orange-50/50 dark:bg-orange-950/30 text-[#ff6d00] font-semibold"
                    : "border-border hover:border-border/80 text-muted-foreground"
                }`}
              >
                <Smartphone className="h-4 w-4 mb-1" />
                SMS
              </button>
            </div>
          </div>

          {/* Category & Audience Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Category</Label>
              <Select value={category} onValueChange={(val) => val && setCategory(val)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Promotional">Promotional</SelectItem>
                  <SelectItem value="Offers">Special Offers</SelectItem>
                  <SelectItem value="Seasonal">Seasonal & Holiday</SelectItem>
                  <SelectItem value="Announcements">Announcements</SelectItem>
                  <SelectItem value="Updates">Updates</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label>Audience Segment</Label>
              <Select value={audience} onValueChange={(val) => val && setAudience(val)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Customers">All Customers (~1,240)</SelectItem>
                  <SelectItem value="Active Clients">Active Clients (~680)</SelectItem>
                  <SelectItem value="High Value VIPs">High Value VIPs (~150)</SelectItem>
                  <SelectItem value="New Leads">New Leads (~410)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Message / Template Content */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="camp-content">Campaign Message</Label>
              <button
                type="button"
                onClick={() =>
                  setContent(
                    "Hello {{name}}, we're thrilled to introduce our exclusive seasonal rewards! Get 25% off with code NEXUS25 today."
                  )
                }
                className="text-xs text-[#ff6d00] hover:underline inline-flex items-center gap-1"
              >
                <Sparkles className="h-3 w-3" /> Insert Sample
              </button>
            </div>
            <Textarea
              id="camp-content"
              rows={3}
              placeholder="Draft your campaign copy with dynamic tags like {{name}}, {{company}}..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          {/* Schedule */}
          <div className="space-y-1.5">
            <Label>Deployment</Label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="radio"
                  name="schedule"
                  value="now"
                  checked={schedule === "now"}
                  onChange={() => setSchedule("now")}
                  className="accent-[#ff6d00]"
                />
                Send Immediately
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="radio"
                  name="schedule"
                  value="later"
                  checked={schedule === "later"}
                  onChange={() => setSchedule("later")}
                  className="accent-[#ff6d00]"
                />
                Schedule for Later
              </label>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#c865ad] hover:bg-[#b9579e] text-white font-medium shadow-xs"
            >
              Launch Campaign
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
