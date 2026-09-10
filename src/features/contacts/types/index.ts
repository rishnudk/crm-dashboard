export type ContactStatus = "Active" | "Lead" | "Prospect" | "Customer" | "Inactive";

export type ContactChannel = "WhatsApp" | "Email" | "Phone" | "LinkedIn";

export interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  company: string;
  designation: string;
  city: string;
  state: string;
  status: ContactStatus;
  primaryChannel: ContactChannel;
  whatsappVerified: boolean;
  tags: string[];
  dealValue: string; // e.g. "₹14.5 L"
  dealValueRaw: number; // in Rupees for sorting/filtering
  lastContact: string; // ISO date
  avatarColor?: string;
  notes?: string;
  createdAt: string;
}

export interface ContactStats {
  total: number;
  whatsappVerified: number;
  activeLeads: number;
  totalPipelineValue: string;
}

export type ContactSortColumn =
  | "name"
  | "company"
  | "city"
  | "dealValueRaw"
  | "lastContact"
  | "status";

export interface ContactSortConfig {
  column: ContactSortColumn;
  direction: "asc" | "desc";
}
