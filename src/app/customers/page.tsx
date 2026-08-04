"use client";

import { useState } from "react";
import { useCustomerFilters } from "@/features/customers/hooks/useCustomerFilters";
import { useCustomers } from "@/features/customers/hooks/useCustomers";
import { CustomerTable } from "@/features/customers/components/CustomerTable";
import { CustomerDetailDrawer } from "@/features/customers/components/CustomerDetailDrawer";
import { Pagination } from "@/components/Pagination";
import { SearchBar } from "@/components/SearchBar";
import { FilterSidebar } from "@/features/customers/components/FilterSidebar";
import { CreateCustomerDialog } from "@/features/customers/components/CreateCustomerDialog";
import { DeleteDialog } from "@/features/customers/components/DeleteDialog";
import { Customer } from "@/features/customers/types/customer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CustomerForm } from "@/features/customers/components/CustomerForm";
import {
  useUpdateCustomer,
  useReorderCustomers,
  useUpdateLastContact,
} from "@/features/customers/hooks/useCustomerMutations";
import { CustomerFormValues } from "@/features/customers/schemas/customerSchema";

export default function CustomersPage() {
  const {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    industryFilter,
    setIndustryFilter,
    companyFilter,
    setCompanyFilter,
    phoneFilter,
    setPhoneFilter,
    emailFilter,
    setEmailFilter,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    filters,
    activeCount,
    prebuiltTemplates,
    savedPresets,
    applyPreset,
    saveCustomFilter,
    deleteSavedFilter,
    sort,
    setSort,
    setSortState,
    page,
    setPage,
    pageSize,
    setPageSize,
    resetFilters,
  } = useCustomerFilters();

  const { data, isLoading } = useCustomers(filters, sort, page, pageSize);
  const updateMutation = useUpdateCustomer();
  const reorderMutation = useReorderCustomers();
  const updateContactMutation = useUpdateLastContact();

  const [viewingCustomer, setViewingCustomer] = useState<Customer | null>(null);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [deletingCustomer, setDeletingCustomer] = useState<Customer | null>(null);

  const handleUpdate = (values: CustomerFormValues) => {
    if (!editingCustomer) return;
    updateMutation.mutate(
      { id: editingCustomer.id, data: values },
      { onSuccess: () => setEditingCustomer(null) }
    );
  };

  const handleReorder = (activeId: string, overId: string) => {
    setSortState({ column: "position", direction: "asc" });
    reorderMutation.mutate({ activeId, overId });
  };

  const handleUpdateContact = (id: string) => {
    updateContactMutation.mutate(id);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Customers</h2>
          <p className="text-sm text-muted-foreground">
            Manage your client relationships and accounts.
          </p>
        </div>
        <div className="shrink-0">
          <CreateCustomerDialog />
        </div>
      </div>

      {/* Toolbar: Global Search and Advanced Filter Panel */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <SearchBar value={search} onChange={setSearch} />
        <FilterSidebar
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          industryFilter={industryFilter}
          onIndustryChange={setIndustryFilter}
          companyFilter={companyFilter}
          onCompanyChange={setCompanyFilter}
          phoneFilter={phoneFilter}
          onPhoneChange={setPhoneFilter}
          emailFilter={emailFilter}
          onEmailChange={setEmailFilter}
          fromDate={fromDate}
          onFromDateChange={setFromDate}
          toDate={toDate}
          onToDateChange={setToDate}
          activeCount={activeCount}
          prebuiltTemplates={prebuiltTemplates}
          savedPresets={savedPresets}
          onApplyPreset={applyPreset}
          onSaveCustomFilter={saveCustomFilter}
          onDeleteSavedFilter={deleteSavedFilter}
          onReset={resetFilters}
        />
      </div>

      <CustomerTable
        data={data?.data || []}
        isLoading={isLoading}
        sort={sort}
        onSort={setSort}
        onView={(customer) => setViewingCustomer(customer)}
        onEdit={(customer) => setEditingCustomer(customer)}
        onDelete={(customer) => setDeletingCustomer(customer)}
        onUpdateContact={handleUpdateContact}
        onReorder={handleReorder}
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

      {/* Customer Detail Drawer (read-only view) */}
      <CustomerDetailDrawer
        customer={viewingCustomer}
        open={!!viewingCustomer}
        onClose={() => setViewingCustomer(null)}
        onEdit={(customer) => {
          setViewingCustomer(null);
          setEditingCustomer(customer);
        }}
        onDelete={(customer) => {
          setViewingCustomer(null);
          setDeletingCustomer(customer);
        }}
        onUpdateContact={handleUpdateContact}
        isUpdatingContact={updateContactMutation.isPending}
      />

      {/* Edit Customer Dialog */}
      <Dialog
        open={!!editingCustomer}
        onOpenChange={(open) => !open && setEditingCustomer(null)}
      >
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
