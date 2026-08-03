"use client";

import { useState } from "react";
import { Filter, X, Bookmark, Plus, Calendar, Phone, Mail, Building, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { CustomerIndustry, CustomerStatus, SavedFilterPreset } from "../types/customer";
import { INDUSTRY_OPTIONS, STATUS_OPTIONS, StatusOption } from "../constants";
import { useQuery } from "@tanstack/react-query";
import { fetchCompanies } from "../api/customerApi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface FilterSidebarProps {
  statusFilter: CustomerStatus[];
  onStatusChange: (status: CustomerStatus[]) => void;
  industryFilter: CustomerIndustry[];
  onIndustryChange: (industry: CustomerIndustry[]) => void;
  companyFilter: string[];
  onCompanyChange: (companies: string[]) => void;
  phoneFilter: string;
  onPhoneChange: (phone: string) => void;
  emailFilter: string;
  onEmailChange: (email: string) => void;
  fromDate: string;
  onFromDateChange: (date: string) => void;
  toDate: string;
  onToDateChange: (date: string) => void;
  activeCount: number;
  prebuiltTemplates: SavedFilterPreset[];
  savedPresets: SavedFilterPreset[];
  onApplyPreset: (preset: SavedFilterPreset) => void;
  onSaveCustomFilter: (name: string) => void;
  onDeleteSavedFilter: (id: string) => void;
  onReset: () => void;
}

export function FilterSidebar({
  statusFilter,
  onStatusChange,
  industryFilter,
  onIndustryChange,
  companyFilter,
  onCompanyChange,
  phoneFilter,
  onPhoneChange,
  emailFilter,
  onEmailChange,
  fromDate,
  onFromDateChange,
  toDate,
  onToDateChange,
  activeCount,
  prebuiltTemplates,
  savedPresets,
  onApplyPreset,
  onSaveCustomFilter,
  onDeleteSavedFilter,
  onReset,
}: FilterSidebarProps) {
  const [open, setOpen] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [filterNameInput, setFilterNameInput] = useState("");

  const { data: companies = [] } = useQuery({
    queryKey: ["companies"],
    queryFn: () => fetchCompanies(),
  });

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

  const toggleCompany = (company: string) => {
    if (companyFilter.includes(company)) {
      onCompanyChange(companyFilter.filter((c) => c !== company));
    } else {
      onCompanyChange([...companyFilter, company]);
    }
  };

  const handleSaveFilterSubmit = () => {
    if (filterNameInput.trim()) {
      onSaveCustomFilter(filterNameInput.trim());
      setFilterNameInput("");
      setSaveDialogOpen(false);
    }
  };

  const handleResetDate = () => {
    onFromDateChange("");
    onToDateChange("");
  };

  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        {/* Advanced Filters Sheet Trigger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="inline-flex h-9 w-full sm:w-auto items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground shadow-sm transition-colors">
            <Filter className="mr-2 h-4 w-4 text-primary" />
            Advanced Filters
            {activeCount > 0 && (
              <Badge variant="secondary" className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary text-primary-foreground">
                {activeCount}
              </Badge>
            )}
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:max-w-md p-6 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <SheetHeader className="px-0 pt-0">
                <SheetTitle className="flex items-center justify-between text-lg">
                  <span className="flex items-center gap-2">
                    <Filter className="h-5 w-5 text-primary" /> Advanced Filters
                  </span>
                  {activeCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={onReset} className="h-8 text-xs text-muted-foreground hover:text-foreground">
                      Reset All
                    </Button>
                  )}
                </SheetTitle>
              </SheetHeader>

              {/* 1. Pre-built Templates & Saved Custom Filters */}
              <div className="space-y-3">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1.5">
                  <Bookmark className="h-3.5 w-3.5 text-primary" /> Quick Presets & Templates
                </Label>
                <div className="flex flex-wrap gap-2">
                  {prebuiltTemplates.map((template) => (
                    <Badge
                      key={template.id}
                      variant="outline"
                      className="cursor-pointer hover:border-primary hover:bg-primary/10 transition-colors py-1 px-2.5"
                      onClick={() => onApplyPreset(template)}
                    >
                      {template.name}
                    </Badge>
                  ))}
                  {savedPresets.map((preset) => (
                    <Badge
                      key={preset.id}
                      variant="secondary"
                      className="cursor-pointer gap-1 py-1 px-2.5"
                      onClick={() => onApplyPreset(preset)}
                    >
                      {preset.name}
                      <X
                        className="h-3 w-3 hover:text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteSavedFilter(preset.id);
                        }}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* 2. Status Filter Checkboxes */}
              <div className="space-y-3 pt-3 border-t">
                <Label className="text-sm font-semibold">Status (Checkboxes)</Label>
                <div className="grid grid-cols-3 gap-2">
                  {STATUS_OPTIONS.map((opt: StatusOption) => {
                    const selected = statusFilter.includes(opt.value);
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => toggleStatus(opt.value)}
                        className={`flex items-center justify-between px-3 py-2 rounded-md border text-xs font-medium transition-all ${
                          selected
                            ? "border-primary bg-primary/10 text-foreground"
                            : "border-input bg-background hover:bg-accent text-muted-foreground"
                        }`}
                      >
                        <span>{opt.label}</span>
                        {selected && <Check className="h-3.5 w-3.5 text-primary" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Company Filter Multi-select Dropdown */}
              <div className="space-y-3 pt-3 border-t">
                <Label className="text-sm font-semibold flex items-center gap-1.5">
                  <Building className="h-4 w-4 text-muted-foreground" /> Company (Multi-select)
                </Label>
                <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-2 border rounded-md bg-muted/20">
                  {companies.length === 0 ? (
                    <span className="text-xs text-muted-foreground">No companies found</span>
                  ) : (
                    companies.map((comp) => {
                      const selected = companyFilter.includes(comp);
                      return (
                        <Badge
                          key={comp}
                          variant={selected ? "default" : "outline"}
                          className="cursor-pointer select-none text-xs"
                          onClick={() => toggleCompany(comp)}
                        >
                          {comp}
                        </Badge>
                      );
                    })
                  )}
                </div>
              </div>

              {/* 4. Date Range Filter (Last Contact Date) */}
              <div className="space-y-3 pt-3 border-t">
                <Label className="text-sm font-semibold flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-muted-foreground" /> Last Contact Date Range
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="fromDate" className="text-xs text-muted-foreground">From Date</Label>
                    <Input
                      id="fromDate"
                      type="date"
                      value={fromDate}
                      onChange={(e) => onFromDateChange(e.target.value)}
                      className="text-xs"
                    />
                  </div>
                  <div>
                    <Label htmlFor="toDate" className="text-xs text-muted-foreground">To Date</Label>
                    <Input
                      id="toDate"
                      type="date"
                      value={toDate}
                      onChange={(e) => onToDateChange(e.target.value)}
                      className="text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* 5. Phone & Email Partial Match Filters */}
              <div className="space-y-3 pt-3 border-t">
                <div className="space-y-2">
                  <Label htmlFor="phoneFilter" className="text-sm font-semibold flex items-center gap-1.5">
                    <Phone className="h-4 w-4 text-muted-foreground" /> Phone Number (Partial Match)
                  </Label>
                  <Input
                    id="phoneFilter"
                    placeholder="Search phone numbers..."
                    value={phoneFilter}
                    onChange={(e) => onPhoneChange(e.target.value)}
                  />
                </div>

                <div className="space-y-2 pt-2">
                  <Label htmlFor="emailFilter" className="text-sm font-semibold flex items-center gap-1.5">
                    <Mail className="h-4 w-4 text-muted-foreground" /> Email Address (Partial Match)
                  </Label>
                  <Input
                    id="emailFilter"
                    placeholder="Search email addresses..."
                    value={emailFilter}
                    onChange={(e) => onEmailChange(e.target.value)}
                  />
                </div>
              </div>

              {/* 6. Industry Selection */}
              <div className="space-y-3 pt-3 border-t">
                <Label className="text-sm font-semibold">Industry</Label>
                <div className="flex flex-wrap gap-1.5">
                  {INDUSTRY_OPTIONS.map((ind: CustomerIndustry) => {
                    const selected = industryFilter.includes(ind);
                    return (
                      <Badge
                        key={ind}
                        variant={selected ? "default" : "outline"}
                        className="cursor-pointer select-none text-xs"
                        onClick={() => toggleIndustry(ind)}
                      >
                        {ind}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            </div>

            <SheetFooter className="pt-6 border-t flex-row gap-2 sm:justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSaveDialogOpen(true)}
                disabled={activeCount === 0}
                className="gap-1 text-xs"
              >
                <Plus className="h-3.5 w-3.5" /> Save Custom Filter
              </Button>
              <Button size="sm" onClick={() => setOpen(false)}>
                Apply Filters
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        {/* Active Filter Chips */}
        {statusFilter.map((s) => (
          <Badge key={s} variant="secondary" className="gap-1 px-2.5 py-1">
            Status: {s}
            <X className="h-3 w-3 cursor-pointer" onClick={() => toggleStatus(s)} />
          </Badge>
        ))}

        {companyFilter.map((c) => (
          <Badge key={c} variant="secondary" className="gap-1 px-2.5 py-1">
            Company: {c}
            <X className="h-3 w-3 cursor-pointer" onClick={() => toggleCompany(c)} />
          </Badge>
        ))}

        {phoneFilter ? (
          <Badge variant="secondary" className="gap-1 px-2.5 py-1">
            Phone: {phoneFilter}
            <X className="h-3 w-3 cursor-pointer" onClick={() => onPhoneChange("")} />
          </Badge>
        ) : null}

        {emailFilter ? (
          <Badge variant="secondary" className="gap-1 px-2.5 py-1">
            Email: {emailFilter}
            <X className="h-3 w-3 cursor-pointer" onClick={() => onEmailChange("")} />
          </Badge>
        ) : null}

        {fromDate || toDate ? (
          <Badge variant="secondary" className="gap-1 px-2.5 py-1">
            Date: {fromDate || "..."} to {toDate || "..."}
            <X className="h-3 w-3 cursor-pointer" onClick={handleResetDate} />
          </Badge>
        ) : null}

        {activeCount > 0 && (
          <Button variant="ghost" size="sm" onClick={onReset} className="h-8 text-xs text-muted-foreground hover:text-foreground">
            Clear all
          </Button>
        )}
      </div>

      {/* Save Custom Filter Preset Dialog */}
      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Save Custom Filter Preset</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <Label htmlFor="presetName">Preset Name</Label>
            <Input
              id="presetName"
              placeholder='e.g., "High Priority Tech Clients"'
              value={filterNameInput}
              onChange={(e) => setFilterNameInput(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveFilterSubmit} disabled={!filterNameInput.trim()}>
              Save Preset
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
