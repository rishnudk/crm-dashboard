import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CustomerTable } from "../CustomerTable";
import { Customer } from "../../types/customer";

const mockCustomers: Customer[] = [
  {
    id: "cust-1",
    name: "Alex Morgan",
    email: "alex@techcorp.com",
    phone: "555-1234",
    company: "TechCorp",
    status: "Active",
    industry: "Technology",
    lastContact: "2026-08-01T10:30:00Z",
    priority: 5,
    position: 0,
    createdAt: "2026-01-15T08:00:00Z",
    updatedAt: "2026-08-01T10:30:00Z",
  },
  {
    id: "cust-2",
    name: "Sarah Chen",
    email: "sarah@biohealth.org",
    phone: "555-5678",
    company: "BioHealth",
    status: "Active",
    industry: "Healthcare",
    lastContact: "2026-07-28T14:15:00Z",
    priority: 4,
    position: 1,
    createdAt: "2026-02-10T09:30:00Z",
    updatedAt: "2026-07-28T14:15:00Z",
  },
];

describe("CustomerTable Component Integration Test", () => {
  it("should render customer names and row action handles", () => {
    const handleReorder = vi.fn();
    const handleSort = vi.fn();
    const handleEdit = vi.fn();
    const handleDelete = vi.fn();

    render(
      <CustomerTable
        data={mockCustomers}
        isLoading={false}
        sort={{ column: "createdAt", direction: "desc" }}
        onSort={handleSort}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onReorder={handleReorder}
      />
    );

    // Verify customers are rendered in the table DOM
    expect(screen.getByText("Alex Morgan")).toBeInTheDocument();
    expect(screen.getByText("Sarah Chen")).toBeInTheDocument();
    expect(screen.getByText("TechCorp")).toBeInTheDocument();
    expect(screen.getByText("BioHealth")).toBeInTheDocument();
  });
});
