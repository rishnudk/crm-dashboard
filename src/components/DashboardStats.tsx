"use client";

import { useDashboardStats } from "@/features/customers/hooks/useDashboardStats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, UserCheck, Target, TrendingUp, UserX, UserMinus } from "lucide-react";

export function DashboardStats() {
  const { data: stats, isLoading } = useDashboardStats();

  const statCards = [
    {
      title: "Total Customers",
      value: stats?.totalCustomers,
      icon: Users,
      description: "All registered accounts",
      color: "text-blue-500",
    },
    {
      title: "Active",
      value: stats?.activeCustomers,
      icon: UserCheck,
      description: "Active subscribers",
      color: "text-emerald-500",
    },
    {
      title: "Leads",
      value: stats?.leads,
      icon: Target,
      description: "Inbound pipeline leads",
      color: "text-purple-500",
    },
    {
      title: "Prospects",
      value: stats?.prospects,
      icon: TrendingUp,
      description: "Qualified opportunities",
      color: "text-sky-500",
    },
    {
      title: "Inactive",
      value: stats?.inactiveCustomers,
      icon: UserX,
      description: "Paused accounts",
      color: "text-amber-500",
    },
    {
      title: "Churned",
      value: stats?.churned,
      icon: UserMinus,
      description: "Lost or cancelled",
      color: "text-rose-500",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-7 w-12 mb-1" />
              <Skeleton className="h-3 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
      {statCards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.title} className="hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2 px-4 pt-4">
              <CardTitle className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">
                {card.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${card.color}`} />
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="text-2xl font-bold">{card.value ?? 0}</div>
              <p className="text-[11px] text-muted-foreground mt-0.5 truncate">{card.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
