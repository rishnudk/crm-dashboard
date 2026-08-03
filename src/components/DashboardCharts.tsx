"use client";

import { useCustomers } from "@/features/customers/hooks/useCustomers";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { BarChart3, PieChart as PieChartIcon } from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  Active: "#10b981",    // Emerald
  Lead: "#a855f7",      // Purple
  Prospect: "#0284c7",  // Sky Blue
  Inactive: "#f59e0b",  // Amber
  Churned: "#ef4444",   // Red
};

export function DashboardCharts() {
  const { data: customersData, isLoading } = useCustomers(
    {},
    { column: "createdAt", direction: "desc" },
    1,
    100
  );
  const customers = customersData?.data || [];

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <Skeleton className="h-5 w-40 mb-1" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent className="h-[280px] flex items-center justify-center">
            <Skeleton className="h-full w-full rounded-md" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-5 w-40 mb-1" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent className="h-[280px] flex items-center justify-center">
            <Skeleton className="h-full w-full rounded-md" />
          </CardContent>
        </Card>
      </div>
    );
  }

  // 1. Industry Distribution Data
  const industryCounts: Record<string, number> = {};
  customers.forEach((c) => {
    industryCounts[c.industry] = (industryCounts[c.industry] || 0) + 1;
  });

  const industryData = Object.entries(industryCounts).map(([industry, count]) => ({
    industry,
    count,
  }));

  // 2. Status Distribution Data
  const statusCounts: Record<string, number> = {};
  customers.forEach((c) => {
    statusCounts[c.status] = (statusCounts[c.status] || 0) + 1;
  });

  const statusData = Object.entries(statusCounts).map(([status, count]) => ({
    name: status,
    value: count,
    color: STATUS_COLORS[status] || "#6b7280",
  }));

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Chart 1: Industry Distribution Bar Chart */}
      <Card className="hover:border-primary/50 transition-colors">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" /> Customer Distribution by Industry
          </CardTitle>
          <CardDescription>Breakdown of accounts across key market sectors</CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={industryData} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                <XAxis
                  dataKey="industry"
                  tick={{ fontSize: 11, fill: "currentColor" }}
                  interval={0}
                  angle={-20}
                  textAnchor="end"
                  stroke="currentColor"
                  className="text-muted-foreground"
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 12, fill: "currentColor" }}
                  stroke="currentColor"
                  className="text-muted-foreground"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--background)",
                    borderColor: "var(--border)",
                    borderRadius: "0.5rem",
                    color: "var(--foreground)",
                    fontSize: "0.85rem",
                  }}
                  cursor={{ fill: "rgba(255,255,255,0.05)" }}
                />
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Chart 2: Customer Status Breakdown Donut Chart */}
      <Card className="hover:border-primary/50 transition-colors">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <PieChartIcon className="h-5 w-5 text-primary" /> Account Status Breakdown
          </CardTitle>
          <CardDescription>Distribution across Active, Lead, Prospect, Inactive & Churned</CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--background)",
                    borderColor: "var(--border)",
                    borderRadius: "0.5rem",
                    color: "var(--foreground)",
                    fontSize: "0.85rem",
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                  formatter={(value) => (
                    <span className="text-xs text-muted-foreground font-medium">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
