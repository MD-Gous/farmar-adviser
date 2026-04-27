import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: "Farmers Adviser - Digital Krishi Officer",
  description: "AI-powered agricultural advisory system for farmers. Get instant expert advice on crop diseases, pest control, soil health, weather, and government schemes.",
  keywords: ["farmers", "agriculture", "AI", "crop disease", "pest control", "Krishi", "farming advice"],
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌾</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geist.variable} font-sans antialiased`}>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#166534',
              color: '#ffffff',
              borderRadius: '12px',
              padding: '12px 16px',
              fontSize: '14px',
            },
            success: {
              iconTheme: { primary: '#4ade80', secondary: '#166534' },
            },
            error: {
              style: {
                background: '#991b1b',
                color: '#ffffff',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
