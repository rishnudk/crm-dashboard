"use client";

import { useCustomerFilters } from "@/features/customers/hooks/useCustomerFilters";
import { useCustomers } from "@/features/customers/hooks/useCustomers";
import { CustomerTable } from "@/features/customers/components/CustomerTable";
import { Pagination } from "@/components/Pagination";

export default function CustomersPage() {
  const {
    filters,
    sort,
    setSort,
    page,
    setPage,
    pageSize,
    setPageSize,
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
