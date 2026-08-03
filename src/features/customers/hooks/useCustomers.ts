import { useQuery } from "@tanstack/react-query";
import { fetchCustomers } from "../api/customerApi";
import { CustomerFilters, SortConfig } from "../types/customer";

export function useCustomers(
  filters: CustomerFilters,
  sort: SortConfig,
  page: number,
  pageSize: number
) {
  return useQuery({
    queryKey: ["customers", filters, sort, page, pageSize],
    queryFn: () => fetchCustomers(filters, sort, page, pageSize),
  });
}
