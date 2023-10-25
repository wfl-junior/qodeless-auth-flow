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

  return (
    <button
      onClick={handleToggleTheme}
      className={classNames(
        "h-8 w-20 relative transition-colors rounded-full overflow-hidden shadow-[0_4px_4px_0_rgba(0,0,0,0.05)]",
        theme === Theme.Dark ? "bg-[#002738]" : "bg-[#E0F6FF]",
      )}
    >
      <span className="sr-only">{Theme.Dark}</span>

      <Image
        alt=""
        src={theme === Theme.Dark ? dark : light}
        quality={100}
        className="object-cover"
      />

      <div
        aria-hidden
        className={classNames(
          "absolute rounded-full aspect-square inset-y-1 transition left-1",
          theme === Theme.Dark
            ? "bg-white shadow-[0_0_10px_white] translate-x-12"
            : "bg-app-yellow-400 shadow-[0_0_10px_#FFE146]",
        )}
      />
    </button>
  );
}
