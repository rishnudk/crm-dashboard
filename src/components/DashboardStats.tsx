"use client";

import { useDashboardStats } from "@/features/customers/hooks/useDashboardStats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, UserCheck, UserX, UserPlus } from "lucide-react";

export function DashboardStats() {
  const { data: stats, isLoading } = useDashboardStats();

  const statCards = [
    {
      title: "Total Customers",
      value: stats?.totalCustomers,
      icon: Users,
      description: "All registered clients",
      color: "text-blue-500",
    },
    {
      title: "Active Customers",
      value: stats?.activeCustomers,
      icon: UserCheck,
      description: "Active accounts",
      color: "text-emerald-500",
    },
    {
      title: "Inactive Customers",
      value: stats?.inactiveCustomers,
      icon: UserX,
      description: "Paused or lost accounts",
      color: "text-amber-500",
    },
    {
      title: "New This Month",
      value: stats?.newThisMonth,
      icon: UserPlus,
      description: "Joined current month",
      color: "text-purple-500",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-5 w-5 rounded-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 mb-1" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statCards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.title} className="hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <Icon className={`h-5 w-5 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value ?? 0}</div>
              <p className="text-xs text-muted-foreground mt-1">{card.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
