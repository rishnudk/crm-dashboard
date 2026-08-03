export type CustomerStatus = "Active" | "Inactive" | "Lead";

export type CustomerIndustry =
  | "Technology"
  | "Healthcare"
  | "Finance"
  | "Retail"
  | "Education"
  | "Manufacturing";

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: CustomerStatus;
  industry: CustomerIndustry;
  lastContact: string; // ISO date string
  priority: number; // 1 to 5
  notes?: string;
  position: number; // for drag-and-drop ordering
  createdAt: string;
  updatedAt: string;
}

export type CustomerFormData = Omit<
  Customer,
  "id" | "position" | "createdAt" | "updatedAt" | "lastContact"
>;

export interface CustomerFilters {
  search?: string;
  status?: CustomerStatus[];
  industry?: CustomerIndustry[];
  dateRange?: {
    from?: string;
    to?: string;
  };
}

export interface SortConfig {
  column: keyof Customer;
  direction: "asc" | "desc";
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface DashboardStats {
  totalCustomers: number;
  activeCustomers: number;
  inactiveCustomers: number;
  leads: number;
  newThisMonth: number;
}
