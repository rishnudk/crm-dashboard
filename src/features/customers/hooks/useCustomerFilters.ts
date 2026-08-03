import { useState } from "react";
import { CustomerFilters, CustomerIndustry, CustomerStatus, SortConfig } from "../types/customer";
import { useDebounce } from "@/hooks/useDebounce";

export function useCustomerFilters() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<CustomerStatus[]>([]);
  const [industryFilter, setIndustryFilter] = useState<CustomerIndustry[]>([]);
  const [sort, setSort] = useState<SortConfig>({ column: "createdAt", direction: "desc" });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const debouncedSearch = useDebounce(search, 300);

  const filters: CustomerFilters = {
    search: debouncedSearch,
    status: statusFilter,
    industry: industryFilter,
  };

  const handleSort = (column: SortConfig["column"]) => {
    setSort((prev: SortConfig) => ({
      column,
      direction: prev.column === column && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const resetFilters = () => {
    setSearch("");
    setStatusFilter([]);
    setIndustryFilter([]);
    setPage(1);
  };

  return {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    industryFilter,
    setIndustryFilter,
    sort,
    setSort: handleSort,
    page,
    setPage,
    pageSize,
    setPageSize,
    filters,
    resetFilters,
  };
}
