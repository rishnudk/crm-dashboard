import { initialCustomers } from "./customers";
import {
  Customer,
  CustomerFilters,
  CustomerFormData,
  DashboardStats,
  PaginatedResponse,
  SortConfig,
} from "@/features/customers/types/customer";

let customersStore: Customer[] = [...initialCustomers];

export function getCustomersStore(
  filters?: CustomerFilters,
  sort?: SortConfig,
  page: number = 1,
  pageSize: number = 10
): PaginatedResponse<Customer> {
  let result = [...customersStore];

  // 1. Filter by global search query (matches name, email, or company)
  if (filters?.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.company.toLowerCase().includes(q)
    );
  }

  // 2. Filter by Status (Checkboxes)
  if (filters?.status && filters.status.length > 0) {
    result = result.filter((c) => filters.status!.includes(c.status));
  }

  // 3. Filter by Industry
  if (filters?.industry && filters.industry.length > 0) {
    result = result.filter((c) => filters.industry!.includes(c.industry));
  }

  // 4. Filter by Company (Multi-select)
  if (filters?.company && filters.company.length > 0) {
    result = result.filter((c) => filters.company!.includes(c.company));
  }

  // 5. Filter by Phone Number (Partial match)
  if (filters?.phone) {
    const p = filters.phone.toLowerCase().replace(/\D/g, "");
    result = result.filter((c) =>
      c.phone.toLowerCase().replace(/\D/g, "").includes(p)
    );
  }

  // 6. Filter by Email (Partial match)
  if (filters?.email) {
    const e = filters.email.toLowerCase();
    result = result.filter((c) => c.email.toLowerCase().includes(e));
  }

  // 7. Filter by Date Range (Last Contact)
  if (filters?.dateRange?.from) {
    const fromDate = new Date(filters.dateRange.from);
    result = result.filter((c) => new Date(c.lastContact) >= fromDate);
  }
  if (filters?.dateRange?.to) {
    const toDate = new Date(filters.dateRange.to);
    toDate.setHours(23, 59, 59, 999);
    result = result.filter((c) => new Date(c.lastContact) <= toDate);
  }

  // 8. Sort
  if (sort) {
    result.sort((a, b) => {
      const aVal = a[sort.column] ?? "";
      const bVal = b[sort.column] ?? "";
      if (aVal < bVal) return sort.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sort.direction === "asc" ? 1 : -1;
      return 0;
    });
  } else {
    // Default sort by position (for drag and drop)
    result.sort((a, b) => a.position - b.position);
  }

  // 9. Pagination
  const total = result.length;
  const totalPages = Math.ceil(total / pageSize) || 1;
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = result.slice(startIndex, startIndex + pageSize);

  return {
    data: paginatedData,
    total,
    page: currentPage,
    pageSize,
    totalPages,
  };
}

export function getCustomerByIdStore(id: string): Customer | null {
  return customersStore.find((c) => c.id === id) || null;
}

export function createCustomerStore(data: CustomerFormData): Customer {
  customersStore.forEach((c) => {
    c.position += 1;
  });

  const newCustomer: Customer = {
    ...data,
    id: `cust-${Date.now()}`,
    lastContact: new Date().toISOString(),
    position: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  customersStore.unshift(newCustomer);
  return newCustomer;
}

export function updateCustomerStore(
  id: string,
  data: Partial<CustomerFormData>
): Customer {
  const index = customersStore.findIndex((c) => c.id === id);
  if (index === -1) throw new Error("Customer not found");

  const updated: Customer = {
    ...customersStore[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };
  customersStore[index] = updated;
  return updated;
}

export function deleteCustomerStore(id: string): void {
  customersStore = customersStore.filter((c) => c.id !== id);
}

export function updateLastContactStore(id: string): Customer {
  const index = customersStore.findIndex((c) => c.id === id);
  if (index === -1) throw new Error("Customer not found");
  customersStore[index] = {
    ...customersStore[index],
    lastContact: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  return customersStore[index];
}

export function getCompaniesStore(): string[] {
  const companies = customersStore.map((c) => c.company);
  return Array.from(new Set(companies));
}

export function getDashboardStatsStore(): DashboardStats {
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  return {
    totalCustomers: customersStore.length,
    activeCustomers: customersStore.filter((c) => c.status === "Active").length,
    inactiveCustomers: customersStore.filter((c) => c.status === "Inactive").length,
    leads: customersStore.filter((c) => c.status === "Lead").length,
    prospects: customersStore.filter((c) => c.status === "Prospect").length,
    churned: customersStore.filter((c) => c.status === "Churned").length,
    newThisMonth: customersStore.filter(
      (c) => new Date(c.createdAt) >= firstDayOfMonth
    ).length,
  };
}

export function reorderCustomersStore(
  activeId: string,
  overId: string
): Customer[] {
  const oldIndex = customersStore.findIndex((c) => c.id === activeId);
  const newIndex = customersStore.findIndex((c) => c.id === overId);

  if (oldIndex !== -1 && newIndex !== -1) {
    const [moved] = customersStore.splice(oldIndex, 1);
    customersStore.splice(newIndex, 0, moved);
    // Update position index
    customersStore.forEach((c, idx) => {
      c.position = idx;
    });
  }

  return [...customersStore];
}
