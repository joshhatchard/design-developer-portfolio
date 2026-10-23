import type { Metadata, Viewport } from "next";
import { Archivo, DM_Mono, Instrument_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import "lenis/dist/lenis.css";
import ScrollProvider from "./components/warp-grid/ScrollProvider";
import { isPreviewDeployment, siteDescription, siteName, siteUrl } from "./site";

const display = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-display" });
const body = Instrument_Sans({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-body" });
const label = DM_Mono({ subsets: ["latin"], weight: "400", variable: "--font-label" });

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: `${siteName} — Designer & Developer`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: siteName }],
  creator: siteName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName,
    title: `${siteName} — Designer & Developer`,
    description: siteDescription,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — Designer & Developer`,
    description: siteDescription,
    images: ["/opengraph-image.png"],
  },
  robots: isPreviewDeployment ? { index: false, follow: false } : { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${display.variable} ${body.variable} ${label.variable}`}>
        <ScrollProvider>{children}</ScrollProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
