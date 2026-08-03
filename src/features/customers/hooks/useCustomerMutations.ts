import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createCustomer,
  updateCustomer,
  deleteCustomer,
  reorderCustomers,
  updateLastContact,
} from "../api/customerApi";
import { CustomerFormData } from "../types/customer";
import { toast } from "sonner";

export function useCreateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CustomerFormData) => createCustomer(data),
    onSuccess: (newCustomer) => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
      toast.success(`Customer "${newCustomer.name}" created successfully`);
    },
    onError: () => {
      toast.error("Failed to create customer");
    },
  });
}

export function useUpdateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CustomerFormData> }) =>
      updateCustomer(id, data),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
      toast.success(`Customer "${updated.name}" updated successfully`);
    },
    onError: () => {
      toast.error("Failed to update customer");
    },
  });
}

export function useDeleteCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCustomer(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
      toast.success("Customer deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete customer");
    },
  });
}

export function useReorderCustomers() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ activeId, overId }: { activeId: string; overId: string }) =>
      reorderCustomers(activeId, overId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast.success("Table reordered");
    },
  });
}

export function useUpdateLastContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => updateLastContact(id),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
      toast.success(`Last contact updated for "${updated.name}"`);
    },
    onError: () => {
      toast.error("Failed to update last contact date");
    },
  });
}
