import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";

const customFont = localFont({
  src: '../../public/fonts/custom-font.woff2',
  variable: '--custom-font',
});

const customFont2 = localFont({
  src: '../../public/fonts/custom-font-2.woff2',
  variable: '--custom-font-2',
});

export const metadata: Metadata = {
  title: "Asaduzzaman | Designer & Creative Strategist",
  description: "Clean, modern portfolios built to impress — and built to convert. A designer with 7+ years of experience crafting digital products and visual identities.",
  keywords: ["portfolio", "designer", "brand identity", "web design", "UI/UX", "creative strategist"],
  authors: [{ name: "Asaduzzaman" }],
  openGraph: {
    title: "Asaduzzaman | Designer & Creative Strategist",
    description: "Clean, modern portfolios built to impress — and built to convert.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Asaduzzaman | Designer & Creative Strategist",
    description: "Clean, modern portfolios built to impress — and built to convert.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${customFont.variable} ${customFont2.variable}`}>
      <body className="bg-black text-white antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
