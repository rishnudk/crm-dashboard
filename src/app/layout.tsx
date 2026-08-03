import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";
import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CRM — Modern Customer Relationship Management",
  description: "High-performance CRM dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-background text-foreground antialiased`}>
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
      </body>
    </html>
  );
}
