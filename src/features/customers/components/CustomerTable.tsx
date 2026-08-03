"use client";

import { Customer, SortConfig } from "../types/customer";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { STATUS_OPTIONS, StatusOption } from "../constants";
import { ArrowUpDown, ArrowUp, ArrowDown, MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface CustomerTableProps {
  data: Customer[];
  isLoading: boolean;
  sort: SortConfig;
  onSort: (column: SortConfig["column"]) => void;
}

export function CustomerTable({ data, isLoading, sort, onSort }: CustomerTableProps) {
  const getSortIcon = (column: SortConfig["column"]) => {
    if (sort.column !== column) return <ArrowUpDown className="ml-2 h-4 w-4" />;
    return sort.direction === "asc" ? (
      <ArrowUp className="ml-2 h-4 w-4 text-primary" />
    ) : (
      <ArrowDown className="ml-2 h-4 w-4 text-primary" />
    );
  };

  const getStatusBadge = (status: Customer["status"]) => {
    const opt = STATUS_OPTIONS.find((s: StatusOption) => s.value === status);
    return <Badge variant={opt?.variant || "default"}>{status}</Badge>;
  };

  if (isLoading) {
    return (
      <div className="rounded-md border bg-card p-4 space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="rounded-md border bg-card p-12 text-center">
        <p className="text-lg font-semibold text-muted-foreground">No customers found</p>
        <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or filter settings.</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="cursor-pointer select-none" onClick={() => onSort("name")}>
              <div className="flex items-center">
                Name {getSortIcon("name")}
              </div>
            </TableHead>
            <TableHead className="cursor-pointer select-none" onClick={() => onSort("email")}>
              <div className="flex items-center">
                Email {getSortIcon("email")}
              </div>
            </TableHead>
            <TableHead className="cursor-pointer select-none" onClick={() => onSort("company")}>
              <div className="flex items-center">
                Company {getSortIcon("company")}
              </div>
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Industry</TableHead>
            <TableHead className="cursor-pointer select-none" onClick={() => onSort("lastContact")}>
              <div className="flex items-center">
                Last Contact {getSortIcon("lastContact")}
              </div>
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((customer) => (
            <TableRow key={customer.id} className="hover:bg-muted/50 transition-colors">
              <TableCell className="font-medium">{customer.name}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.company}</TableCell>
              <TableCell>{getStatusBadge(customer.status)}</TableCell>
              <TableCell>{customer.industry}</TableCell>
              <TableCell>{new Date(customer.lastContact).toLocaleDateString()}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger className="inline-flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground focus-visible:outline-none">
                    <MoreHorizontal className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" /> View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
