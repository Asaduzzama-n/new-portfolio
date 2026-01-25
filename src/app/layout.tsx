import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";
import "../styles/WaveTransition.css";
import SmoothScrollProvider from "@/components/ui/SmoothScrollProvider";
import MainLayout from "@/components/layout/MainLayout";

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
          <MainLayout>
            {children}
          </MainLayout>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
