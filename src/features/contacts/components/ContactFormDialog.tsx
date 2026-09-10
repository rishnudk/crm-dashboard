"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Contact, ContactStatus } from "../types";
import { toast } from "sonner";

interface ContactFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contact?: Contact | null;
  onSave: (contact: Contact) => void;
}

const INDIAN_CITIES = [
  { city: "Mumbai", state: "Maharashtra" },
  { city: "Bengaluru", state: "Karnataka" },
  { city: "Delhi NCR", state: "Delhi" },
  { city: "Hyderabad", state: "Telangana" },
  { city: "Pune", state: "Maharashtra" },
  { city: "Chennai", state: "Tamil Nadu" },
  { city: "Kolkata", state: "West Bengal" },
  { city: "Ahmedabad", state: "Gujarat" },
  { city: "Noida", state: "Uttar Pradesh" },
  { city: "Gurugram", state: "Haryana" },
  { city: "Kochi", state: "Kerala" },
];

export function ContactFormDialog({
  open,
  onOpenChange,
  contact,
  onSave,
}: ContactFormDialogProps) {
  const isEditing = !!contact;

  const [formData, setFormData] = useState({
    name: "",
    phone: "+91 ",
    email: "",
    company: "",
    designation: "",
    city: "Mumbai",
    state: "Maharashtra",
    status: "Lead" as ContactStatus,
    dealValue: "₹15.0 L",
    tags: "Decision Maker",
    notes: "",
  });

  useEffect(() => {
    if (contact) {
      setFormData({
        name: contact.name,
        phone: contact.phone,
        email: contact.email,
        company: contact.company,
        designation: contact.designation,
        city: contact.city,
        state: contact.state,
        status: contact.status,
        dealValue: contact.dealValue,
        tags: contact.tags.join(", "),
        notes: contact.notes || "",
      });
    } else {
      setFormData({
        name: "",
        phone: "+91 ",
        email: "",
        company: "",
        designation: "",
        city: "Bengaluru",
        state: "Karnataka",
        status: "Lead",
        dealValue: "₹15.0 L",
        tags: "Decision Maker, Inbound",
        notes: "",
      });
    }
  }, [contact, open]);

  const handleCityChange = (cityName: string | null) => {
    if (!cityName) return;
    const found = INDIAN_CITIES.find((c) => c.city === cityName);
    setFormData((prev) => ({
      ...prev,
      city: cityName,
      state: found ? found.state : prev.state,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Contact name is required");
      return;
    }
    if (!formData.phone.trim() || formData.phone.trim() === "+91") {
      toast.error("Valid Indian phone number is required");
      return;
    }

    const tagsArray = formData.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    // Extract numeric deal value from string e.g. ₹25.0 L
    const match = formData.dealValue.match(/[\d.]+/);
    const num = match ? parseFloat(match[0]) * 100000 : 1500000;

    const savedContact: Contact = {
      id: contact?.id || `cnt-${Date.now()}`,
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      company: formData.company.trim(),
      designation: formData.designation.trim() || "Lead Contact",
      city: formData.city,
      state: formData.state,
      status: formData.status,
      primaryChannel: "WhatsApp",
      whatsappVerified: true,
      tags: tagsArray.length > 0 ? tagsArray : ["General"],
      dealValue: formData.dealValue.trim() || "₹10.0 L",
      dealValueRaw: num,
      lastContact: new Date().toISOString(),
      avatarColor: contact?.avatarColor || "#ff6d00",
      notes: formData.notes.trim(),
      createdAt: contact?.createdAt || new Date().toISOString(),
    };

    onSave(savedContact);
    onOpenChange(false);
    toast.success(isEditing ? "Contact updated successfully!" : "New Indian contact added successfully!");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Contact" : "Add New Contact"}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update contact details, company information, or deal value."
              : "Create a verified Indian contact for your CRM and WhatsApp messaging."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          {/* Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="contact-name">Full Name *</Label>
              <Input
                id="contact-name"
                placeholder="e.g. Rajesh Sharma"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="contact-phone">Indian Phone (+91) *</Label>
              <Input
                id="contact-phone"
                placeholder="+91 98200 12345"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Email & Company */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="contact-email">Email Address</Label>
              <Input
                id="contact-email"
                type="email"
                placeholder="name@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="contact-company">Company</Label>
              <Input
                id="contact-company"
                placeholder="e.g. Tata Motors, Infosys"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
            </div>
          </div>

          {/* Designation & City */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="contact-designation">Designation / Role</Label>
              <Input
                id="contact-designation"
                placeholder="e.g. VP Operations, Director"
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="contact-city">City</Label>
              <Select value={formData.city} onValueChange={handleCityChange}>
                <SelectTrigger id="contact-city">
                  <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent>
                  {INDIAN_CITIES.map((c) => (
                    <SelectItem key={c.city} value={c.city}>
                      {c.city} ({c.state})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Status & Deal Value */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="contact-status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(val) => {
                  if (val) setFormData({ ...formData, status: val as ContactStatus });
                }}
              >
                <SelectTrigger id="contact-status">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Lead">Lead</SelectItem>
                  <SelectItem value="Prospect">Prospect</SelectItem>
                  <SelectItem value="Customer">Customer</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="contact-deal">Pipeline Deal Value</Label>
              <Input
                id="contact-deal"
                placeholder="e.g. ₹25.0 L"
                value={formData.dealValue}
                onChange={(e) => setFormData({ ...formData, dealValue: e.target.value })}
              />
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-1.5">
            <Label htmlFor="contact-tags">Tags (comma-separated)</Label>
            <Input
              id="contact-tags"
              placeholder="VIP, High Value, Decision Maker"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            />
          </div>

          {/* Notes */}
          <div className="space-y-1.5">
            <Label htmlFor="contact-notes">Notes</Label>
            <Textarea
              id="contact-notes"
              placeholder="Add any specific context, communication preferences, or deal notes..."
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#cb6fa7] hover:bg-[#ba5f96] text-white"
            >
              {isEditing ? "Save Changes" : "Create Contact"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
