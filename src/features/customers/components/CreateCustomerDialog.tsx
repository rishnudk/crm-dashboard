"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { UserPlus } from "lucide-react";
import { CustomerForm } from "./CustomerForm";
import { useCreateCustomer } from "../hooks/useCustomerMutations";
import { CustomerFormValues } from "../schemas/customerSchema";

export function CreateCustomerDialog() {
  const [open, setOpen] = useState(false);
  const createMutation = useCreateCustomer();

  const handleSubmit = (values: CustomerFormValues) => {
    createMutation.mutate(values, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="inline-flex h-9 w-full sm:w-auto items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none">
        <UserPlus className="h-4 w-4" /> Add Customer
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Customer</DialogTitle>
        </DialogHeader>
        <CustomerForm onSubmit={handleSubmit} isLoading={createMutation.isPending} />
      </DialogContent>
    </Dialog>
  );
}
