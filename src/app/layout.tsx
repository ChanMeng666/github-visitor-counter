import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GitHub Visitor Counter - Show International Reach on Your Profile",
  description: "Free GitHub visitor counter with country flags. Show international reach on your profile with real-time configuration and multiple themes. Zero setup, forever free.",
  keywords: ["GitHub profile", "visitor counter", "country flags", "developer tools", "international reach", "profile enhancement", "open source analytics"],
  authors: [{ name: "Chan Meng", url: "https://github.com/ChanMeng666" }],
  creator: "Chan Meng",
  icons: {
    icon: "/github-visitor-counter-logo-1.svg",
    shortcut: "/github-visitor-counter-logo-1.svg",
    apple: "/github-visitor-counter-logo-1.svg",
  },
  openGraph: {
    type: "website",
    title: "GitHub Visitor Counter - Show International Reach",
    description: "Free tool to display visitor country flags on GitHub profiles. Real-time configuration, multiple themes, zero maintenance.",
    url: "https://github-visitor-counter-tau.vercel.app",
    siteName: "GitHub Visitor Counter",
    images: [
      {
        url: "https://github-visitor-counter-tau.vercel.app/github-visitor-counter-logo.svg",
        width: 1200,
        height: 630,
        alt: "GitHub Visitor Counter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GitHub Visitor Counter - International Reach Visualization",
    description: "Free GitHub visitor counter with country flags. Show global impact with customizable themes.",
    images: ["https://github-visitor-counter-tau.vercel.app/github-visitor-counter-logo.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
