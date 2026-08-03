import {
  createCustomerStore,
  deleteCustomerStore,
  getCompaniesStore,
  getCustomerByIdStore,
  getCustomersStore,
  getDashboardStatsStore,
  reorderCustomersStore,
  updateCustomerStore,
  updateLastContactStore,
} from "@/data/store";
import {
  Customer,
  CustomerFilters,
  CustomerFormData,
  DashboardStats,
  PaginatedResponse,
  SortConfig,
} from "../types/customer";

const DELAY_MS = 300;

function delay<T>(data: T, ms: number = DELAY_MS): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

export async function fetchCustomers(
  filters?: CustomerFilters,
  sort?: SortConfig,
  page: number = 1,
  pageSize: number = 10
): Promise<PaginatedResponse<Customer>> {
  const result = getCustomersStore(filters, sort, page, pageSize);
  return delay(result);
}

export async function fetchCustomerById(id: string): Promise<Customer | null> {
  const customer = getCustomerByIdStore(id);
  return delay(customer);
}

export async function createCustomer(
  data: CustomerFormData
): Promise<Customer> {
  const created = createCustomerStore(data);
  return delay(created);
}

export async function updateCustomer(
  id: string,
  data: Partial<CustomerFormData>
): Promise<Customer> {
  const updated = updateCustomerStore(id, data);
  return delay(updated);
}

export async function deleteCustomer(id: string): Promise<void> {
  deleteCustomerStore(id);
  return delay(undefined);
}

export async function updateLastContact(id: string): Promise<Customer> {
  const updated = updateLastContactStore(id);
  return delay(updated);
}

export async function fetchCompanies(): Promise<string[]> {
  const companies = getCompaniesStore();
  return delay(companies);
}

export async function fetchDashboardStats(): Promise<DashboardStats> {
  const stats = getDashboardStatsStore();
  return delay(stats);
}

export async function reorderCustomers(
  activeId: string,
  overId: string
): Promise<Customer[]> {
  const reordered = reorderCustomersStore(activeId, overId);
  return delay(reordered);
}
