import { describe, it, expect } from "vitest";
import { getCustomersStore, reorderCustomersStore } from "../store";

describe("Drag & Drop Store Logic", () => {
  it("should reorder customers correctly when activeId is dropped over overId", () => {
    // Fetch current customer list
    const initial = getCustomersStore(undefined, undefined, 1, 10);
    const firstCustomer = initial.data[0];
    const secondCustomer = initial.data[1];

    expect(firstCustomer.id).toBe("cust-1");
    expect(secondCustomer.id).toBe("cust-2");

    // Drag cust-1 over cust-2
    reorderCustomersStore("cust-1", "cust-2");

    // Fetch updated customer list
    const updated = getCustomersStore(undefined, undefined, 1, 10);

    expect(updated.data[0].id).toBe("cust-2");
    expect(updated.data[1].id).toBe("cust-1");
  });
});
