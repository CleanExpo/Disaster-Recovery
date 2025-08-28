import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import "./globals.css"; // Removed for demo
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/contexts/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Disaster Recovery Australia - 24/7 Emergency Restoration Services",
  description: "Professional disaster recovery services for water damage, fire restoration, mold remediation, and storm damage. Available 24/7 with 60-minute emergency response.",
  keywords: "disaster recovery, water damage, fire restoration, mold remediation, storm damage, emergency restoration, Australia",
  openGraph: {
    title: "Disaster Recovery Australia",
    description: "24/7 Emergency Disaster Recovery Services",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
