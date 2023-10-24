"use client";

import { motion } from "framer-motion";
import Link, { LinkProps } from "next/link";

interface NavLinkProps extends LinkProps {
  label: string;
  isActive?: boolean;
}

export function NavLink({
  label,
  isActive,
  ...props
}: NavLinkProps): JSX.Element | null {
  return (
    <Link
      {...props}
      className="text-base font-medium relative p-2.5 hover:text-app-gray-500 dark:hover:text-app-gray-100"
    >
      <span>{label}</span>

      {isActive && (
        <motion.div
          aria-hidden
          layoutId="nav-link-active-indicator"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-7 rounded-full bg-app-blue-500"
        />
      )}
    </Link>
  );
}
