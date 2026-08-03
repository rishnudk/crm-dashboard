"use client";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useDeleteCustomer } from "../hooks/useCustomerMutations";

interface DeleteDialogProps {
  customerId: string | null;
  customerName: string | null;
  onClose: () => void;
}

export function DeleteDialog({ customerId, customerName, onClose }: DeleteDialogProps) {
  const deleteMutation = useDeleteCustomer();

  const handleDelete = () => {
    if (!customerId) return;
    deleteMutation.mutate(customerId, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <AlertDialog open={!!customerId} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Customer</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete <span className="font-semibold text-foreground">{customerName}</span>? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            {deleteMutation.isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
