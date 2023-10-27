import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import { cookies } from "next/headers";
import NextTopLoader from "nextjs-toploader";
import { Header } from "~/components/Header";
import { Theme } from "~/types/Theme";
import { classNames } from "~/utils/classNames";
import { THEME_COOKIE_NAME } from "~/utils/constants";
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
  const theme = (cookies().get(THEME_COOKIE_NAME)?.value ??
    Theme.Dark) as Theme;

  return (
    <html
      dir="ltr"
      lang="pt-BR"
      className={theme === Theme.Dark ? "dark" : undefined}
    >
      <body
        className={classNames(
          font.className,
          "text-black dark:text-white bg-app-gray-50 dark:bg-app-blue-900 flex flex-col min-h-screen transition-colors",
        )}
      >
        <NextTopLoader height={2} color="#4461F2" showSpinner={false} />
        <Header initialTheme={theme} />
        <div className="px-6 flex flex-col flex-1">{children}</div>
      </body>
    </html>
  );
}

export default RootLayout;
