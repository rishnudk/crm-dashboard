"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TableRow, TableCell } from "@/components/ui/table";
import { Customer } from "../types/customer";
import { GripVertical, MoreHorizontal, Edit, Trash2, Phone, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { STATUS_OPTIONS, StatusOption } from "../constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SortableTableRowProps {
  customer: Customer;
  onView: (customer: Customer) => void;
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
  onUpdateContact: (id: string) => void;
}

export function SortableTableRow({
  customer,
  onView,
  onEdit,
  onDelete,
  onUpdateContact,
}: SortableTableRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: customer.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const getStatusBadge = (status: Customer["status"]) => {
    const opt = STATUS_OPTIONS.find((s: StatusOption) => s.value === status);
    return <Badge variant={opt?.variant || "default"}>{status}</Badge>;
  };

  // Format date as DD-MM-YYYY (Day-Month-Year)
  const formatDateDDMMYYYY = (isoString: string) => {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return isoString;
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <TableRow
      ref={setNodeRef}
      style={style}
      className="hover:bg-muted/50 transition-colors cursor-pointer"
    >
      <TableCell className="w-10">
        <button
          type="button"
          className="cursor-grab active:cursor-grabbing p-1 hover:bg-accent rounded text-muted-foreground"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-4 w-4" />
        </button>
      </TableCell>
      <TableCell
        className="font-medium hover:text-primary transition-colors"
        onClick={() => onView(customer)}
      >
        {customer.name}
      </TableCell>
      <TableCell className="text-muted-foreground">{customer.email}</TableCell>
      <TableCell className="text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Phone className="h-3 w-3 text-muted-foreground/60 shrink-0" />
          {customer.phone}
        </span>
      </TableCell>
      <TableCell>{customer.company}</TableCell>
      <TableCell>{getStatusBadge(customer.status)}</TableCell>
      <TableCell className="text-muted-foreground">{customer.industry}</TableCell>
      <TableCell className="whitespace-nowrap font-mono text-xs text-muted-foreground">
        {formatDateDDMMYYYY(customer.lastContact)}
      </TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger className="inline-flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground focus-visible:outline-none">
            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onView(customer)}>
              <MoreHorizontal className="mr-2 h-4 w-4" /> View Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit(customer)}>
              <Edit className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onUpdateContact(customer.id)}>
              <Clock className="mr-2 h-4 w-4" /> Mark Contacted Today
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => onDelete(customer)}
            >
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
