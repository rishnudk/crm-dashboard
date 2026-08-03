import { describe, it, expect } from "vitest";
import {
  createCustomerStore,
  updateCustomerStore,
  deleteCustomerStore,
  getCustomerByIdStore,
  getCustomersStore,
} from "../store";
import { CustomerFormData } from "@/features/customers/types/customer";

describe("CRUD Store Logic Unit Tests", () => {
  it("should CREATE a new customer and prepend it to the list", () => {
    const newCustomerData: CustomerFormData = {
      name: "Jane Doe",
      email: "jane.doe@acme.com",
      phone: "+1 (555) 999-0000",
      company: "Acme Corp",
      status: "Active",
      industry: "Technology",
      priority: 5,
      notes: "VIP customer",
    };

    const created = createCustomerStore(newCustomerData);

    expect(created.id).toBeDefined();
    expect(created.name).toBe("Jane Doe");
    expect(created.email).toBe("jane.doe@acme.com");
    expect(created.createdAt).toBeDefined();

    // Verify it is prepended to the customer list
    const customers = getCustomersStore();
    expect(customers.data[0].id).toBe(created.id);
  });

  it("should UPDATE an existing customer details", () => {
    // Get an existing customer (cust-2)
    const existing = getCustomerByIdStore("cust-2");
    expect(existing).not.toBeNull();

    const updated = updateCustomerStore("cust-2", {
      name: "Sarah Chen-Smith",
      company: "BioHealth Global",
      status: "Inactive",
    });

    expect(updated.name).toBe("Sarah Chen-Smith");
    expect(updated.company).toBe("BioHealth Global");
    expect(updated.status).toBe("Inactive");

    // Verify update persisted in store
    const fetched = getCustomerByIdStore("cust-2");
    expect(fetched?.name).toBe("Sarah Chen-Smith");
  });

  it("should DELETE a customer from the store", () => {
    // Ensure customer exists before deletion
    const before = getCustomerByIdStore("cust-4");
    expect(before).not.toBeNull();

    deleteCustomerStore("cust-4");

    // Verify customer no longer exists
    const after = getCustomerByIdStore("cust-4");
    expect(after).toBeNull();
  });
});
