"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Send, CheckCircle2, Eye, MousePointerClick, TrendingUp, Users, ArrowUpRight } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";

const performanceData = [
  { month: "Jan", sent: 1200, opened: 820, clicks: 310 },
  { month: "Feb", sent: 1900, opened: 1350, clicks: 540 },
  { month: "Mar", sent: 2400, opened: 1780, clicks: 760 },
  { month: "Apr", sent: 2100, opened: 1590, clicks: 680 },
  { month: "May", sent: 3200, opened: 2410, clicks: 1120 },
  { month: "Jun", sent: 3800, opened: 2980, clicks: 1450 },
];

const channelBreakdown = [
  { name: "WhatsApp", share: 58, color: "#25D366" },
  { name: "Email", share: 32, color: "#ea580c" },
  { name: "SMS", share: 10, color: "#6366f1" },
];

export function CampaignAnalyticsView() {
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-200">
      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border border-border/80 shadow-2xs">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Total Broadcasts
              </p>
              <h3 className="text-2xl font-bold mt-1 tracking-tight">14,600</h3>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-0.5 mt-1">
                <TrendingUp className="h-3 w-3" /> +18.4% vs last month
              </p>
            </div>
            <div className="h-11 w-11 rounded-xl bg-orange-100 dark:bg-orange-950/50 text-[#ff6d00] flex items-center justify-center">
              <Send className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/80 shadow-2xs">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Delivery Rate
              </p>
              <h3 className="text-2xl font-bold mt-1 tracking-tight">98.6%</h3>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-0.5 mt-1">
                <TrendingUp className="h-3 w-3" /> +0.8% industry avg
              </p>
            </div>
            <div className="h-11 w-11 rounded-xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/80 shadow-2xs">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Open Rate
              </p>
              <h3 className="text-2xl font-bold mt-1 tracking-tight">72.4%</h3>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-0.5 mt-1">
                <TrendingUp className="h-3 w-3" /> +4.2% higher
              </p>
            </div>
            <div className="h-11 w-11 rounded-xl bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Eye className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/80 shadow-2xs">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Click-Through Rate
              </p>
              <h3 className="text-2xl font-bold mt-1 tracking-tight">34.8%</h3>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-0.5 mt-1">
                <TrendingUp className="h-3 w-3" /> +2.1% engagement
              </p>
            </div>
            <div className="h-11 w-11 rounded-xl bg-purple-100 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <MousePointerClick className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border border-border/80 shadow-2xs">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Monthly Campaign Performance</CardTitle>
            <CardDescription>Audience reach, opens, and engagement trends over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff6d00" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#ff6d00" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="colorOpened" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
                  <YAxis tickLine={false} axisLine={false} fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(15, 23, 42, 0.9)",
                      borderRadius: "8px",
                      border: "none",
                      color: "#fff",
                      fontSize: "12px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="sent"
                    stroke="#ff6d00"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorSent)"
                    name="Delivered"
                  />
                  <Area
                    type="monotone"
                    dataKey="opened"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorOpened)"
                    name="Opened"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Channel Distribution */}
        <Card className="border border-border/80 shadow-2xs">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Channel Share</CardTitle>
            <CardDescription>Volume distribution across channels</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {channelBreakdown.map((ch) => (
              <div key={ch.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{ch.name}</span>
                  <span className="text-muted-foreground">{ch.share}%</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${ch.share}%`, backgroundColor: ch.color }}
                  />
                </div>
              </div>
            ))}

            <div className="pt-4 border-t text-xs text-muted-foreground leading-relaxed">
              WhatsApp continues to yield the highest response rate with an average reading speed under 3 minutes.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
