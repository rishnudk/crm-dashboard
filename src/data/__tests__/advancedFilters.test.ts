import { describe, it, expect } from "vitest";
import { getCustomersStore } from "../store";

describe("Advanced Filters Unit Tests", () => {
  it("should filter customers by Status checkboxes", () => {
    const result = getCustomersStore({ status: ["Active"] });
    expect(result.data.length).toBeGreaterThan(0);
    expect(result.data.every((c) => c.status === "Active")).toBe(true);
  });

  it("should filter customers by Company multi-select", () => {
    const result = getCustomersStore({ company: ["TechCorp Industries"] });
    expect(result.data.length).toBeGreaterThan(0);
    expect(result.data.every((c) => c.company === "TechCorp Industries")).toBe(true);
  });

  it("should filter customers by Phone partial match", () => {
    const result = getCustomersStore({ phone: "876-5432" });
    expect(result.data.length).toBe(1);
    expect(result.data[0].name).toBe("Sarah Chen");
  });

  it("should filter customers by Email partial match", () => {
    const result = getCustomersStore({ email: "dross@" });
    expect(result.data.length).toBe(1);
    expect(result.data[0].name).toBe("David Ross");
  });

  it("should filter customers by Date Range (Last Contact)", () => {
    const result = getCustomersStore({
      dateRange: {
        from: "2026-08-01",
        to: "2026-08-03",
      },
    });
    expect(result.data.length).toBeGreaterThan(0);
    expect(
      result.data.every((c) => {
        const d = new Date(c.lastContact);
        return d >= new Date("2026-08-01") && d <= new Date("2026-08-03T23:59:59");
      })
    ).toBe(true);
  });
});
