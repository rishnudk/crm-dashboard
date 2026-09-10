"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UploadCloud, FileSpreadsheet, Download, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Contact } from "../types";

interface ImportContactsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImportDone: (newContacts: Contact[]) => void;
}

export function ImportContactsDialog({
  open,
  onOpenChange,
  onImportDone,
}: ImportContactsDialogProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const handleSimulatedUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setUploadedFile("indian_contacts_sept2026.csv");
      toast.success("CSV file validated: 5 new Indian contact records identified");
    }, 1000);
  };

  const handleDownloadSample = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Name,Phone,Email,Company,Designation,City,State,DealValue\n" +
      "Karan Singhal,+91 98201 22334,karan@zomato.com,Zomato,Operations VP,Gurugram,Haryana,₹25.0 L\n" +
      "Nalini Sundaram,+91 98402 33445,nalini@tvs.in,TVS Motor,Supply Chain Head,Chennai,Tamil Nadu,₹40.0 L\n";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "transket_contacts_sample.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Downloaded sample CSV template");
  };

  const handleConfirmImport = () => {
    const mockImported: Contact[] = [
      {
        id: `cnt-imp-${Date.now()}-1`,
        name: "Karan Singhal",
        phone: "+91 98201 22334",
        email: "karan@zomato.com",
        company: "Zomato",
        designation: "Operations VP",
        city: "Gurugram",
        state: "Haryana",
        status: "Lead",
        primaryChannel: "WhatsApp",
        whatsappVerified: true,
        tags: ["Imported", "Operations"],
        dealValue: "₹25.0 L",
        dealValueRaw: 2500000,
        lastContact: new Date().toISOString(),
        avatarColor: "#e53935",
        notes: "Imported via CSV batch.",
        createdAt: new Date().toISOString(),
      },
      {
        id: `cnt-imp-${Date.now()}-2`,
        name: "Nalini Sundaram",
        phone: "+91 98402 33445",
        email: "nalini@tvs.in",
        company: "TVS Motor",
        designation: "Supply Chain Head",
        city: "Chennai",
        state: "Tamil Nadu",
        status: "Customer",
        primaryChannel: "WhatsApp",
        whatsappVerified: true,
        tags: ["Imported", "Automotive"],
        dealValue: "₹40.0 L",
        dealValueRaw: 4000000,
        lastContact: new Date().toISOString(),
        avatarColor: "#1e88e5",
        notes: "Imported via CSV batch.",
        createdAt: new Date().toISOString(),
      },
    ];

    onImportDone(mockImported);
    onOpenChange(false);
    setUploadedFile(null);
    toast.success("Successfully imported 2 contacts into your CRM!");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5 text-[#ff6d00]" />
            Import Contacts
          </DialogTitle>
          <DialogDescription>
            Upload a CSV or Excel file containing your Indian contacts and phone numbers.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Dropzone */}
          <div
            onClick={handleSimulatedUpload}
            className="border-2 border-dashed border-border/80 hover:border-[#ff6d00] rounded-xl p-6 text-center cursor-pointer transition-colors bg-muted/20 hover:bg-muted/40"
          >
            {uploadedFile ? (
              <div className="flex flex-col items-center gap-2 text-emerald-600">
                <CheckCircle2 className="h-10 w-10" />
                <p className="font-semibold text-sm">{uploadedFile}</p>
                <p className="text-xs text-muted-foreground">Ready to import</p>
              </div>
            ) : isUploading ? (
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <div className="h-8 w-8 rounded-full border-2 border-[#ff6d00] border-t-transparent animate-spin" />
                <p className="text-sm font-medium">Analyzing CSV structure...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <div className="h-10 w-10 rounded-full bg-orange-100 dark:bg-orange-950/50 text-[#ff6d00] flex items-center justify-center mb-1">
                  <UploadCloud className="h-5 w-5" />
                </div>
                <p className="text-sm font-medium text-foreground">
                  Click to browse or drop CSV file here
                </p>
                <p className="text-xs text-muted-foreground">Supports .csv, .xlsx (max 10MB)</p>
              </div>
            )}
          </div>

          {/* Sample template link */}
          <div className="flex items-center justify-between text-xs text-muted-foreground bg-muted/30 p-2.5 rounded-lg border border-border/60">
            <span>Need sample format?</span>
            <button
              type="button"
              onClick={handleDownloadSample}
              className="inline-flex items-center gap-1 text-[#ff6d00] hover:underline font-medium cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" />
              Download Template
            </button>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirmImport}
            disabled={!uploadedFile}
            className="bg-[#cb6fa7] hover:bg-[#ba5f96] text-white"
          >
            Import Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
