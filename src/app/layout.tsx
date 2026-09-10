import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Transket",
  description: "High-performance CRM tool",
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
