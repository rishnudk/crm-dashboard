"use client";

import { useCustomerFilters } from "@/features/customers/hooks/useCustomerFilters";
import { useCustomers } from "@/features/customers/hooks/useCustomers";
import { CustomerTable } from "@/features/customers/components/CustomerTable";
import { Pagination } from "@/components/Pagination";
import { SearchBar } from "@/components/SearchBar";
import { FilterSidebar } from "@/features/customers/components/FilterSidebar";

export default function CustomersPage() {
  const {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    industryFilter,
    setIndustryFilter,
    filters,
    sort,
    setSort,
    page,
    setPage,
    pageSize,
    setPageSize,
    resetFilters,
  } = useCustomerFilters();

  const { data, isLoading } = useCustomers(filters, sort, page, pageSize);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Customers</h2>
          <p className="text-muted-foreground">Manage your client relationships and accounts.</p>
        </div>
      </div>

      {/* Toolbar: Search and Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <SearchBar value={search} onChange={setSearch} />
        <FilterSidebar
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          industryFilter={industryFilter}
          onIndustryChange={setIndustryFilter}
          onReset={resetFilters}
        />
      </div>

      <CustomerTable
        data={data?.data || []}
        isLoading={isLoading}
        sort={sort}
        onSort={setSort}
      />

      {data && (
        <Pagination
          page={data.page}
          pageSize={data.pageSize}
          total={data.total}
          totalPages={data.totalPages}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
      )}
    </div>
  );
}
