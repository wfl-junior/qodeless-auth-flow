import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { classNames } from "~/utils/classNames";
import "./globals.css";

const font = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  description: ":D",
  title: {
    absolute: "I'm on my way",
    template: "%s | I'm on my way",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR">
      <body
        className={classNames(font.className, "text-white bg-app-blue-900")}
      >
        <NextTopLoader
          height={3}
          speed={200}
          crawl={true}
          color="#4461F2"
          crawlSpeed={200}
          showSpinner={false}
          shadow="0 0 10px #4461F2, 0 0 5px #4461F2"
        />

        {children}
      </body>
    </html>
  );
}

export default RootLayout;
