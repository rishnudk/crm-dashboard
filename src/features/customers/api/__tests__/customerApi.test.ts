import { describe, it, expect } from "vitest";
import {
  createCustomer,
  updateCustomer,
  deleteCustomer,
  fetchCustomerById,
  fetchCustomers,
} from "../customerApi";
import { CustomerFormData } from "../../types/customer";

describe("Customer API Async Layer Tests", () => {
  it("should create a customer via async API", async () => {
    const payload: CustomerFormData = {
      name: "Michael Scott",
      email: "m.scott@dundermifflin.com",
      phone: "+1 (555) 111-2222",
      company: "Dunder Mifflin",
      status: "Active",
      industry: "Retail",
      priority: 4,
      notes: "Regional Manager",
    };

    const created = await createCustomer(payload);

    expect(created.id).toBeDefined();
    expect(created.name).toBe("Michael Scott");

    const fetched = await fetchCustomerById(created.id);
    expect(fetched?.company).toBe("Dunder Mifflin");
  });

  it("should update a customer via async API", async () => {
    const updated = await updateCustomer("cust-1", {
      name: "Alex Morgan Updated",
      priority: 1,
    });

    expect(updated.name).toBe("Alex Morgan Updated");

    const list = await fetchCustomers({ search: "Morgan Updated" });
    expect(list.data.length).toBeGreaterThan(0);
    expect(list.data[0].name).toBe("Alex Morgan Updated");
  });

  it("should delete a customer via async API", async () => {
    // Delete cust-3
    await deleteCustomer("cust-3");

    const fetched = await fetchCustomerById("cust-3");
    expect(fetched).toBeNull();
  });
});
