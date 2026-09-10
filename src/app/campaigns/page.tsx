"use client";

import { useState } from "react";
import { Search, Plus, ChevronDown, Zap, X, Megaphone, Calendar, Send, Sparkles, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CampaignAnalyticsView } from "@/features/campaigns/components/CampaignAnalyticsView";
import { CreateCampaignDialog } from "@/features/campaigns/components/CreateCampaignDialog";
import { Campaign, CampaignType } from "@/features/campaigns/types";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "Promotional", "Offers", "Seasonal", "Announcements", "Updates"];

export default function CampaignsPage() {
  // Top level tabs: Campaigns vs Analytics
  const [topTab, setTopTab] = useState<"campaigns" | "analytics">("campaigns");

  // Sub-tabs: Transket Campaign vs My Campaign
  const [subTab, setSubTab] = useState<CampaignType>("transket");

  // Filter & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Dialog state
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  // User's custom campaigns list
  const [myCampaigns, setMyCampaigns] = useState<Campaign[]>([
    {
      id: "camp-init-1",
      name: "Q3 VIP Exclusive Preview",
      type: "my_campaign",
      channel: "whatsapp",
      category: "Promotional",
      status: "active",
      audience: "High Value VIPs",
      recipientsCount: 150,
      deliveredCount: 148,
      openedRate: "89%",
      clickRate: "42%",
      createdAt: "2026-09-08T10:30:00Z",
      content: "Hello, enjoy early access to our Autumn collection before official launch.",
    },
    {
      id: "camp-init-2",
      name: "Weekend Loyalty Bonus Points",
      type: "my_campaign",
      channel: "email",
      category: "Offers",
      status: "scheduled",
      audience: "All Customers",
      recipientsCount: 1240,
      createdAt: "2026-09-09T14:15:00Z",
      scheduledFor: "2026-09-12T09:00:00Z",
      content: "Earn 2x reward points on all transactions this coming weekend!",
    },
  ]);

  const handleCreateCampaign = (newCamp: Campaign) => {
    setMyCampaigns((prev) => [newCamp, ...prev]);
    setSubTab("my_campaign");
  };

  // Filtered campaigns for "My Campaign"
  const filteredMyCampaigns = myCampaigns.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.audience.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || c.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col min-h-[calc(100vh-8rem)]">
      {/* Top Tabs Bar: Campaigns | Analytics */}
      <div className="-mt-4 sm:-mt-6 lg:-mt-8 -mx-4 sm:-mx-6 lg:-mx-8 border-b border-border/70 bg-background/95 px-6 sm:px-8 mb-6">
        <div className="flex items-center gap-8">
          <button
            onClick={() => setTopTab("campaigns")}
            className={cn(
              "relative py-3.5 text-sm font-medium transition-colors cursor-pointer",
              topTab === "campaigns"
                ? "text-[#ff6d00] font-semibold"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Campaigns
            {topTab === "campaigns" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#ff6d00] rounded-full" />
            )}
          </button>

          <button
            onClick={() => setTopTab("analytics")}
            className={cn(
              "relative py-3.5 text-sm font-medium transition-colors cursor-pointer",
              topTab === "analytics"
                ? "text-[#ff6d00] font-semibold"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Analytics
            {topTab === "analytics" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#ff6d00] rounded-full" />
            )}
          </button>
        </div>
      </div>

      {/* Analytics View */}
      {topTab === "analytics" ? (
        <CampaignAnalyticsView />
      ) : (
        /* Campaigns View */
        <div className="space-y-5">
          {/* Main Action Bar: Title + Search + Create Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Campaigns
            </h2>

            <div className="flex items-center gap-3">
              {/* Search Bar */}
              <div className="relative w-full sm:w-64 md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                  type="text"
                  placeholder="Search Campaign..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-8 h-9 text-sm bg-background border-border/80 rounded-lg focus-visible:ring-1 focus-visible:ring-[#ff6d00]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5"
                    title="Clear search"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {/* Create New Campaign Button (matches orchid pink/magenta pill in design) */}
              <DropdownMenu>
                <div className="inline-flex rounded-lg shadow-xs overflow-hidden">
                  <button
                    onClick={() => setCreateDialogOpen(true)}
                    className="h-9 px-3.5 text-sm font-medium text-white bg-[#cb6fa7] hover:bg-[#ba5f96] active:bg-[#aa5488] transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <Plus className="h-4 w-4 stroke-[2.5]" />
                    <span>Create New Campaign</span>
                  </button>
                  <DropdownMenuTrigger
                    className="h-9 px-2 text-white bg-[#cb6fa7] hover:bg-[#ba5f96] border-l border-white/20 flex items-center justify-center cursor-pointer transition-colors outline-none"
                    aria-label="More campaign options"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </DropdownMenuTrigger>
                </div>

                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem
                    onClick={() => setCreateDialogOpen(true)}
                    className="cursor-pointer gap-2"
                  >
                    <Plus className="h-4 w-4 text-[#cb6fa7]" />
                    <span>Custom Campaign</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setSubTab("transket");
                    }}
                    className="cursor-pointer gap-2"
                  >
                    <Sparkles className="h-4 w-4 text-[#ff6d00]" />
                    <span>Browse Transket Templates</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setCreateDialogOpen(true)}
                    className="cursor-pointer gap-2"
                  >
                    <Send className="h-4 w-4 text-emerald-500" />
                    <span>Quick WhatsApp Broadcast</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Sub Tabs: Transket Campaign vs My Campaign */}
          <div className="inline-flex p-1 rounded-lg border border-border/70 bg-card shadow-2xs gap-1">
            <button
              onClick={() => setSubTab("transket")}
              className={cn(
                "px-4 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-all cursor-pointer",
                subTab === "transket"
                  ? "bg-[#ff5722] text-white shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              Transket Campaign
            </button>
            <button
              onClick={() => setSubTab("my_campaign")}
              className={cn(
                "px-4 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-all cursor-pointer flex items-center gap-1.5",
                subTab === "my_campaign"
                  ? "bg-[#ff5722] text-white shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <span>My Campaign</span>
              {myCampaigns.length > 0 && (
                <span
                  className={cn(
                    "text-[10px] px-1.5 py-0.2 rounded-full",
                    subTab === "my_campaign"
                      ? "bg-white/20 text-white"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {myCampaigns.length}
                </span>
              )}
            </button>
          </div>

          {/* Ready-to-Use Campaigns Info Banner (Shown for Transket Campaign) */}
          {subTab === "transket" && (
            <div className="rounded-xl border border-orange-200/90 dark:border-orange-900/40 bg-[#fff9f4] dark:bg-orange-950/20 p-3.5 sm:p-4 flex items-start gap-3.5 shadow-2xs">
              <div className="h-6 w-6 rounded-full border border-orange-300 dark:border-orange-700 bg-orange-100/50 dark:bg-orange-900/40 flex items-center justify-center shrink-0 mt-0.5 text-[#ff6d00]">
                <Zap className="h-3.5 w-3.5 fill-[#ff6d00]/30 text-[#ff6d00]" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Ready-to-Use Campaigns
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  These are pre-built, approval-required templates designed to help you launch campaigns faster. Select a template, customize it, and deploy to reach your audience efficiently.
                </p>
              </div>
            </div>
          )}

          {/* Category Filter Pills (Shown for Transket Campaign) */}
          {subTab === "transket" && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "px-3.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap",
                      isSelected
                        ? "bg-[#c026d3] text-white shadow-2xs hover:bg-[#a81eb9]"
                        : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          )}

          {/* Content Area */}
          {subTab === "transket" ? (
            /* Transket Campaign Empty State (Matches the design) */
            <div className="rounded-2xl border border-border/80 bg-card shadow-2xs py-16 sm:py-24 px-6 flex flex-col items-center justify-center text-center min-h-[400px]">
              {/* Peach Squircle with Orange Search Icon */}
              <div className="h-14 w-14 rounded-2xl bg-[#fff2e8] dark:bg-orange-950/40 border border-orange-100 dark:border-orange-900/30 flex items-center justify-center mb-4 shadow-2xs">
                <Search className="h-6 w-6 text-[#ff6d00] stroke-[2.3]" />
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight">
                No Transket campaigns available
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-sm mx-auto leading-relaxed">
                Ready-to-use campaign templates will appear here once they are available.
              </p>
            </div>
          ) : (
            /* My Campaign View */
            <div className="space-y-4">
              {filteredMyCampaigns.length === 0 ? (
                <div className="rounded-2xl border border-border/80 bg-card shadow-2xs py-16 px-6 flex flex-col items-center justify-center text-center min-h-[360px]">
                  <div className="h-14 w-14 rounded-2xl bg-muted/60 flex items-center justify-center mb-4">
                    <Megaphone className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100">
                    No campaigns found
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-sm mx-auto leading-relaxed">
                    {searchQuery
                      ? `No campaign matching "${searchQuery}". Try adjusting your search.`
                      : "You have not created any personal campaigns yet. Create your first campaign to begin broadcasts."}
                  </p>
                  <Button
                    onClick={() => setCreateDialogOpen(true)}
                    className="mt-4 bg-[#cb6fa7] hover:bg-[#ba5f96] text-white font-medium"
                  >
                    <Plus className="h-4 w-4 mr-1.5" /> Create Campaign
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredMyCampaigns.map((camp) => (
                    <Card
                      key={camp.id}
                      className="border border-border/80 hover:border-border transition-all shadow-2xs"
                    >
                      <CardContent className="p-5 space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-base text-foreground">
                                {camp.name}
                              </h4>
                              <Badge
                                variant={
                                  camp.status === "active"
                                    ? "default"
                                    : camp.status === "scheduled"
                                    ? "secondary"
                                    : "outline"
                                }
                                className={
                                  camp.status === "active"
                                    ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-xs"
                                    : "text-xs"
                                }
                              >
                                {camp.status.toUpperCase()}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              Channel: <span className="font-medium uppercase text-foreground">{camp.channel}</span> · Category: <span className="font-medium text-foreground">{camp.category}</span>
                            </p>
                          </div>
                        </div>

                        {camp.content && (
                          <div className="p-3 rounded-lg bg-muted/40 text-xs text-muted-foreground italic line-clamp-2">
                            &quot;{camp.content}&quot;
                          </div>
                        )}

                        <div className="pt-2 border-t flex items-center justify-between text-xs text-muted-foreground">
                          <div>
                            Target: <span className="font-medium text-foreground">{camp.audience}</span> ({camp.recipientsCount} contacts)
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {new Date(camp.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Create Campaign Dialog */}
      <CreateCampaignDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onCreateCampaign={handleCreateCampaign}
      />
    </div>
  );
}
