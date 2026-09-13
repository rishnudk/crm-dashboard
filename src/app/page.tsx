"use client";

import { DashboardStatusMetrics } from "@/components/dashboard/DashboardStatusMetrics";
import { DashboardOrgCard } from "@/components/dashboard/DashboardOrgCard";
import { WhatsAppOnboardingCard } from "@/components/dashboard/WhatsAppOnboardingCard";
import { WalletCard } from "@/components/dashboard/WalletCard";
import { FeaturePromoCards } from "@/components/dashboard/FeaturePromoCards";

export default function DashboardPage() {
  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-10">
      {/* 2-Column Responsive Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 cols): Metrics, WhatsApp Onboarding, Feature Promo Cards */}
        <div className="lg:col-span-8 space-y-6">
          {/* Top Status Metrics Bar */}
          <DashboardStatusMetrics />

          {/* Main WhatsApp Onboarding Stepper Card */}
          <WhatsAppOnboardingCard />

          {/* Bottom Promotional Feature Cards (Widget & QR Generator) */}
          <FeaturePromoCards />
        </div>

        {/* Right Column (4 cols): Current Organization & Wallet */}
        <div className="lg:col-span-4 space-y-6">
          {/* Current Organization Selector */}
          <DashboardOrgCard />

          {/* Wallet & Credits Card */}
          <WalletCard />
        </div>
      </div>
    </div>
  );
}
