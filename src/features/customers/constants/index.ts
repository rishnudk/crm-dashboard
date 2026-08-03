import { CustomerIndustry, CustomerStatus } from "../types/customer";

export const STATUS_OPTIONS: { label: string; value: CustomerStatus; variant: "default" | "secondary" | "outline" | "destructive" }[] = [
  { label: "Active", value: "Active", variant: "default" },
  { label: "Lead", value: "Lead", variant: "secondary" },
  { label: "Inactive", value: "Inactive", variant: "outline" },
];

export const INDUSTRY_OPTIONS: CustomerIndustry[] = [
  "Technology",
  "Healthcare",
  "Finance",
  "Retail",
  "Education",
  "Manufacturing",
];

export const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];
export const DEFAULT_PAGE_SIZE = 10;
