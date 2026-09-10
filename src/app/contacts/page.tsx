"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Plus,
  X,
  LayoutList,
  LayoutGrid,
  Download,
  Upload,
  MessageSquare,
  Trash2,
  Filter,
  Users,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { initialContacts } from "@/features/contacts/data/mockContacts";
import {
  Contact,
  ContactSortColumn,
  ContactSortConfig,
} from "@/features/contacts/types";
import { ContactStatsCards } from "@/features/contacts/components/ContactStatsCards";
import { ContactTable } from "@/features/contacts/components/ContactTable";
import { ContactGrid } from "@/features/contacts/components/ContactGrid";
import { ContactDetailDrawer } from "@/features/contacts/components/ContactDetailDrawer";
import { ContactFormDialog } from "@/features/contacts/components/ContactFormDialog";
import { DeleteContactDialog } from "@/features/contacts/components/DeleteContactDialog";
import { ImportContactsDialog } from "@/features/contacts/components/ImportContactsDialog";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

type QuickFilter = "all" | "whatsapp" | "vip" | "customer" | "lead" | "prospect";

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [searchQuery, setSearchQuery] = useState("");
  const [quickFilter, setQuickFilter] = useState<QuickFilter>("all");
  const [selectedCity, setSelectedCity] = useState("all");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  // Sorting
  const [sort, setSort] = useState<ContactSortConfig>({
    column: "name",
    direction: "asc",
  });

  // Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Selection
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Dialogs & Drawers
  const [viewingContact, setViewingContact] = useState<Contact | null>(null);
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingContact, setDeletingContact] = useState<Contact | null>(null);
  const [importDialogOpen, setImportDialogOpen] = useState(false);

  // Sorting handler
  const handleSort = (column: ContactSortColumn) => {
    setSort((prev) => ({
      column,
      direction: prev.column === column && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  // City list for dropdown
  const cities = useMemo(() => {
    const list = Array.from(new Set(contacts.map((c) => c.city)));
    return ["all", ...list.sort()];
  }, [contacts]);

  // Filtered & Sorted Contacts
  const filteredContacts = useMemo(() => {
    return contacts.filter((c) => {
      // Search
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.phone.includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.company.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q));

      if (!matchesSearch) return false;

      // Quick filter
      if (quickFilter === "whatsapp" && !c.whatsappVerified) return false;
      if (quickFilter === "vip" && !c.tags.includes("VIP") && !c.tags.includes("High Value")) return false;
      if (quickFilter === "customer" && c.status !== "Customer") return false;
      if (quickFilter === "lead" && c.status !== "Lead") return false;
      if (quickFilter === "prospect" && c.status !== "Prospect") return false;

      // City filter
      if (selectedCity !== "all" && c.city !== selectedCity) return false;

      return true;
    });
  }, [contacts, searchQuery, quickFilter, selectedCity]);

  const sortedContacts = useMemo(() => {
    return [...filteredContacts].sort((a, b) => {
      const col = sort.column;
      const dir = sort.direction === "asc" ? 1 : -1;

      if (col === "dealValueRaw") {
        return (a.dealValueRaw - b.dealValueRaw) * dir;
      }
      if (col === "lastContact") {
        return (new Date(a.lastContact).getTime() - new Date(b.lastContact).getTime()) * dir;
      }

      const valA = (a[col] || "").toString().toLowerCase();
      const valB = (b[col] || "").toString().toLowerCase();
      return valA.localeCompare(valB) * dir;
    });
  }, [filteredContacts, sort]);

  // Paginated contacts
  const total = sortedContacts.length;
  const totalPages = Math.ceil(total / pageSize) || 1;
  const paginatedContacts = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sortedContacts.slice(start, start + pageSize);
  }, [sortedContacts, page, pageSize]);

  // Selection handlers
  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAll = () => {
    if (selectedIds.length === paginatedContacts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedContacts.map((c) => c.id));
    }
  };

  // CRUD handlers
  const handleSaveContact = (saved: Contact) => {
    setContacts((prev) => {
      const exists = prev.some((c) => c.id === saved.id);
      if (exists) {
        return prev.map((c) => (c.id === saved.id ? saved : c));
      }
      return [saved, ...prev];
    });
  };

  const handleConfirmDelete = () => {
    if (!deletingContact) return;
    setContacts((prev) => prev.filter((c) => c.id !== deletingContact.id));
    setSelectedIds((prev) => prev.filter((id) => id !== deletingContact.id));
    if (viewingContact?.id === deletingContact.id) {
      setViewingContact(null);
    }
    toast.success(`Deleted contact ${deletingContact.name}`);
    setDeleteDialogOpen(false);
    setDeletingContact(null);
  };

  const handleBulkDelete = () => {
    setContacts((prev) => prev.filter((c) => !selectedIds.includes(c.id)));
    toast.success(`Deleted ${selectedIds.length} contacts`);
    setSelectedIds([]);
  };

  const handleExportCSV = () => {
    const exportData = selectedIds.length > 0
      ? contacts.filter((c) => selectedIds.includes(c.id))
      : contacts;

    const headers = "Name,Phone,Email,Company,Designation,City,State,Status,DealValue\n";
    const rows = exportData
      .map(
        (c) =>
          `"${c.name}","${c.phone}","${c.email}","${c.company}","${c.designation}","${c.city}","${c.state}","${c.status}","${c.dealValue}"`
      )
      .join("\n");

    const encodedUri = encodeURI("data:text/csv;charset=utf-8," + headers + rows);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `indian_contacts_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Exported ${exportData.length} contacts to CSV`);
  };

  const handleImportDone = (newRecords: Contact[]) => {
    setContacts((prev) => [...newRecords, ...prev]);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Contacts</h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500/10 text-[#ff6d00] font-semibold border border-orange-500/20">
              India Directory
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage your verified Indian accounts, WhatsApp leads, and decision makers.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          {/* Import CSV */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setImportDialogOpen(true)}
            className="h-9 gap-1.5 text-xs font-medium"
          >
            <Upload className="h-3.5 w-3.5" />
            <span>Import</span>
          </Button>

          {/* Export CSV */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCSV}
            className="h-9 gap-1.5 text-xs font-medium"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export</span>
          </Button>

          {/* Add Contact Button (Matches brand orchid/magenta) */}
          <Button
            size="sm"
            onClick={() => {
              setEditingContact(null);
              setFormDialogOpen(true);
            }}
            className="h-9 px-3.5 text-sm font-medium text-white bg-[#cb6fa7] hover:bg-[#ba5f96] active:bg-[#aa5488] transition-colors gap-1.5 shadow-xs"
          >
            <Plus className="h-4 w-4 stroke-[2.5]" />
            <span>Add Contact</span>
          </Button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <ContactStatsCards contacts={contacts} />

      {/* Filter and Search Toolbar */}
      <div className="space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              type="text"
              placeholder="Search by name, +91 phone, company, or city..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              className="pl-9 pr-8 h-9 text-sm bg-background border-border/80 rounded-lg focus-visible:ring-1 focus-visible:ring-[#ff6d00]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5"
                title="Clear search"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Controls: City Filter + View Mode */}
          <div className="flex items-center gap-2.5 self-end md:self-auto">
            {/* City Dropdown */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-muted-foreground hidden sm:inline">City:</span>
              <Select
                value={selectedCity}
                onValueChange={(val) => {
                  if (val) setSelectedCity(val);
                  setPage(1);
                }}
              >
                <SelectTrigger className="h-9 w-36 text-xs">
                  <SelectValue placeholder="All Cities" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city} className="text-xs">
                      {city === "all" ? "All Cities" : city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* View Mode Toggle: Table vs Grid */}
            <div className="inline-flex p-1 rounded-lg border border-border/80 bg-card shadow-2xs">
              <button
                onClick={() => setViewMode("table")}
                className={cn(
                  "p-1.5 rounded-md transition-colors",
                  viewMode === "table"
                    ? "bg-[#ff5722] text-white"
                    : "text-muted-foreground hover:text-foreground"
                )}
                title="Table view"
              >
                <LayoutList className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-1.5 rounded-md transition-colors",
                  viewMode === "grid"
                    ? "bg-[#ff5722] text-white"
                    : "text-muted-foreground hover:text-foreground"
                )}
                title="Grid card view"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => {
              setQuickFilter("all");
              setPage(1);
            }}
            className={cn(
              "px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap",
              quickFilter === "all"
                ? "bg-[#c026d3] text-white shadow-2xs"
                : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            All Contacts ({contacts.length})
          </button>

          <button
            onClick={() => {
              setQuickFilter("whatsapp");
              setPage(1);
            }}
            className={cn(
              "px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5",
              quickFilter === "whatsapp"
                ? "bg-emerald-600 text-white shadow-2xs"
                : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <span>WhatsApp Opt-in</span>
            <span className="text-[10px] opacity-80">
              ({contacts.filter((c) => c.whatsappVerified).length})
            </span>
          </button>

          <button
            onClick={() => {
              setQuickFilter("vip");
              setPage(1);
            }}
            className={cn(
              "px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap",
              quickFilter === "vip"
                ? "bg-purple-600 text-white shadow-2xs"
                : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            Enterprise & VIPs ({contacts.filter((c) => c.tags.includes("VIP") || c.tags.includes("High Value")).length})
          </button>

          <button
            onClick={() => {
              setQuickFilter("customer");
              setPage(1);
            }}
            className={cn(
              "px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap",
              quickFilter === "customer"
                ? "bg-blue-600 text-white shadow-2xs"
                : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            Customers ({contacts.filter((c) => c.status === "Customer").length})
          </button>

          <button
            onClick={() => {
              setQuickFilter("lead");
              setPage(1);
            }}
            className={cn(
              "px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap",
              quickFilter === "lead"
                ? "bg-[#ff6d00] text-white shadow-2xs"
                : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            Leads ({contacts.filter((c) => c.status === "Lead").length})
          </button>

          <button
            onClick={() => {
              setQuickFilter("prospect");
              setPage(1);
            }}
            className={cn(
              "px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap",
              quickFilter === "prospect"
                ? "bg-pink-600 text-white shadow-2xs"
                : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            Prospects ({contacts.filter((c) => c.status === "Prospect").length})
          </button>
        </div>
      </div>

      {/* Bulk Action Bar (Visible when items selected) */}
      {selectedIds.length > 0 && (
        <div className="rounded-xl border border-orange-200 dark:border-orange-900/40 bg-[#fff9f4] dark:bg-orange-950/20 px-4 py-2.5 flex items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-800 dark:text-slate-200">
            <span className="h-5 w-5 rounded-full bg-[#ff6d00] text-white flex items-center justify-center font-bold text-[10px]">
              {selectedIds.length}
            </span>
            <span>contacts selected</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleExportCSV}
              className="h-8 text-xs gap-1.5"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export ({selectedIds.length})</span>
            </Button>

            <Button
              size="sm"
              variant="destructive"
              onClick={handleBulkDelete}
              className="h-8 text-xs gap-1.5"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Delete</span>
            </Button>

            <button
              onClick={() => setSelectedIds([])}
              className="text-xs text-muted-foreground hover:text-foreground underline ml-2"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Main Content: Table View or Grid View */}
      {viewMode === "table" ? (
        <ContactTable
          contacts={paginatedContacts}
          sort={sort}
          onSort={handleSort}
          onView={(contact) => setViewingContact(contact)}
          onEdit={(contact) => {
            setEditingContact(contact);
            setFormDialogOpen(true);
          }}
          onDelete={(contact) => {
            setDeletingContact(contact);
            setDeleteDialogOpen(true);
          }}
          selectedIds={selectedIds}
          onToggleSelect={handleToggleSelect}
          onToggleSelectAll={handleToggleSelectAll}
        />
      ) : (
        <ContactGrid
          contacts={paginatedContacts}
          onView={(contact) => setViewingContact(contact)}
          onEdit={(contact) => {
            setEditingContact(contact);
            setFormDialogOpen(true);
          }}
          onDelete={(contact) => {
            setDeletingContact(contact);
            setDeleteDialogOpen(true);
          }}
        />
      )}

      {/* Pagination Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 py-3 border-t border-border/70">
        <div className="text-xs text-muted-foreground text-center sm:text-left">
          Showing{" "}
          <span className="font-semibold text-foreground">
            {total === 0 ? 0 : (page - 1) * pageSize + 1}
          </span>{" "}
          to{" "}
          <span className="font-semibold text-foreground">
            {Math.min(page * pageSize, total)}
          </span>{" "}
          of <span className="font-semibold text-foreground">{total}</span> contacts
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span>Per page:</span>
            <Select
              value={pageSize.toString()}
              onValueChange={(val) => {
                if (val) {
                  setPageSize(Number(val));
                  setPage(1);
                }
              }}
            >
              <SelectTrigger className="h-8 w-16 text-xs">
                <SelectValue placeholder={pageSize.toString()} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setPage(1)}
              disabled={page <= 1}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setPage((p) => p - 1)}
              disabled={page <= 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-xs font-medium px-2">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setPage(totalPages)}
              disabled={page >= totalPages}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Slide-over Contact Details Drawer */}
      <ContactDetailDrawer
        contact={viewingContact}
        open={!!viewingContact}
        onClose={() => setViewingContact(null)}
        onEdit={(contact) => {
          setViewingContact(null);
          setEditingContact(contact);
          setFormDialogOpen(true);
        }}
        onDelete={(contact) => {
          setViewingContact(null);
          setDeletingContact(contact);
          setDeleteDialogOpen(true);
        }}
      />

      {/* Create / Edit Dialog */}
      <ContactFormDialog
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
        contact={editingContact}
        onSave={handleSaveContact}
      />

      {/* Delete Confirmation Alert */}
      <DeleteContactDialog
        contact={deletingContact}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
      />

      {/* Import Contacts Dialog */}
      <ImportContactsDialog
        open={importDialogOpen}
        onOpenChange={setImportDialogOpen}
        onImportDone={handleImportDone}
      />
    </div>
  );
}
