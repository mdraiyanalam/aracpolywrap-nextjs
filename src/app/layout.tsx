import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import { BackToTop } from "@/components/layout/back-to-top";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SkipLink } from "@/components/layout/skip-link";
import { company } from "@/content/company";
import { contentSecurityPolicy } from "@/lib/security";
import { isStaticExport, siteUrl } from "@/lib/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  // Origin only: Next.js already adds basePath to file-based metadata (icons, share image),
  // and page URLs below are given with withBasePath().
  metadataBase: new URL(siteUrl.origin),
  title: {
    default: `${company.name} — ${company.tagline}`,
    template: `%s | ${company.name}`,
  },
  description: company.description,
  applicationName: company.name,
  creator: company.credit.name,
  openGraph: {
    type: "website",
    siteName: company.name,
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#2e3192",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${montserrat.variable}`}
    >
      {isStaticExport ? (
        // Static hosts (GitHub Pages) cannot send HTTP headers, so the CSP ships as a meta tag.
        <head>
          <meta
            httpEquiv="Content-Security-Policy"
            content={contentSecurityPolicy({ forMetaTag: true })}
          />
        </head>
      ) : null}
      <body className="flex min-h-dvh flex-col">
        <SkipLink />
        <SiteHeader />
        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <SiteFooter />
        <BackToTop />
      </body>
    </html>
  );
}
