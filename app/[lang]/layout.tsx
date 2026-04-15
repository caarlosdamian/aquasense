import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, getDictionary } from "./dictionaries";
import { locales } from "@/app/i18n/config";
import { ThemeProvider } from "@/app/components/theme-provider";
import WaveBackground from "@/app/components/wave-background";
import FloatingChat from "@/app/components/floating-chat";
import { SignupProvider } from "@/app/context/signup-context";
import "../globals.css";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: {
      template: `%s | ${dict.metadata.title}`,
      default: dict.metadata.title,
    },
    description: dict.metadata.description,
    applicationName: "AquaSense Pool Services",
    authors: [{ name: "AquaSense" }],
    keywords: [
      "pool services",
      "custom pools",
      "pool maintenance",
      "smart pools",
    ],
    icons: {
      icon: "/icon.png",
      apple: "/apple-icon.png",
    },
    openGraph: {
      title: dict.metadata.title,
      description: dict.metadata.description,
      url: "https://aquasense.com",
      siteName: "AquaSense",
      images: [
        {
          url: "/aquasense-branding/logo-aquasense-pool-services-1-01.png",
          width: 800,
          height: 600,
          alt: "AquaSense Logo",
        },
      ],
      locale: lang,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.metadata.title,
      description: dict.metadata.description,
      images: ["/aquasense-branding/logo-aquasense-pool-services-1-01.png"],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html lang={lang} className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Prevent FOUC: apply theme class before React hydrates */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'system';
                  var resolved = theme;
                  if (theme === 'system') {
                     resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  document.documentElement.classList.add(resolved);
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased relative overflow-x-hidden">
        <ThemeProvider>
          <SignupProvider>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-lg focus:bg-blue-600 focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-white"
            >
              Skip to main content
            </a>
            <WaveBackground />
            <FloatingChat />
            {children}
          </SignupProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
