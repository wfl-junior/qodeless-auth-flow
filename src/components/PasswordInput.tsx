"use client";

import { Eye, EyeSlash } from "@phosphor-icons/react";
import { forwardRef, useState } from "react";
import { classNames } from "~/utils/classNames";
import { Input, InputProps } from "./Input";

interface PasswordInputProps extends Omit<InputProps, "type"> {}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [isHidden, setIsHidden] = useState(true);

    function handleToggleHidden() {
      setIsHidden(currentIsHidden => !currentIsHidden);
    }

    const Icon = isHidden ? Eye : EyeSlash;

    return (
      <div className="relative">
        <Input
          ref={ref}
          {...props}
          type={isHidden ? "password" : "text"}
          className={classNames("pr-14", className)}
        />

        <button
          onClick={handleToggleHidden}
          title={isHidden ? "Visualizar senha" : "Esconder senha"}
          className="absolute right-5 top-1/2 -translate-y-1/2 text-app-gray-500 hover:text-app-gray-400 transition-colors"
        >
          <Icon size={24} />
        </button>
      </div>
    );
  },
);
