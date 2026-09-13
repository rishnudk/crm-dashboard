import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Transket - Modern CRM & Operations Dashboard",
    template: "%s | Transket CRM",
  },
  description:
    "Transket is a high-performance modern CRM tool for customer relations, campaign operations, WhatsApp workflows, and team collaboration.",
  applicationName: "Transket CRM",
  keywords: [
    "CRM",
    "Customer Relationship Management",
    "Transket",
    "Sales Dashboard",
    "Campaign Management",
    "WhatsApp CRM",
    "Customer Inbox",
    "Lead Management",
  ],
  authors: [{ name: "Transket" }],
  creator: "Transket",
  publisher: "Transket",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo-icon.png", type: "image/png" },
    ],
    shortcut: "/logo-icon.png",
    apple: [
      { url: "/logo-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Transket - Modern CRM & Operations Dashboard",
    description:
      "Manage contacts, customer communications, marketing campaigns, and conversational workflows with Transket CRM.",
    siteName: "Transket CRM",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Transket CRM Dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Transket - Modern CRM & Operations Dashboard",
    description:
      "Manage contacts, customer communications, marketing campaigns, and conversational workflows with Transket CRM.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background text-foreground antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <QueryProvider>
            <TooltipProvider>
              <div className="flex min-h-screen">
                <Sidebar />
                <div className="flex flex-1 flex-col">
                  <Navbar />
                  <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
                </div>
              </div>
              <Toaster position="top-right" richColors />
            </TooltipProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
