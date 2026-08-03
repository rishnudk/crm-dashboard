import { CustomerIndustry, CustomerStatus } from "../types/customer";

export interface StatusOption {
  label: string;
  value: CustomerStatus;
  variant: "default" | "secondary" | "outline" | "destructive";
}

export const STATUS_OPTIONS: StatusOption[] = [
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

export const PAGE_SIZE_OPTIONS: number[] = [10, 25, 50];
export const DEFAULT_PAGE_SIZE: number = 10;
