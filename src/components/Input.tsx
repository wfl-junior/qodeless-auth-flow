import { forwardRef } from "react";
import { classNames } from "~/utils/classNames";

export interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  name: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      {...props}
      id={props.name}
      className={classNames(
        "bg-app-gray-100 rounded-[10px] w-full text-lg font-normal text-app-gray-500 px-5 py-4.5 focus:outline-none border-2 border-transparent focus:border-app-blue-500",
        className,
      )}
    />
  ),
);
