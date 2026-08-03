"use client";

import { DashboardStats } from "@/components/DashboardStats";
import { DashboardCharts } from "@/components/DashboardCharts";
import { useCustomers } from "@/features/customers/hooks/useCustomers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import { STATUS_OPTIONS, StatusOption } from "@/features/customers/constants";

export default function DashboardPage() {
  const { data: customersData, isLoading } = useCustomers(
    {},
    { column: "createdAt", direction: "desc" },
    1,
    5
  );

  const recentCustomers = customersData?.data || [];

  const getStatusBadge = (status: string) => {
    const opt = STATUS_OPTIONS.find((s: StatusOption) => s.value === status);
    return <Badge variant={opt?.variant || "default"}>{status}</Badge>;
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Welcome to NexusCRM overview and analytics.</p>
      </div>

      {/* KPI Cards */}
      <DashboardStats />

      {/* Analytics Charts (Industry Bar Chart & Status Donut Chart) */}
      <DashboardCharts />

      {/* Recent Customers Overview */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" /> Recent Customers
            </CardTitle>
          </div>
          <Link
            href="/customers"
            className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="py-6 text-center text-muted-foreground text-sm">Loading recent customers...</div>
          ) : recentCustomers.length === 0 ? (
            <div className="py-6 text-center text-muted-foreground text-sm">No customers added yet.</div>
          ) : (
            <div className="divide-y">
              {recentCustomers.map((customer) => (
                <div key={customer.id} className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium text-sm">{customer.name}</p>
                    <p className="text-xs text-muted-foreground">{customer.email} · {customer.company}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(customer.status)}
                    <span className="text-xs text-muted-foreground hidden sm:inline">
                      {new Date(customer.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
