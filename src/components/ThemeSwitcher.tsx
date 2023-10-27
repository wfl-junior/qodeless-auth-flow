"use client";

import Image from "next/image";
import { useState } from "react";
import dark from "~/assets/dark.png";
import light from "~/assets/light.png";
import { Theme } from "~/types/Theme";
import { classNames } from "~/utils/classNames";
import { THEME_COOKIE_NAME } from "~/utils/constants";

interface ThemeSwitcherProps {
  initialTheme?: Theme;
}

export function ThemeSwitcher({
  initialTheme = Theme.Dark,
}: ThemeSwitcherProps): JSX.Element | null {
  const [theme, setTheme] = useState(initialTheme);

  function handleToggleTheme() {
    const root = document.getElementsByTagName("html")[0];
    root.classList.toggle(Theme.Dark);

    const newTheme = root.classList.contains(Theme.Dark)
      ? Theme.Dark
      : Theme.Light;

    setTheme(newTheme);
    document.cookie = `${THEME_COOKIE_NAME}=${newTheme}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
  }

  const isDarkTheme = theme === Theme.Dark;

  return (
    <button
      onClick={handleToggleTheme}
      title={`Alternar para tema ${isDarkTheme ? "claro" : "escuro"}`}
      className={classNames(
        "h-8 w-20 relative transition-colors rounded-full overflow-hidden shadow-header-button",
        isDarkTheme ? "bg-app-blue-800" : "bg-app-blue-100",
      )}
    >
      <span className="sr-only">{Theme.Dark}</span>

      <Image
        alt=""
        quality={100}
        className="object-cover"
        src={isDarkTheme ? dark : light}
      />

      <div
        aria-hidden
        className={classNames(
          "absolute rounded-full aspect-square inset-y-1 transition left-1",
          isDarkTheme
            ? "bg-white shadow-[0_0_10px_white] translate-x-12"
            : "bg-app-yellow-400 shadow-[0_0_10px_#FFE146]",
        )}
      />
    </button>
  );
}
