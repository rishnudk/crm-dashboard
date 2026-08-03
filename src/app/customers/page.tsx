"use client";

import { useState } from "react";
import { useCustomerFilters } from "@/features/customers/hooks/useCustomerFilters";
import { useCustomers } from "@/features/customers/hooks/useCustomers";
import { CustomerTable } from "@/features/customers/components/CustomerTable";
import { Pagination } from "@/components/Pagination";
import { SearchBar } from "@/components/SearchBar";
import { FilterSidebar } from "@/features/customers/components/FilterSidebar";
import { CreateCustomerDialog } from "@/features/customers/components/CreateCustomerDialog";
import { DeleteDialog } from "@/features/customers/components/DeleteDialog";
import { Customer } from "@/features/customers/types/customer";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CustomerForm } from "@/features/customers/components/CustomerForm";
import { useUpdateCustomer } from "@/features/customers/hooks/useCustomerMutations";
import { CustomerFormValues } from "@/features/customers/schemas/customerSchema";

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
  const updateMutation = useUpdateCustomer();

  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [deletingCustomer, setDeletingCustomer] = useState<Customer | null>(null);

  const handleUpdate = (values: CustomerFormValues) => {
    if (!editingCustomer) return;
    updateMutation.mutate(
      { id: editingCustomer.id, data: values },
      {
        onSuccess: () => {
          setEditingCustomer(null);
        },
      }
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Customers</h2>
          <p className="text-muted-foreground">Manage your client relationships and accounts.</p>
        </div>
        <CreateCustomerDialog />
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
        onEdit={(customer) => setEditingCustomer(customer)}
        onDelete={(customer) => setDeletingCustomer(customer)}
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

      {/* Edit Customer Dialog */}
      <Dialog open={!!editingCustomer} onOpenChange={(open) => !open && setEditingCustomer(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Customer</DialogTitle>
          </DialogHeader>
          {editingCustomer && (
            <CustomerForm
              initialValues={editingCustomer}
              onSubmit={handleUpdate}
              isLoading={updateMutation.isPending}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <DeleteDialog
        customerId={deletingCustomer?.id || null}
        customerName={deletingCustomer?.name || null}
        onClose={() => setDeletingCustomer(null)}
      />
    </div>
  );
}
