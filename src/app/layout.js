import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Masquerade Cipher",
  description: "VEIL sweeps the hidden layers of the internet — leak dumps, paste sites, ransomware feeds — and decodes findings via a catalog of 103 documented attack techniques.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#8B0000] text-[#F2E8D5] font-mono min-h-screen relative antialiased selection:bg-[#B01010] selection:text-[#F2E8D5]">
        {/* Film grain layer overlay */}
        <div className="grain-overlay" />

        {/* Shared navigation header */}
        <Navbar />

        {/* Main page content wrapper */}
        <main className="w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
