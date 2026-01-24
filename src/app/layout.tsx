import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";
import Footer from "@/components/sections/Footer";
import Navigation from "@/components/ui/Navigation";
import SmoothScrollProvider from "@/components/ui/SmoothScrollProvider";
import ProgressiveBlur from "@/components/ui/ProgressiveBlur";

const customFont = localFont({
  src: '../../public/fonts/custom-font.woff2',
  variable: '--custom-font',
});

const customFont2 = localFont({
  src: '../../public/fonts/custom-font-2.woff2',
  variable: '--custom-font-2',
});

export const metadata: Metadata = {
  title: "Asaduzzaman | Software Engineer & Developer",
  description: "Experienced Software Engineer and Full-Stack Developer specializing in building robust applications, project management, and long-term maintenance support.",
  keywords: ["portfolio", "software engineer", "developer", "full-stack", "project management", "maintenance support", "devops"],
  authors: [{ name: "Asaduzzaman" }],
  openGraph: {
    title: "Asaduzzaman | Software Engineer & Developer",
    description: "Experienced Software Engineer and Full-Stack Developer building robust digital products.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Asaduzzaman | Software Engineer & Developer",
    description: "Experienced Software Engineer and Full-Stack Developer building robust digital products.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${customFont.variable} ${customFont2.variable}`}>
      <body className="text-white antialiased font-sans">
        <SmoothScrollProvider>
          <Navigation />
          {children}
          <Footer />
          <ProgressiveBlur />
        </SmoothScrollProvider>

        {/* Bottom Blur Effect */}
        {/* <div className="fixed bottom-0 left-0 w-full h-32 pointer-events-none z-[100] backdrop-blur-xl [mask-image:linear-gradient(to_bottom,black,transparent)]" /> */}
      </body>
    </html>
  );
}
