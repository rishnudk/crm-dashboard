import { useQuery } from "@tanstack/react-query";
import { fetchDashboardStats } from "../api/customerApi";

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboardStats"],
    queryFn: () => fetchDashboardStats(),
  });
}
