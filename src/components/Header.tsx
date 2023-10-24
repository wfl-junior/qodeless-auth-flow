"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavLink } from "./NavLink";

interface HeaderProps {}

export function Header({}: HeaderProps): JSX.Element | null {
  const pathname = usePathname();

  return (
    <div className="px-4">
      <header className="max-w-[1522px] w-full mx-auto pt-12 pb-4 flex items-center justify-between">
        <nav
          className="flex items-center gap-6"
          aria-label="Navegação principal"
        >
          <NavLink href="/" label="Home" isActive={pathname === "/"} />
          <NavLink href="#" label="Sobre" />
          <NavLink href="#" label="Blog" />
          <NavLink href="#" label="Páginas" />
          <NavLink href="#" label="Contato" />
        </nav>

        <nav className="flex items-center gap-6">
          <NavLink
            href="/login"
            label="Entrar"
            isActive={pathname === "/login"}
          />

          <Link
            href="/register"
            className="bg-white px-5 py-3 text-app-blue-500 font-semibold text-base rounded-3xl transition-colors hover:bg-app-blue-500 hover:text-white"
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
        </nav>
      </header>
    </div>
  );
}
