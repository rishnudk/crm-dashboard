"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { customerSchema, CustomerFormValues } from "../schemas/customerSchema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { INDUSTRY_OPTIONS, STATUS_OPTIONS, StatusOption } from "../constants";
import { Label } from "@/components/ui/label";
import { CustomerIndustry, CustomerStatus } from "../types/customer";

interface CustomerFormProps {
  initialValues?: Partial<CustomerFormValues>;
  onSubmit: (values: CustomerFormValues) => void;
  isLoading?: boolean;
}

export function CustomerForm({ initialValues, onSubmit, isLoading }: CustomerFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: initialValues?.name || "",
      email: initialValues?.email || "",
      phone: initialValues?.phone || "",
      company: initialValues?.company || "",
      status: initialValues?.status || "Lead",
      industry: initialValues?.industry || "Technology",
      priority: initialValues?.priority || 3,
      notes: initialValues?.notes || "",
    },
  });

  const selectedStatus = watch("status");
  const selectedIndustry = watch("industry");

  const onFormSubmit: SubmitHandler<CustomerFormValues> = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" {...register("name")} placeholder="Alex Morgan" />
        {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" {...register("email")} placeholder="alex@company.com" />
        {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" {...register("phone")} placeholder="+1 (555) 000-0000" />
        {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>}
      </div>

      <div>
        <Label htmlFor="company">Company</Label>
        <Input id="company" {...register("company")} placeholder="TechCorp Industries" />
        {errors.company && <p className="text-xs text-destructive mt-1">{errors.company.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Status</Label>
          <Select value={selectedStatus} onValueChange={(val) => setValue("status", val as CustomerStatus)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((s: StatusOption) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Industry</Label>
          <Select value={selectedIndustry} onValueChange={(val) => setValue("industry", val as CustomerIndustry)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              {INDUSTRY_OPTIONS.map((ind: CustomerIndustry) => (
                <SelectItem key={ind} value={ind}>
                  {ind}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="priority">Priority (1–5)</Label>
        <Input
          id="priority"
          type="number"
          min={1}
          max={5}
          {...register("priority", { valueAsNumber: true })}
        />
        {errors.priority && <p className="text-xs text-destructive mt-1">{errors.priority.message}</p>}
      </div>

      <div>
        <Label htmlFor="notes">Notes</Label>
        <Textarea id="notes" {...register("notes")} placeholder="Key customer notes..." />
      </div>

      <div className="pt-2 flex justify-end gap-2">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Customer"}
        </Button>
      </div>
    </form>
  );
}
