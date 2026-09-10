export type CampaignType = "transket" | "my_campaign";

export type CampaignChannel = "whatsapp" | "email" | "sms";

export type CampaignStatus = "draft" | "scheduled" | "active" | "completed";

export interface Campaign {
  id: string;
  name: string;
  type: CampaignType;
  channel: CampaignChannel;
  category: string;
  status: CampaignStatus;
  audience: string;
  recipientsCount: number;
  deliveredCount?: number;
  openedRate?: string;
  clickRate?: string;
  createdAt: string;
  scheduledFor?: string;
  content?: string;
}

export interface CampaignAnalytics {
  totalSent: number;
  deliveryRate: string;
  openRate: string;
  clickRate: string;
}
