"use client";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { Customer, SortConfig } from "../types/customer";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { SortableTableRow } from "./SortableTableRow";

interface CustomerTableProps {
  data: Customer[];
  isLoading: boolean;
  sort: SortConfig;
  onSort: (column: SortConfig["column"]) => void;
  onView: (customer: Customer) => void;
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
  onUpdateContact: (id: string) => void;
  onReorder?: (activeId: string, overId: string) => void;
}

export function CustomerTable({
  data,
  isLoading,
  sort,
  onSort,
  onView,
  onEdit,
  onDelete,
  onUpdateContact,
  onReorder,
}: CustomerTableProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id && onReorder) {
      onReorder(String(active.id), String(over.id));
    }
  };

  const getSortIcon = (column: SortConfig["column"]) => {
    if (sort.column !== column) return <ArrowUpDown className="ml-1 h-3.5 w-3.5" />;
    return sort.direction === "asc" ? (
      <ArrowUp className="ml-1 h-3.5 w-3.5 text-primary" />
    ) : (
      <ArrowDown className="ml-1 h-3.5 w-3.5 text-primary" />
    );
  };

  if (isLoading) {
    return (
      <div className="rounded-md border bg-card p-4 space-y-3">
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="rounded-md border bg-card p-12 text-center">
        <p className="text-lg font-semibold text-muted-foreground">
          No customers found
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          Try adjusting your search or filter settings.
        </p>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={handleDragEnd}
    >
      <div className="rounded-md border bg-card overflow-x-auto">
        <Table className="min-w-[800px]">
          <TableHeader>
            <TableRow>
              <TableHead className="w-10" />
              <TableHead
                className="cursor-pointer select-none"
                onClick={() => onSort("name")}
              >
                <div className="flex items-center">
                  Name {getSortIcon("name")}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer select-none"
                onClick={() => onSort("email")}
              >
                <div className="flex items-center">
                  Email {getSortIcon("email")}
                </div>
              </TableHead>
              <TableHead>Phone</TableHead>
              <TableHead
                className="cursor-pointer select-none"
                onClick={() => onSort("company")}
              >
                <div className="flex items-center">
                  Company {getSortIcon("company")}
                </div>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead
                className="cursor-pointer select-none"
                onClick={() => onSort("lastContact")}
              >
                <div className="flex items-center">
                  Last Contact {getSortIcon("lastContact")}
                </div>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <SortableContext
              items={data.map((c) => c.id)}
              strategy={verticalListSortingStrategy}
            >
              {data.map((customer) => (
                <SortableTableRow
                  key={customer.id}
                  customer={customer}
                  onView={onView}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onUpdateContact={onUpdateContact}
                />
              ))}
            </SortableContext>
          </TableBody>
        </Table>
      </div>
    </DndContext>
  );
}
