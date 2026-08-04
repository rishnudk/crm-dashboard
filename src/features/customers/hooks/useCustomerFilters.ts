import { useState, useEffect } from "react";
import {
  CustomerFilters,
  CustomerIndustry,
  CustomerStatus,
  SavedFilterPreset,
  SortConfig,
} from "../types/customer";
import { useDebounce } from "@/hooks/useDebounce";

const PREBUILT_TEMPLATES: SavedFilterPreset[] = [
  {
    id: "preset-active",
    name: "Active Customers",
    isPrebuilt: true,
    filters: { status: ["Active"] },
  },
  {
    id: "preset-recent",
    name: "Recent Contacts",
    isPrebuilt: true,
    filters: {
      dateRange: {
        from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
      },
    },
  },
  {
    id: "preset-inactive-leads",
    name: "Inactive Leads",
    isPrebuilt: true,
    filters: { status: ["Inactive", "Lead"] },
  },
];

export function useCustomerFilters() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<CustomerStatus[]>([]);
  const [industryFilter, setIndustryFilter] = useState<CustomerIndustry[]>([]);
  const [companyFilter, setCompanyFilter] = useState<string[]>([]);
  const [phoneFilter, setPhoneFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [savedPresets, setSavedPresets] = useState<SavedFilterPreset[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("nexus_saved_filters");
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          // fallback
        }
      }
    }
    return [];
  });

  const [sort, setSort] = useState<SortConfig>({
    column: "position",
    direction: "asc",
  });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const debouncedSearch = useDebounce(search, 300);
  const debouncedPhone = useDebounce(phoneFilter, 300);
  const debouncedEmail = useDebounce(emailFilter, 300);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("nexus_saved_filters", JSON.stringify(savedPresets));
    }
  }, [savedPresets]);

  const filters: CustomerFilters = {
    search: debouncedSearch,
    status: statusFilter,
    industry: industryFilter,
    company: companyFilter,
    phone: debouncedPhone,
    email: debouncedEmail,
    dateRange: {
      from: fromDate || undefined,
      to: toDate || undefined,
    },
  };

  const activeCount =
    (statusFilter.length > 0 ? 1 : 0) +
    (industryFilter.length > 0 ? 1 : 0) +
    (companyFilter.length > 0 ? 1 : 0) +
    (debouncedPhone ? 1 : 0) +
    (debouncedEmail ? 1 : 0) +
    (fromDate || toDate ? 1 : 0);

  const handleSort = (column: SortConfig["column"]) => {
    setSort((prev: SortConfig) => ({
      column,
      direction:
        prev.column === column && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const applyPreset = (preset: SavedFilterPreset) => {
    setStatusFilter(preset.filters.status || []);
    setIndustryFilter(preset.filters.industry || []);
    setCompanyFilter(preset.filters.company || []);
    setPhoneFilter(preset.filters.phone || "");
    setEmailFilter(preset.filters.email || "");
    setFromDate(preset.filters.dateRange?.from || "");
    setToDate(preset.filters.dateRange?.to || "");
    setPage(1);
  };

  const saveCustomFilter = (name: string) => {
    if (!name.trim()) return;
    const newPreset: SavedFilterPreset = {
      id: `custom-${Date.now()}`,
      name: name.trim(),
      filters: {
        status: statusFilter,
        industry: industryFilter,
        company: companyFilter,
        phone: phoneFilter,
        email: emailFilter,
        dateRange: { from: fromDate, to: toDate },
      },
    };
    setSavedPresets((prev) => [...prev, newPreset]);
  };

  const deleteSavedFilter = (id: string) => {
    setSavedPresets((prev) => prev.filter((p) => p.id !== id));
  };

  const resetFilters = () => {
    setSearch("");
    setStatusFilter([]);
    setIndustryFilter([]);
    setCompanyFilter([]);
    setPhoneFilter("");
    setEmailFilter("");
    setFromDate("");
    setToDate("");
    setPage(1);
  };

  return {
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
    sort,
    setSort: handleSort,
    setSortState: setSort,
    page,
    setPage,
    pageSize,
    setPageSize,
    filters,
    activeCount,
    prebuiltTemplates: PREBUILT_TEMPLATES,
    savedPresets,
    applyPreset,
    saveCustomFilter,
    deleteSavedFilter,
    resetFilters,
  };
}
