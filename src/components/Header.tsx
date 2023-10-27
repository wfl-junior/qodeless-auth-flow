"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Theme } from "~/types/Theme";
import { NavLink } from "./NavLink";
import { ThemeSwitcher } from "./ThemeSwitcher";

interface HeaderProps {
  initialTheme?: Theme;
}

export function Header({ initialTheme }: HeaderProps): JSX.Element | null {
  const pathname = usePathname();

  return (
    <div className="px-4">
      <header className="max-w-[1522px] w-full mx-auto pt-12 pb-4 flex items-center justify-between">
        <nav
          className="flex items-center gap-6"
          aria-label="Navegação principal"
        >
          <NavLink href="/" isActive={pathname === "/"}>
            Home
          </NavLink>

          <NavLink href="#">Sobre</NavLink>
          <NavLink href="#">Blog</NavLink>
          <NavLink href="#">Páginas</NavLink>
          <NavLink href="#">Contato</NavLink>
        </nav>

        <div className="flex items-center gap-6">
          <ThemeSwitcher initialTheme={initialTheme} />

          <NavLink href="/login" isActive={pathname === "/login"}>
            Entrar
          </NavLink>

          <Link
            href="/register"
            className="bg-white px-5 py-3 text-app-blue-500 font-semibold text-base rounded-3xl transition-colors hover:bg-app-blue-500 hover:text-white shadow-header-button"
          >
            <span>Registrar-se</span>

            {pathname === "/register" && (
              <motion.div
                aria-hidden
                layoutId="nav-link-active-indicator"
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-7 rounded-full bg-app-blue-500"
              />
            )}
          </Link>
        </div>
      </header>
    </div>
  );
}
