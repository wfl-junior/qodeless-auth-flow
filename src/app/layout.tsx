import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Header } from "~/components/Header";
import { classNames } from "~/utils/classNames";
import "./globals.css";

const font = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  description: ":D",
  title: {
    absolute: "Recharge Direct",
    template: "%s | Recharge Direct",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR" dir="ltr" className="dark">
      <body
        className={classNames(
          font.className,
          "text-white bg-app-gray-50 dark:bg-app-blue-900 flex flex-col min-h-screen",
        )}
      >
        <NextTopLoader
          height={2}
          speed={200}
          crawl={true}
          color="#4461F2"
          crawlSpeed={200}
          showSpinner={false}
          shadow="0 0 10px #4461F2, 0 0 5px #4461F2"
        />

        <Header />
        {children}
      </body>
    </html>
  );
}

export default RootLayout;
