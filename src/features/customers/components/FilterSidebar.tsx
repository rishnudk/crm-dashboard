"use client";

import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CustomerIndustry, CustomerStatus } from "../types/customer";
import { INDUSTRY_OPTIONS, STATUS_OPTIONS, StatusOption } from "../constants";

interface FilterSidebarProps {
  statusFilter: CustomerStatus[];
  onStatusChange: (status: CustomerStatus[]) => void;
  industryFilter: CustomerIndustry[];
  onIndustryChange: (industry: CustomerIndustry[]) => void;
  onReset: () => void;
}

export function FilterSidebar({
  statusFilter,
  onStatusChange,
  industryFilter,
  onIndustryChange,
  onReset,
}: FilterSidebarProps) {
  const activeCount = statusFilter.length + industryFilter.length;

  const toggleStatus = (status: CustomerStatus) => {
    if (statusFilter.includes(status)) {
      onStatusChange(statusFilter.filter((s) => s !== status));
    } else {
      onStatusChange([...statusFilter, status]);
    }
  };

  const toggleIndustry = (industry: CustomerIndustry) => {
    if (industryFilter.includes(industry)) {
      onIndustryChange(industryFilter.filter((i) => i !== industry));
    } else {
      onIndustryChange([...industryFilter, industry]);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Filter Popover */}
      <Popover>
        <PopoverTrigger className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
          <Filter className="mr-2 h-4 w-4" />
          Filter
          {activeCount > 0 && (
            <Badge variant="secondary" className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
              {activeCount}
            </Badge>
          )}
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4 space-y-4" align="start">
          {/* Status Filter Section */}
          <div>
            <h4 className="font-semibold text-sm mb-2">Status</h4>
            <div className="flex flex-wrap gap-2">
              {STATUS_OPTIONS.map((opt: StatusOption) => {
                const selected = statusFilter.includes(opt.value);
                return (
                  <Badge
                    key={opt.value}
                    variant={selected ? "default" : "outline"}
                    className="cursor-pointer select-none"
                    onClick={() => toggleStatus(opt.value)}
                  >
                    {opt.label}
                  </Badge>
                );
              })}
            </div>
          </div>

          {/* Industry Filter Section */}
          <div>
            <h4 className="font-semibold text-sm mb-2">Industry</h4>
            <div className="flex flex-wrap gap-2">
              {INDUSTRY_OPTIONS.map((ind: CustomerIndustry) => {
                const selected = industryFilter.includes(ind);
                return (
                  <Badge
                    key={ind}
                    variant={selected ? "default" : "outline"}
                    className="cursor-pointer select-none"
                    onClick={() => toggleIndustry(ind)}
                  >
                    {ind}
                  </Badge>
                );
              })}
            </div>
          </div>

          {/* Reset Filters */}
          {activeCount > 0 && (
            <div className="pt-2 border-t flex justify-end">
              <Button variant="ghost" size="sm" onClick={onReset} className="h-8 text-xs text-muted-foreground">
                Reset All
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>

      {/* Active Filter Chips */}
      {statusFilter.map((s) => (
        <Badge key={s} variant="secondary" className="gap-1 px-2.5 py-1">
          Status: {s}
          <X className="h-3 w-3 cursor-pointer" onClick={() => toggleStatus(s)} />
        </Badge>
      ))}

      {industryFilter.map((i) => (
        <Badge key={i} variant="secondary" className="gap-1 px-2.5 py-1">
          Industry: {i}
          <X className="h-3 w-3 cursor-pointer" onClick={() => toggleIndustry(i)} />
        </Badge>
      ))}

      {/* Clear All Button */}
      {activeCount > 0 && (
        <Button variant="ghost" size="sm" onClick={onReset} className="h-8 text-xs text-muted-foreground hover:text-foreground">
          Clear all
        </Button>
      )}
    </div>
  );
}
